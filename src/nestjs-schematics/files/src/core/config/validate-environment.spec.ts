import { IsBoolean, IsIn, IsInt, IsOptional, IsPositive } from "class-validator"
import { validateEnvironment } from "./validate-environment"

const VALID_ENVIRONMENT: Readonly<TestEnvironment> = {
  NODE_ENV: "development",
  APP_PORT: 3000,
  SERVE_DOCS: true,
}

describe(validateEnvironment, () => {
  it("converts object into the specified environment class", () => {
    const environment = validateEnvironment(TestEnvironment, {
      NODE_ENV: "development",
      APP_PORT: "3000",
      SERVE_DOCS: "true",
    })

    expect(environment).toStrictEqual(
      new TestEnvironment({
        NODE_ENV: "development",
        APP_PORT: 3000,
        SERVE_DOCS: true,
      }),
    )
  })

  it("ignores missing optional variables", () => {
    expect(() => {
      validateEnvironment(TestEnvironment, {
        NODE_ENV: "development",
        APP_PORT: "3000",
      })
    }).not.toThrow()
  })

  it("omits unrelated environment variables", () => {
    const environment = validateEnvironment(TestEnvironment, {
      ...VALID_ENVIRONMENT,
      NODE_VERSION: "18",
    })

    expect(environment).not.toHaveProperty("NODE_VERSION")
  })

  it("throws an error when required variables are missing", () => {
    expect(() => {
      validateEnvironment(TestEnvironment, {})
    }).toThrow(
      `Invalid environment variables:
- NODE_ENV must be one of the following values: development, production, got undefined
- APP_PORT must be a positive number, got undefined`,
    )
  })

  it("throws an error when a variable is invalid", () => {
    expect(() => {
      validateEnvironment(TestEnvironment, {
        NODE_ENV: "testing",
        APP_PORT: "abcd",
      })
    }).toThrow(
      `Invalid environment variables:
- NODE_ENV must be one of the following values: development, production, got "testing"
- APP_PORT must be a positive number, got "abcd"`,
    )
  })
})

class TestEnvironment {
  @IsIn(["development", "production"])
  NODE_ENV!: "development" | "production"

  @IsInt()
  @IsPositive()
  APP_PORT!: number

  @IsOptional()
  @IsBoolean()
  SERVE_DOCS?: boolean

  constructor(self: TestEnvironment) {
    Object.assign(this, self)
  }
}

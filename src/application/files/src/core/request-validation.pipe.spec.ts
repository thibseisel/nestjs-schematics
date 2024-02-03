import { HttpException } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { Type } from "class-transformer"
import {
  IsInstance,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator"
import { RequestValidationPipe } from "./request-validation.pipe"

describe(RequestValidationPipe, () => {
  let pipe: RequestValidationPipe

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RequestValidationPipe],
    }).compile()

    pipe = module.get(RequestValidationPipe)
  })

  it("generates an error message for each invalid properties", async () => {
    const exception = await getUserValidationError({
      id: "abcde",
      fullname: "A".repeat(101),
      age: 16.4,
    })

    expect(exception).toBeInstanceOf(HttpException)
    const response = (exception as HttpException).getResponse()
    expect(response).toEqual({
      errors: expect.arrayContaining([
        {
          path: "id",
          reason: "id must be a UUID",
        },
        {
          path: "fullname",
          reason: "fullname must not have more than 100 characters",
        },
        {
          path: "age",
          reason: "age must be greater than or equal to 18",
        },
      ]),
    })
  })

  it("generates an error message for invalid properties of nested objects", async () => {
    const exception = await getUserValidationError({
      id: "60ef04f8-2580-47ee-bfbd-cee34cdab9c9",
      fullname: "John Doe",
      age: 28,
      job: { id: "engineer" },
    })

    expect(exception).toBeInstanceOf(HttpException)
    const response = (exception as HttpException).getResponse()
    expect(response).toEqual({
      errors: expect.arrayContaining([
        { path: "job.id", reason: "id must be a UUID" },
        { path: "job.name", reason: "name is required" },
      ]),
    })
  })

  async function getUserValidationError(value: unknown): Promise<unknown> {
    return pipe
      .transform(value, { type: "body", metatype: User })
      .catch((error) => error)
  }
})

class Job {
  @IsUUID(4, { message: "id must be a UUID" })
  id!: string

  @IsString({ message: "name is required" })
  name!: string
}

class User {
  @IsUUID("4", { message: "id must be a UUID" })
  id!: string

  @IsString()
  @MaxLength(100, {
    message: "fullname must not have more than 100 characters",
  })
  fullname!: string

  @IsInt({ message: "age must be an integer" })
  @Min(18, { message: "age must be greater than or equal to 18" })
  age!: number

  @IsOptional()
  @IsInstance(Job)
  @ValidateNested()
  @Type(() => Job)
  job?: Job
}

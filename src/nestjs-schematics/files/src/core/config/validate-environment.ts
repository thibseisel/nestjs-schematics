import { Type } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { validateSync } from "class-validator"

/**
 * Reads properties from the environment and validates them against a given class.
 * @param envClass Reference to a class constructor whose properties have
 * `class-validator` decorators.
 * @param variables Dictionary holding properties from the environment.
 * Typically `process.env`.
 * @returns An instance of the given class.
 * @throws Error if any validation fails.
 */
export function validateEnvironment<T extends object>(
  envClass: Type<T>,
  variables: Record<string, unknown>,
): T {
  const environment = plainToInstance(envClass, variables, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(environment, { whitelist: true })
  if (!errors.length) {
    return environment
  }
  const reasons = errors.map((error) => {
    const violatedConstraint = Object.values(error.constraints ?? {})[0]
    const rejectedValue = JSON.stringify(variables[error.property])
    return `- ${violatedConstraint}, got ${rejectedValue}`
  })
  throw Error(`Invalid environment variables:\n${reasons.join("\n")}`)
}

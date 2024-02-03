import {
  BadRequestException,
  Injectable,
  ValidationError,
  ValidationPipe,
} from "@nestjs/common"

/**
 * Validates an incoming request body against constraints defined in a class
 * whose properties have `class-validator` decorators.
 */
@Injectable()
export class RequestValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          errors: extractInvalidPaths(errors),
        })
      },
    })
  }
}

interface InvalidPath {
  path: string
  reason: string
}

function extractInvalidPaths(
  errors: ReadonlyArray<ValidationError>,
  basePath: string = "",
): ReadonlyArray<InvalidPath> {
  const pathPrefix = basePath ? basePath + "." : ""
  return errors.flatMap((error) => {
    if (!error.children?.length) {
      const constraintMessage = Object.values(error.constraints ?? {})[0]
      return [
        {
          path: pathPrefix + error.property,
          reason: constraintMessage ?? `${error.property} is invalid`,
        },
      ]
    } else {
      return extractInvalidPaths(error.children, pathPrefix + error.property)
    }
  })
}

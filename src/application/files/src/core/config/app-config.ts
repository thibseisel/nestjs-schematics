import { IsBoolean, IsEnum, IsOptional } from "class-validator"

enum NodeEnvironment {
  Development = "development",
  Production = "production",
}

/**
 * Configuration properties of the whole application.
 * This class is used to validate values from the environment or a `.env` file.
 */
export class AppConfig {
  @IsEnum(NodeEnvironment)
  NODE_ENV!: NodeEnvironment

  @IsOptional()
  @IsBoolean()
  SERVE_DOCS?: boolean
}

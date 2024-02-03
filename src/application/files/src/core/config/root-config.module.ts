import { ConfigModule } from "@nestjs/config"
import { AppConfig } from "./app-config"
import { validateEnvironment } from "./validate-environment"

/**
 * Reads and validates configuration from environment variables.
 * Other modules may access the parsed configuration using `ConfigService`.
 */
export const RootConfigModule = ConfigModule.forRoot({
  cache: true,
  validate: (config) => validateEnvironment(AppConfig, config),
})

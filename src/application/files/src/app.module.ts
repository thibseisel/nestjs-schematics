import { BeforeApplicationShutdown, Logger, Module } from "@nestjs/common"
import { CoreModule } from "./core/core.module"
import { FeatureModule } from "./feature.module"

/**
 * Root module of the application.
 * Should not be imported by any module.
 */
@Module({
  imports: [CoreModule, FeatureModule],
  controllers: [],
  providers: [],
})
export class AppModule implements BeforeApplicationShutdown {
  private readonly logger = new Logger("Shutdown")

  beforeApplicationShutdown(signal?: string) {
    if (signal) {
      this.logger.log(`Application received shutdown signal "${signal}"`)
    }
    this.logger.log(`Gracefully terminating application...`)
  }
}

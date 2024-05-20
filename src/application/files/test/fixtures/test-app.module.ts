import { CoreModule } from "@/core/core.module"
import { FeatureModule } from "@/feature.module"
import { Module } from "@nestjs/common"

/**
 * This module is only used as the entrypoint module for testing the application
 * in end-to-end tests.
 */
@Module({
  imports: [CoreModule, FeatureModule],
})
export class TestAppModule {}

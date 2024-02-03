import { Module } from "@nestjs/common"
import { CoreModule } from "../../src/core/core.module"
import { FeatureModule } from "../../src/feature.module"

/**
 * This module is only used as the entrypoint module for testing the application
 * in end-to-end tests.
 */
@Module({
  imports: [CoreModule, FeatureModule],
})
export class TestAppModule {}

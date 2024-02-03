import { Module } from "@nestjs/common"
import { MonitoringModule } from "./monitoring"

/**
 * Imports all feature modules.
 */
@Module({
  imports: [MonitoringModule],
})
export class FeatureModule {}

import { Module } from "@nestjs/common"
import { TerminusModule } from "@nestjs/terminus"
import { HealthController } from "./health.controller"

/**
 * Exposes endpoints to monitor the health on the application server.
 */
@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
})
export class MonitoringModule {}

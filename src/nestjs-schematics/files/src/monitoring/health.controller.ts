import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from "@nestjs/terminus"

@Controller({ path: "health", version: VERSION_NEUTRAL })
@ApiTags("Monitoring")
export class HealthController {
  constructor(private readonly service: HealthCheckService) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.service.check([])
  }
}

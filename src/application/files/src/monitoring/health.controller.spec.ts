import { HealthCheckResult, TerminusModule } from "@nestjs/terminus"
import { Test } from "@nestjs/testing"
import { HealthController } from "./health.controller"

describe(HealthController, () => {
  let controller: HealthController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
    }).compile()

    controller = module.get(HealthController)
  })

  describe("GET /health", () => {
    it("checks server health", async () => {
      const result = await controller.check()

      expect(result).toMatchObject<HealthCheckResult>({
        status: "ok",
        details: {},
      })
    })
  })
})

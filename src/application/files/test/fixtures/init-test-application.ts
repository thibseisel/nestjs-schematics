import { INestApplication, VersioningType } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { TestAppModule } from "./test-app.module"

export async function createTestApplication(): Promise<INestApplication> {
  const module = await Test.createTestingModule({
    imports: [TestAppModule],
  }).compile()

  module.useLogger(["error"])
  return module
    .createNestApplication()
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion: "1",
    })
    .init()
}

import { AppModule } from "@/app.module"
import { HttpStatus, INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import type { Server } from "http"
import supertest from "supertest"

describe("GET /health", () => {
  let app: INestApplication<Server>

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it("responds with 200 OK", async () => {
    const { status, body } = await supertest(app.getHttpServer()).get("/health")

    expect({ status, body }).toEqual({
      status: HttpStatus.OK,
      body: expect.objectContaining({ status: "ok" }),
    })
  })
})

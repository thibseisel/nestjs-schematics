import { HttpStatus, INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import type { Server } from "http"
import supertest from "supertest"
import { exposeApiDocs } from "./api-docs"

describe(exposeApiDocs, () => {
  let app: INestApplication<Server>

  beforeEach(async () => {
    const module = await Test.createTestingModule({}).compile()
    app = module.createNestApplication()
    exposeApiDocs(app)
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it("exposes HTML Swagger docs on the root path", async () => {
    const response = await supertest(app.getHttpServer()).get("/")

    expect(response.status).toBe(HttpStatus.OK)
    expect(response.headers["content-type"]).toBe("text/html; charset=utf-8")
  })
})

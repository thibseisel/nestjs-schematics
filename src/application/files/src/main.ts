import { INestApplication, VersioningType } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { exposeApiDocs } from "./api-docs"
import { AppModule } from "./app.module"
import { AppConfig } from "./core"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableShutdownHooks()
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" })
  configureApiDocs(app)

  await app.listen(3000)
}

function configureApiDocs(app: INestApplication): void {
  const config = app.get<ConfigService<AppConfig, true>>(ConfigService)
  if (config.get("SERVE_DOCS", false)) {
    exposeApiDocs(app)
  }
}

bootstrap().catch((error) =>
  console.error("Application bootstrap failed", error),
)

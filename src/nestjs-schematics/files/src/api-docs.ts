import { INestApplication } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

const APP_NAME = "<%= name %> API documentation"
const APP_VERSION = "<%= version %>"

/**
 * Generates and serve Swagger API documentation on the server root.
 * @param app Nest application.
 */
export function exposeApiDocs(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setVersion(APP_VERSION)
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/", app, document, {
    customSiteTitle: APP_NAME,
    swaggerOptions: {
      defaultModelsExpandDepth: 0,
      persistAuthorization: true,
      operationsSorter: "alpha",
      tagsSorter: "alpha",
    },
  })
}

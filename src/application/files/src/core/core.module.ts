import { ClassSerializerInterceptor, Module } from "@nestjs/common"
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core"
import { ThrottlerModule, minutes } from "@nestjs/throttler"
import { RootConfigModule } from "./config/root-config.module"
import { RequestValidationPipe } from "./request-validation.pipe"

const NestThrottlerModule = ThrottlerModule.forRoot([
  { ttl: minutes(1), limit: 100 },
])

/**
 * Imports declarations that should be imported only once by the root module.
 */
@Module({
  imports: [NestThrottlerModule, RootConfigModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_PIPE, useClass: RequestValidationPipe },
  ],
})
export class CoreModule {}

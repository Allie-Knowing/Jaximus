import { Module } from '@nestjs/common';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { UsecasesProxyDynamicModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { VideoController } from './presentation/video.controller';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
    UsecasesProxyDynamicModule.register(),
  ],
  controllers: [
    VideoController,
  ]
})
export class AppModule {}

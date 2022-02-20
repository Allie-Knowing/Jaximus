import { Module } from '@nestjs/common';
import { UsecasesProxyDynamicModule } from '../usecases-proxy/usecases-proxy.module';
import { VideoController } from './video/video.controller';

@Module({
  imports: [UsecasesProxyDynamicModule.register()],
  controllers: [VideoController],
})
export class ControllersModule {}

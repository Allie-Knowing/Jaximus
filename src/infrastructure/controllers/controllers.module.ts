import { Module } from '@nestjs/common';
import { VideoController } from 'src/presentation/video/video.controller';
import { UsecasesProxyDynamicModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  imports: [UsecasesProxyDynamicModule.register()],
  controllers: [VideoController],
})
export class ControllersModule {}

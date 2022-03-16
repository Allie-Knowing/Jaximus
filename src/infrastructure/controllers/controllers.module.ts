import { Module } from '@nestjs/common';
import { MulterConfigModule } from '../config/multer/multer-config.module';
import { UsecasesProxyDynamicModule } from '../usecases-proxy/usecases-proxy.module';
import { VideoController } from './video/video.controller';

@Module({
  imports: [UsecasesProxyDynamicModule.register(), MulterConfigModule],
  controllers: [VideoController],
})
export class ControllersModule {}

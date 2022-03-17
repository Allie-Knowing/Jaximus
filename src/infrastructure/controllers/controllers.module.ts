import { Module } from '@nestjs/common';
import { VideoController } from 'src/presentation/video/video.controller';
import { MulterConfigModule } from '../config/multer/multer-config.module';
import { UsecasesProxyDynamicModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  imports: [UsecasesProxyDynamicModule.register(), MulterConfigModule],
  controllers: [VideoController],
})
export class ControllersModule {}

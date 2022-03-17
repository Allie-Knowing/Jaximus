import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { VideoController } from 'src/presentation/video/video.controller';
import { MulterConfigService } from '../config/multer/multer-config.service';
import { UsecasesProxyDynamicModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  imports: [
    UsecasesProxyDynamicModule.register(),
    MulterModule.registerAsync({
      useExisting: MulterConfigService,
    }),
  ],
  controllers: [VideoController],
})
export class ControllersModule {}

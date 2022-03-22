import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { LikeController } from 'src/presentation/like/like.controller';
import { VideoController } from 'src/presentation/video/video.controller';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { MulterConfigService } from '../config/multer/multer-config.service';
import { UsecasesProxyDynamicModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  imports: [
    ConfigModule,
    UsecasesProxyDynamicModule.register(),
    MulterModule.registerAsync({
      imports: [EnvironmentConfigModule],
      useClass: MulterConfigService,
      inject: [EnvironmentConfigService],
    }),
  ],
  controllers: [VideoController, LikeController],
})
export class ControllersModule {}

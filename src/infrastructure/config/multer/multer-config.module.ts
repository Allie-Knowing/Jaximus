import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { MulterConfigService } from './multer-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EnvironmentConfigModule,
    MulterModule.registerAsync({
      imports: [MulterConfigModule],
      useExisting: MulterConfigService,
    }),
  ],
  providers: [MulterConfigService],
  exports: [MulterConfigService],
})
export class MulterConfigModule {}

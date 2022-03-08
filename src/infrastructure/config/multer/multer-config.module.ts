import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule, MulterModuleOptions } from '@nestjs/platform-express';
import { MulterConfigService } from './multer-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.registerAsync({
      imports: [MulterConfigModule],
      useExisting: MulterConfigService,
    }),
  ],
  providers: [MulterConfigService],
  exports: [MulterConfigService],
})
export class MulterConfigModule {}

import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { ExpoService } from './expo.service';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [ExpoService],
  exports: [ExpoService],
})
export class ExpoModule {}

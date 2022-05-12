import { Inject, Injectable } from '@nestjs/common';
import { Expo } from 'expo-server-sdk';
import { ExpoConfig } from 'src/domain/config/expo.interface';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

@Injectable()
export class ExpoService {
  constructor(
    @Inject(EnvironmentConfigService)
    private configService: ExpoConfig,
  ) {}

  getExpoServerClient(): Expo {
    return new Expo({
      accessToken: this.configService.getExpoToken(),
    });
  }
}

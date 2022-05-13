import { Inject, Injectable } from '@nestjs/common';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { ExpoConfig } from 'src/domain/config/expo.interface';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

@Injectable()
export class ExpoService {
  client: Expo;

  constructor(
    @Inject(EnvironmentConfigService)
    private configService: ExpoConfig,
  ) {
    this.client = new Expo({
      accessToken: this.configService.getExpoToken(),
    });
  }

  async sendPushNotification(messages: ExpoPushMessage[]) {
    const filteredMessages = messages.filter((value) => Expo.isExpoPushToken(value.to)); // expo token
    const chunks = this.client.chunkPushNotifications(filteredMessages);

    for (let chunk of chunks) {
      try {
        const ticketChunk = await this.client.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

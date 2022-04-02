import { Inject, Injectable } from '@nestjs/common';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { ESConfig } from 'src/domain/config/es.interface';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
  constructor(
    @Inject(EnvironmentConfigService)
    private configService: ESConfig,
  ) {}

  getESClient(): Client {
    return new Client({
      node: this.configService.getESNodeEndpoint(),
      auth: {
        username: this.configService.getESUsername(),
        password: this.configService.getESPassword(),
      },
    });
  }
}

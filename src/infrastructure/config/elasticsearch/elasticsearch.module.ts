import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { ElasticsearchService } from './elasticsearch.service';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [ElasticsearchService],
  exports: [ElasticsearchService],
})
export class ElasticsearchModule {}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/domain/config/database.interface';
import { ESConfig } from 'src/domain/config/es.interface';
import { RedisConfig } from 'src/domain/config/redis.interface';
import { S3Config } from 'src/domain/config/s3.interface';
import { ExpoConfig } from 'src/domain/config/expo.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, S3Config, ESConfig, RedisConfig, ExpoConfig {
  constructor(private configService: ConfigService) {}
  getExpoToken(): string {
    return this.configService.get<string>('EXPO_ACCESS_TOKEN');
  }

  getRedisHost(): string {
    return this.configService.get<string>('REDIS_HOST');
  }
  getRedisPort(): string {
    return this.configService.get<string>('REDIS_PORT');
  }

  getESNodeEndpoint(): string {
    return this.configService.get<string>('ES_NODE_ENDPOINT');
  }
  getESUsername(): string {
    return this.configService.get<string>('ES_USERNAME');
  }
  getESPassword(): string {
    return this.configService.get<string>('ES_PASSWORD');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }
  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }
  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }
  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }
  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }
  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNC');
  }
  getDatabaseLogging(): boolean {
    return this.configService.get<boolean>('DATABASE_LOGGING');
  }

  getAccessKey(): string {
    return this.configService.get<string>('AWS_ACCESS_KEY');
  }
  getSecretKey(): string {
    return this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
  }
  getRegion(): string {
    return this.configService.get<string>('AWS_REGION');
  }
  getBucketName(): string {
    return this.configService.get<string>('AWS_S3_BUCKET_NAME');
  }
}

import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../config/redis/redis-cache.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { LoginService } from './login.service';

@Module({
  imports: [ExceptionsModule, RepositoriesModule, RedisCacheModule],
  providers: [LoginService],
  exports: [LoginService],
})
export class UtilsModule {}

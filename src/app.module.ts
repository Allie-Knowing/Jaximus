import { Module } from '@nestjs/common';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/common/strategies/jwt.strategy';
import { ControllersModule } from './infrastructure/controllers/controllers.module';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
    ControllersModule,
    JwtModule.register({}),
  ],
  providers: [JwtStrategy]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AnswerController } from 'src/presentation/answer/answer.controller';
import { CommentController } from 'src/presentation/comment/comment.controller';
import { LikeController } from 'src/presentation/like/like.controller';
import { QuestionController } from 'src/presentation/question/question.controller';
import { SearchController } from 'src/presentation/search/search.controller';
import { UserController } from 'src/presentation/user/user.controller';
import { VideoController } from 'src/presentation/video/video.controller';
import { ElasticsearchModule } from '../config/elasticsearch/elasticsearch.module';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { MulterConfigService } from '../config/multer/multer-config.service';
import { UsecasesProxyDynamicModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  imports: [
    ConfigModule,
    UsecasesProxyDynamicModule.register(),
    MulterModule.registerAsync({
      imports: [EnvironmentConfigModule],
      useClass: MulterConfigService,
      inject: [EnvironmentConfigService],
    }),
  ],
  controllers: [VideoController, LikeController, CommentController, UserController, AnswerController, QuestionController, SearchController],
})
export class ControllersModule {}

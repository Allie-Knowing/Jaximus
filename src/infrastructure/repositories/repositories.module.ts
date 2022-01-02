import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { CommentTypeOrmEntity } from '../entities/comment.entity';
import { HashTagTypeOrmEntity } from '../entities/hash-tag.entity';
import { LikeTypeOrmEntity } from '../entities/like.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';
import { VideoTypeOrmEntity } from '../entities/video.entity';
import { DatabaseCommentRepository } from './comment.repository';
import { DatabaseHashTagRepository } from './hash-tag.repository';
import { DatabaseLikeRepository } from './like.repository';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseVideoRepository } from './video.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      UserTypeOrmEntity,
      CommentTypeOrmEntity,
      HashTagTypeOrmEntity,
      VideoTypeOrmEntity,
      LikeTypeOrmEntity,
    ]),
  ],
  providers: [
    DatabaseUserRepository,
    DatabaseCommentRepository,
    DatabaseHashTagRepository,
    DatabaseVideoRepository,
    DatabaseLikeRepository,
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseCommentRepository,
    DatabaseHashTagRepository,
    DatabaseVideoRepository,
    DatabaseLikeRepository,
  ],
})
export class RepositoriesModule {}

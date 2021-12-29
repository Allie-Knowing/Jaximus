import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Comment } from '../entities/comment.entity';
import { HashTag } from '../entities/hash-tag.entity';
import { Like } from '../entities/like.entity';
import { User } from '../entities/user.entity';
import { Video } from '../entities/video.entity';
import { DatabaseCommentRepository } from './comment.repository';
import { DatabaseHashTagRepository } from './hash-tag.repository';
import { DatabaseLikeRepository } from './like.repository';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseVideoRepository } from './video.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User, Comment, HashTag, Video, Like]),
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

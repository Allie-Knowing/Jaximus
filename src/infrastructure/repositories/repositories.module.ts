import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { BlockTypeOrmEntity } from '../entities/block.entity';
import { CommentTypeOrmEntity } from '../entities/comment.entity';
import { HashTagTypeOrmEntity } from '../entities/hash-tag.entity';
import { IqTypeOrmEntity } from '../entities/iq.entity';
import { LikeTypeOrmEntity } from '../entities/like.entity';
import { TierTypeOrmEntity } from '../entities/tier.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';
import { VideoTypeOrmEntity } from '../entities/video.entity';
import { DatabaseBlockRepository } from './block.repository';
import { DatabaseCommentRepository } from './comment.repository';
import { DatabaseHashTagRepository } from './hash-tag.repository';
import { DatabaseIqRepository } from './iq.repository';
import { DatabaseLikeRepository } from './like.repository';
import { DatabaseTierRepository } from './tier.repository';
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
      IqTypeOrmEntity,
      TierTypeOrmEntity,
      BlockTypeOrmEntity,
    ]),
  ],
  providers: [
    DatabaseUserRepository,
    DatabaseCommentRepository,
    DatabaseHashTagRepository,
    DatabaseVideoRepository,
    DatabaseLikeRepository,
    DatabaseIqRepository,
    DatabaseTierRepository,
    DatabaseBlockRepository,
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseCommentRepository,
    DatabaseHashTagRepository,
    DatabaseVideoRepository,
    DatabaseLikeRepository,
    DatabaseIqRepository,
    DatabaseTierRepository,
    DatabaseBlockRepository,
  ],
})
export class RepositoriesModule {}

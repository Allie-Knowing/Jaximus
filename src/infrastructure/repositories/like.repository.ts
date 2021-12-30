import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeRepository } from 'src/domain/repositories/like.repository';
import { Repository } from 'typeorm';
import { LikeTypeOrmEntity } from '../entities/like.entity';

@Injectable()
export class DatabaseLikeRepository implements LikeRepository {
  constructor(
    @InjectRepository(LikeTypeOrmEntity)
    private readonly likeEntityRepository: Repository<LikeTypeOrmEntity>,
  ) {}
}

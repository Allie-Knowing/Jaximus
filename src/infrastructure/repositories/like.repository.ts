import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeRepository } from 'src/domain/repositories/like-repository.interface';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';

@Injectable()
export class DatabaseLikeRepository implements LikeRepository {
  constructor(
    @InjectRepository(Like)
    private readonly likeEntityRepository: Repository<Like>,
  ) {}
}

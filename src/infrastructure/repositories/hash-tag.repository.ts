import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashTag } from 'src/domain/model/hash-tag';
import { HashTagRepository } from 'src/domain/repositories/hash-tag.repository';
import { Repository } from 'typeorm';
import { HashTagTypeOrmEntity } from '../entities/hash-tag.entity';

@Injectable()
export class DatabaseHashTagRepository implements HashTagRepository {
  constructor(
    @InjectRepository(HashTagTypeOrmEntity)
    private readonly hashTagEntityRepository: Repository<HashTagTypeOrmEntity>,
  ) {}

  async findQuestionHashtagList(videoId: number): Promise<HashTag[]> {
    const hashtags: any[] = await this.hashTagEntityRepository
      .createQueryBuilder('hashtag')
      .leftJoin('hashtag.question', 'video')
      .select('hashtag.id', 'id')
      .addSelect('hashtag.title', 'title')
      .where('video.id = :videoId', { videoId })
      .getRawMany();

    return hashtags.map((hashtag) => new HashTag(hashtag));
  }
}

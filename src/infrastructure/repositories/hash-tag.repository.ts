import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashTagRepository } from 'src/domain/repositories/hash-tag-repository.interface';
import { Repository } from 'typeorm';
import { HashTag } from '../entities/hash-tag.entity';

@Injectable()
export class DatabaseHashTagRepository implements hashTagRepository {
  constructor(
    @InjectRepository(HashTag)
    private readonly hashTagEntityRepository: Repository<HashTag>,
  ) {}
}

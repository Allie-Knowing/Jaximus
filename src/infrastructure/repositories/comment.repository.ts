import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { Repository } from 'typeorm';
import { CommentTypeOrmEntity } from '../entities/comment.entity';

@Injectable()
export class DatabaseCommentRepository implements CommentRepository {
  constructor(
    @InjectRepository(CommentTypeOrmEntity)
    private readonly commentEntityRepository: Repository<CommentTypeOrmEntity>,
  ) {}

  findOne(commentId: number) {
    return this.commentEntityRepository.findOne(commentId);
  }

  async commentAdoption(commentId: number): Promise<void> {
    await this.commentEntityRepository
      .createQueryBuilder()
      .update(CommentTypeOrmEntity)
      .set({ isAdoption: true })
      .where('id = :id', { id: commentId })
      .execute();
  }
}

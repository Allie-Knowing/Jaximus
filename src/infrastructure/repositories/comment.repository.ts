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
      .andWhere('video.deleted_at IS NULL')
      .execute();
  }

  async deleteCommentAnswer(commentId: number): Promise<void> {
    await this.commentEntityRepository.softDelete(commentId);
  }

  matchUser(userId: number) {
    return this.commentEntityRepository
      .createQueryBuilder('comment')
      .select()
      .where('comment.user_id = :user_id', { user_id: userId })
      .getCount();
  }
}

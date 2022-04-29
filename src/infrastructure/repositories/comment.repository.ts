import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/domain/model/comment';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { Repository } from 'typeorm';
import { CommentTypeOrmEntity } from '../entities/comment.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';
import { VideoTypeOrmEntity } from '../entities/video.entity';

@Injectable()
export class DatabaseCommentRepository implements CommentRepository {
  constructor(
    @InjectRepository(CommentTypeOrmEntity)
    private readonly commentEntityRepository: Repository<CommentTypeOrmEntity>,

    @InjectRepository(UserTypeOrmEntity)
    private readonly userEntityRepository: Repository<UserTypeOrmEntity>,

    @InjectRepository(VideoTypeOrmEntity)
    private readonly videoTypeOrmEntity: Repository<VideoTypeOrmEntity>,
  ) {}

  async findTextAnswer(questionId: number, userId: number, page: number, size: number): Promise<Comment[]> {
    const textAnswers: any[] = await this.commentEntityRepository
      .createQueryBuilder('comment')
      .innerJoin('comment.video', 'video')
      .innerJoin('comment.user', 'user')
      .select('comment.id')
      .addSelect('comment.content')
      .addSelect('comment.createdAt')
      .addSelect('comment.updatedAt')
      .addSelect('comment.isAdoption')
      .addSelect('user.id')
      .addSelect('user.profile')
      .addSelect('user.name')
      .offset((page - 1) * size)
      .limit(size)
      .where('video.id = :id', { id: questionId })
      .andWhere('comment.isAdoption = 0')
      .orderBy('comment.createdAt', 'DESC')
      .getMany();
    console.log(textAnswers);
    if (textAnswers.length === 0) return;

    const adoptionTextAnswer = await this.findAdoptionTextAnswer(questionId, userId);

    if (adoptionTextAnswer) textAnswers.unshift(adoptionTextAnswer);

    return Promise.all(
      textAnswers.map(async (t) => {
        t.isMine = t.user.id == userId ? true : false;
        return new Comment(t);
      }),
    );
  }

  async findOne(commentId: number): Promise<Comment> {
    const comment: any = await this.commentEntityRepository
      .createQueryBuilder('comment')
      .select('comment.id', 'commentId')
      .addSelect('comment.is_adoption', 'isAdoption')
      .addSelect('user.id', 'userId')
      .where('comment.id = :id', { id: commentId })
      .leftJoin('comment.user', 'user')
      .getRawOne();

    return comment ? new Comment(comment) : null;
  }

  async commentAdoption(commentId: number, userId: number): Promise<void> {
    await this.commentEntityRepository
      .createQueryBuilder()
      .update(CommentTypeOrmEntity)
      .set({ isAdoption: true })
      .where('id = :id', { id: commentId })
      .execute();

    await this.userEntityRepository
      .createQueryBuilder()
      .update(UserTypeOrmEntity)
      .set({ adoptionCnt: () => `adoption_cnt + 1` })
      .where('id = :id', { id: userId })
      .execute();
  }

  async deleteCommentAnswer(commentId: number): Promise<void> {
    await this.commentEntityRepository.softDelete(commentId);
  }

  findComment(commentId: number, userId: number) {
    return this.commentEntityRepository
      .createQueryBuilder('comment')
      .select('comment.id')
      .where('comment.id = :comment_id', { comment_id: commentId })
      .andWhere('comment.user_id = :user_id', { user_id: userId })
      .getOne();
  }

  async createCommentAnswer(content: string, questionId: number, userId: number): Promise<void> {
    const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(userId);
    const question: VideoTypeOrmEntity = await this.videoTypeOrmEntity.findOne(questionId);

    await this.commentEntityRepository.save({
      content,
      video: question,
      user,
    });
  }

  async findAdoptionTextAnswer(questionId: number, userId: number): Promise<Comment> {
    const textAnswer: any = await this.commentEntityRepository
      .createQueryBuilder('comment')
      .innerJoin('comment.video', 'video')
      .innerJoin('comment.user', 'user')
      .select('comment.id')
      .addSelect('comment.content')
      .addSelect('comment.createdAt')
      .addSelect('comment.updatedAt')
      .addSelect('comment.isAdoption')
      .addSelect('user.id')
      .addSelect('user.profile')
      .addSelect('user.name')
      .where('video.id = :id', { id: questionId })
      .andWhere('comment.isAdoption = 1')
      .orderBy('comment.createdAt', 'DESC')
      .getOne();

    if (!textAnswer) return;
    textAnswer.isMine = textAnswer.userId == userId ? true : false;
    return new Comment(textAnswer);
  }
}

import { VideoTypeOrmEntity } from 'src/infrastructure/entities/video.entity';
import { Comment } from '../model/comment';
import { Video } from '../model/video';

export interface CommentRepository {
  findOne(commentId: number);
  commentAdoption(commentId: number): Promise<void>;
  deleteCommentAnswer(commentId: number): Promise<void>;
  findComment(commentId: number, userId: number);
  createCommentAnswer(content: string, question: VideoTypeOrmEntity, userId: number): Promise<void>;
  findTextAnswer(questionId: number, page: number, size: number): Promise<Comment[]>;
}

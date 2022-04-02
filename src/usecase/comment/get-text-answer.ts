import { Comment } from "src/domain/model/comment";
import { CommentRepository } from "src/domain/repositories/comment.repository";

export class GetTextAnswerUseCase {
    constructor(private readonly commentRepository: CommentRepository) {}

    execute(questionId: number, page: number, size: number): Promise<Comment[]> {
        return this.commentRepository.findTextAnswer(questionId, page, size);
    }
}
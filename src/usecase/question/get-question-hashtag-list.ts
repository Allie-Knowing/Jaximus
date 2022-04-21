import { IException } from 'src/domain/exceptions/exceptions.interface';
import { HashTag } from 'src/domain/model/hash-tag';
import { HashTagRepository } from 'src/domain/repositories/hash-tag.repository';

export class GetQuestionHashtagListUsecase {
  constructor(private readonly hashtagRepository: HashTagRepository, private readonly exceptionsService: IException) {}

  async execute(videoId: number): Promise<HashTag[]> {
    const hashtags = await this.hashtagRepository.findQuestionHashtagList(videoId);
    if (hashtags.length === 0) this.exceptionsService.questionNotFoundException();
    return hashtags;
  }
}

import { HashTag } from '../model/hash-tag';

export interface hashTagRepository {
  findQuestionHashtagList(videoId: number): Promise<HashTag[]>;
}

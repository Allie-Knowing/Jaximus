import { HashTag } from '../model/hash-tag';

export interface HashTagRepository {
  findQuestionHashtagList(videoId: number): Promise<HashTag[]>;
}

export interface LikeRepository {
  createLike(videoId: number, userId: number): Promise<void>;
  findOne(videoId: number, userId: number);
}

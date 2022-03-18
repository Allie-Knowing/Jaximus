export interface LikeRepository {
  createLike(videoId: number): Promise<void>;
}

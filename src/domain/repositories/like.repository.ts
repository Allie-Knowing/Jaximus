export interface LikeRepository {
  findOne(videoId: number, userId: number);
}

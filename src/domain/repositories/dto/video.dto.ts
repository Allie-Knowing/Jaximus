import { IsDate, IsNumber, IsString } from 'class-validator';

export class GetVideoCommentList {
  @IsNumber()
  video_id: number;
  @IsString()
  video_url: string;
  @IsString()
  title: string;
  @IsDate()
  created_at: Date;
  @IsNumber()
  like_cnt: number;
  @IsString()
  profile: string;
  @IsNumber()
  user_id: number;
}

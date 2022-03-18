import { IsDate, IsNumber, IsString } from 'class-validator';

export class GetQuestionListPresenter {
  @IsNumber()
  video_id: number;
  @IsString()
  video_url: string;
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  like_cnt: number;
  @IsNumber()
  comment_cnt: number;
  @IsDate()
  created_at: Date;
  @IsString()
  profile: string;
  @IsNumber()
  user_id: number;
}

export class GetVideoCommentListPresenter {
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

import { IsNumber, IsString } from 'class-validator';

export class GetUserInfoPresenter {
  @IsString()
  name: string;
  @IsString()
  profile: string;
  @IsNumber()
  video_cnt: number;
}

export class GetUserQuestionListPresenter {
  @IsNumber()
  video_id: number;
  @IsString()
  video_url: string;
}

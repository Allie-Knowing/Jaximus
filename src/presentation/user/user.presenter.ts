import { IsNumber, IsString } from 'class-validator';

export class GetUserInfoPresenter {
  @IsString()
  name: string;
  @IsString()
  profile: string;
  @IsNumber()
  video_cnt: number;
}

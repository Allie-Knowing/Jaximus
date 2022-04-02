import { IsNumber, IsString } from 'class-validator';

export class GetUserQuestionListPresenter {
  @IsNumber()
  video_id: number;
  @IsString()
  video_url: string;
}

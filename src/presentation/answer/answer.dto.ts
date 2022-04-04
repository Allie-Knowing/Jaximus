import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateVideoAnswerDto {
  @IsString()
  title: string;

  @IsString()
  @Expose({ name: 'video_url' })
  videoUrl: string;
}

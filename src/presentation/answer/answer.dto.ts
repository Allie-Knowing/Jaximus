import { Expose } from 'class-transformer';

export class CreateVideoAnswerDto {
  title: string;

  @Expose({ name: 'video_url' })
  video_url: string;
}

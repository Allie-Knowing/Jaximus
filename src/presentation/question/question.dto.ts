import { Expose } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  compensation: 0;

  @IsArray()
  @Expose({ name: 'hash_tag' })
  hashTags: string[];

  @IsString()
  @Expose({ name: 'video_url' })
  videoUrl: string;
}

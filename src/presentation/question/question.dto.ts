import { Expose } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @Expose({ name: 'hash_tag' })
  hashTags: string[];

  @Expose({ name: 'video_url' })
  videoUrl: string;
}

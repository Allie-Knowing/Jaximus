import { Expose } from 'class-transformer';

export class CreateVideoDto {
  title: string;

  description: string;

  @Expose({ name: 'hash_tag' })
  hashTags: string[];

  @Expose({ name: 'video_url' })
  videoUrl: string;
}

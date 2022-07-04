import { Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class CreateVideoReportDto {
  @IsNumber()
  @Expose({ name: 'video_id' })
  videoId: number;

  @IsString()
  description: string;
}

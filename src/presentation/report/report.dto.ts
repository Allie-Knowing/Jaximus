import { Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class CreateVideoReportDto {
  @IsNumber()
  @Expose({ name: 'video_id' })
  videoId: number;

  @IsString()
  description: string;
}

export class CreateCommentReportDto extends CreateVideoReportDto {
  @IsNumber()
  @Expose({ name: 'comment_id' })
  commentId: number;
}

export class ReportResponseDto {
  @Expose({ name: 'video_id' })
  videoId: number;

  @Expose({ name: 'user_id' })
  userId: number;

  @Expose({ name: 'report_id' })
  reportId: number;

  @Expose({ name: 'comment_id' })
  commentId: number;

  @Expose({ name: 'video_url' })
  videoUrl: string;

  description: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}

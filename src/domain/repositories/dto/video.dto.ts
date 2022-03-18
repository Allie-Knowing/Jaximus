export class GetVideoCommentList {
  video_id: number;
  video_url: string;
  title: string;
  created_at: Date;
  like_cnt: number;
  profile: string;
  user_id: number;
}

export class QuestionList {
  video_id: number;
  video_url: string;
  title: string;
  description: string;
  like_cnt: number;
  comment_cnt: number;
  created_at: Date;
  profile: string;
  user_id: number;
}

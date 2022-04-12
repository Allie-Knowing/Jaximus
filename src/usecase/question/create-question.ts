import { Client } from '@elastic/elasticsearch';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { ElasticsearchService } from 'src/infrastructure/config/elasticsearch/elasticsearch.service';
import { CreateQuestionDto } from 'src/presentation/question/question.dto';

export class CreateQuestionUsecase {
  client: Client;

  constructor(private readonly videoRepository: VideoRepository, private readonly elasticsearchService: ElasticsearchService) {}

  async execute(video: CreateQuestionDto, userId: number) {
    if (this.client === undefined) {
      this.client = this.elasticsearchService.getESClient();
    }

    const savedVideo = await this.videoRepository.save(video, userId);
    const splitVideoUrl = video.videoUrl.split('/');
    const videoFilename = splitVideoUrl[splitVideoUrl.length - 1];
    const splitVideoFilename = videoFilename.split('.');
    await this.client.update({
      index: 'videosearch',
      id: savedVideo.id.toString(),
      type: '_doc',
      body: {
        doc: {
          thumbnail: `https://test-knowing.s3.ap-northeast-2.amazonaws.com/processed/${splitVideoFilename[0] + 'knowing'}.${
            splitVideoFilename[1]
          }`,
        },
      },
    });
  }
}

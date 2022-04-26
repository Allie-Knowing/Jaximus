import { Client } from '@elastic/elasticsearch';
import { IException } from 'src/domain/exceptions/exceptions.interface';
import { IqRepository } from 'src/domain/repositories/iq.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { ElasticsearchService } from 'src/infrastructure/config/elasticsearch/elasticsearch.service';
import { CreateQuestionDto } from 'src/presentation/question/question.dto';

export class CreateQuestionUsecase {
  client: Client;

  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly iqRepository: IqRepository,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly exceptionsService: IException,
  ) {}

  async execute(video: CreateQuestionDto, userId: number) {
    if (this.client === undefined) {
      this.client = this.elasticsearchService.getESClient();
    }

    const userIq = await this.iqRepository.getIq(userId);

    //if (userIq.curCnt < video.compensation) this.exceptionsService.notEnoughIqException();

    //await this.iqRepository.iqExpenditure(userId, video.compensation);

    const savedVideo = await this.videoRepository.save(video, userId);
    const splitVideoUrl = video.videoUrl.split('/');
    const videoFilename = splitVideoUrl[splitVideoUrl.length - 1];
    const splitVideoFilename = videoFilename.split('.');
    this.client.index(
      {
        index: 'videosearch',
        id: savedVideo.id.toString(),
        type: '_doc',
        body: {
          doc: {
            title: video.title,
            description: video.description,
            thumbnail: `https://test-knowing.s3.ap-northeast-2.amazonaws.com/processed/${splitVideoFilename[0] + 'knowing'}.${
              splitVideoFilename[1]
            }`,
          },
        },
      },
      (err, response) => {
        console.log(err);
        console.log('########');
        console.log(response);
      },
    );
  }
}

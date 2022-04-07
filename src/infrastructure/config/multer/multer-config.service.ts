import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import { v4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { S3Config } from 'src/domain/config/s3.interface';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(
    @Inject(EnvironmentConfigService)
    private configService: S3Config,
  ) {}

  createMulterOptions(): MulterModuleOptions {
    AWS.config.update({
      accessKeyId: this.configService.getAccessKey(),
      secretAccessKey: this.configService.getSecretKey(),
      region: this.configService.getRegion(),
    });

    const s3 = new AWS.S3();

    return {
      storage: multerS3({
        s3: s3,
        bucket: this.configService.getBucketName(),
        acl: 'public-read',
        key: (req, file: Express.Multer.File, cb) => {
          console.time();
          cb(null, `pre-process/${req.query.type}/${v4()}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`);
        },
      }),
      limits: { fieldSize: 50 * 1024 * 1024 },
    };
  }
}

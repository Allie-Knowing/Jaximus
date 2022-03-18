export interface S3Config {
  getAccessKey(): string;
  getSecretKey(): string;
  getRegion(): string;
  getBucketName(): string;
}

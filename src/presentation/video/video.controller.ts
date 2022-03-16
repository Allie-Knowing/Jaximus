import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { Video } from "src/domain/model/video";
import { CreateVideoUsecase } from "src/usecase/video/create-video";
import { GetQuestionListUseCases } from "src/usecase/video/get-questions-list";
import { GetQuestionListPresenter } from "./video.presenter";

@Controller('/video')
export class VideoController {
    
    constructor(
        @Inject(CreateVideoUsecase) private readonly createVideoUsecase: CreateVideoUsecase,
        @Inject(GetQuestionListUseCases) private readonly getQuestionListUsecase: GetQuestionListUseCases
    ) {}

    @Post('/')
    create(userId: number, @Body() request: Video) {
        this.createVideoUsecase.execute(userId, request);
    }

    @Get('/')
    async getQuestionList(): Promise<GetQuestionListPresenter[]> {
        return this.getQuestionListUsecase.execute();
    }
}
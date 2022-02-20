import { Body, Controller, Inject, Post } from "@nestjs/common";
import { Video } from "src/domain/model/video";
import { CreateVideoUsecase } from "src/usecase/video/create-video";

@Controller('/video')
export class VideoController {
    
    constructor(
        @Inject(CreateVideoUsecase) private readonly createVideoUsecase: CreateVideoUsecase,
    ) {}

    @Post('/')
    create(userId: number, @Body() request: Video) {
        this.createVideoUsecase.execute(userId, request);
    }
}
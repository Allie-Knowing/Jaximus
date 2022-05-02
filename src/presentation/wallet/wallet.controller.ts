import { Controller, Get, Inject, Post, Scope, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { Tier } from 'src/domain/model/tier';
import { GetActionPointUsecase } from 'src/usecase/wallet/action-point';
import { GetWalletInfoUsecase } from 'src/usecase/wallet/wallet-info';
import { GetActionPointDto } from './action-point.dto';

@Controller({ path: '/wallet', scope: Scope.REQUEST })
export class WalletController {
  constructor(
    @Inject(GetWalletInfoUsecase)
    private readonly walletInfoUsecase: GetWalletInfoUsecase,
    @Inject(GetActionPointUsecase)
    private readonly actionPointUsecase: GetActionPointUsecase,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  tierInfo(): Promise<Tier> {
    return this.walletInfoUsecase.execute(this.request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/action')
  actionPointInfo(): Promise<GetActionPointDto> {
    return this.actionPointUsecase.execute(this.request.user.sub);
  }
}

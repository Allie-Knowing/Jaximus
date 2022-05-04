import { Controller, Get, Inject, ParseIntPipe, Query, Scope, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { Tier } from 'src/domain/model/tier';
import { GetActionPointUsecase } from 'src/usecase/wallet/action-point';
import { GetPaymentHistoryUsecase } from 'src/usecase/wallet/payment-history';
import { GetWalletInfoUsecase } from 'src/usecase/wallet/wallet-info';
import { GetActionPointPresenter } from './action-point.presenter';
import { GetPaymentHistoryPresenter } from './payment-history.presenter';

@Controller({ path: '/wallet', scope: Scope.REQUEST })
export class WalletController {
  constructor(
    @Inject(GetWalletInfoUsecase)
    private readonly walletInfoUsecase: GetWalletInfoUsecase,
    @Inject(GetActionPointUsecase)
    private readonly actionPointUsecase: GetActionPointUsecase,
    @Inject(GetPaymentHistoryUsecase)
    private readonly paymentHistoryUsecase: GetPaymentHistoryUsecase,
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
  actionPointInfo(): Promise<GetActionPointPresenter> {
    return this.actionPointUsecase.execute(this.request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/history')
  paymentHistoryInfo(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ): Promise<GetPaymentHistoryPresenter[]> {
    return this.paymentHistoryUsecase.execute(this.request.user.sub, page, size);
  }
}

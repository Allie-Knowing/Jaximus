import { IqPaymentHistory } from './iq-payment-history';

export class IqPaymentCategory {
  id: number;
  name: string;
  iqPaymentHistory: IqPaymentHistory[];
}

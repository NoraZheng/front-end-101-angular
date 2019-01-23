import { Type } from 'class-transformer';
import { Tag } from './tag';

export class Transaction {
  transactionID: number;
  merchantName: string;
  transactionAmt: number;
  transactionDt: string;
  accountID: number;
  customerID: number;
  @Type(() => Tag)
  tags: Tag[];
}

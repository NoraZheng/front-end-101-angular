import { Type } from 'class-transformer';
import { Tag } from './tag';

export class Transaction {
  accountId: string;
  amount: string;
  customerId: string;
  merchantName: string;
  transactionDate: string;
  transactionId: string;
  @Type(() => Tag)
  tags: Tag[];
}

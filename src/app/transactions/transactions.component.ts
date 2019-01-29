import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Transaction } from '../../model/transaction';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[];
  displayedColumns: string[] = ['Merchant', 'Description', 'Tags', 'Amount'];

  constructor(private transactionService: TransactionService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe((transactions: Transaction[]) => {
      this.transactions = transactions;
    });
  }

  addTags(transaction: Transaction) {
    this.dialog.open(TagComponent, {
      width: '300px',
      height: '300px',
      data: transaction
    })

    this.dialog.afterAllClosed.subscribe(() => {
      this.loadTransactions();
    });
  }

}

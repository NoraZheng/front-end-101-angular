import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Transaction } from '../../model/transaction';
import {Tag} from '../../model/tag';
import {SessionStorageService} from 'ngx-webstorage';
import {TagService} from '../../service/tag.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[];
  isEdting = false;
  allCustomerTags: Tag[];
  editingTransactionTags = [];

  constructor(private transactionService: TransactionService, private storage: SessionStorageService,
              private tagService: TagService) { }

  ngOnInit() {
    this.loadTransactions();
    this.allCustomerTags = this.storage.retrieve('filteredTags');
    console.log(this.allCustomerTags);
  }

  loadTransactions() {
    const customerId = this.storage.retrieve('customerId');
    this.transactionService.getTransactionsByCustomerId(customerId).subscribe((transactions: Transaction[]) => {
      this.transactions = transactions;
    });
  }

  toggleTag() {
    this.isEdting = true;
  }

  submit() {
    const customerId = this.storage.retrieve('customerId');
    console.log(this.editingTransactionTags);
    this.tagService.tagTransactions(customerId, this.editingTransactionTags).subscribe(() => {
      this.loadTransactions();
    }, () => {}, () => {
      this.isEdting = false;
      this.editingTransactionTags = [];
    });
  }

  addTagsToTransaction(transation: Transaction, tag: Tag) {
    this.editingTransactionTags.push({
      transactionId: transation.transactionId.toString(),
      customerTagId: tag.customerTagId.toString()
    });
  }

  cancel() {
    this.editingTransactionTags = [];
  }

}

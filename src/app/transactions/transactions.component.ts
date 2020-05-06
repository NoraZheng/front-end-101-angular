import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from '../../service/transaction.service';
import { Transaction } from '../../model/transaction';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  tagManagerForm = this.fb.group({
    userId: ['', Validators.required]
  });
  tagError: Boolean = false;
  requiredError: Boolean = false;
  filteredTags: Transaction[];


  constructor(
    private fb: FormBuilder,
    private transaction: TransactionService
  ) { }

  get userId() {
    return this.tagManagerForm.get('userId');
  }

  getTagsByCustomerId() {
    this.tagError = this.requiredError = false;
    if (this.userId.value) {
      this.transaction.getTagsByCustomer(this.userId.value.toString()).subscribe((res: Transaction[]) => {
        if (res) {
          this.tagError = false;
          this.filteredTags = res;
        }
        if (res.length === 0) {
          this.tagError = true;
          this.filteredTags = null;
        }
      });
    } else {
      this.requiredError = true;
    }
  }

}

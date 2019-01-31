import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TransactionsComponent } from '../transactions/transactions.component';
import { TagService } from '../../service/tag.service';
import { Tag } from '../../model/tag';
import { Transaction } from '../../model/transaction';
import { SessionStorageService } from 'ngx-webstorage';


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  tags: Tag[];
  newTag: string;
  constructor(
    private dialogRef: MatDialogRef<TransactionsComponent>, //<Transac...> pointer to the 'parent' component
    private tagService: TagService, // annotation that is like a pointer to the data in the tag service,
    private sessionStorageService: SessionStorageService,
    @Inject(MAT_DIALOG_DATA) private data: Transaction) { }

  ngOnInit() {
    this.tags = this.data.tags;

  }

  // addCustomTag() {

  //   this.tagService.tagTransactions(this.data.transactionID, this.newTag).subscribe((res) => {
  //     // updating UI
  //     this.dialogRef.close();
  //   });
  // }

  close() {
    this.dialogRef.close();
  }



}

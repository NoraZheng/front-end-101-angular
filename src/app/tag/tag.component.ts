import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TransactionsComponent } from '../transactions/transactions.component';
import { TagService } from 'src/service/tag.service';
import { Tag } from 'src/model/tag';
import { Transaction } from 'src/model/transaction';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  tags: Tag[];
  newTag: string;
  constructor(private dialogRef: MatDialogRef<TransactionsComponent>,
    private tagService: TagService,
    @Inject(MAT_DIALOG_DATA) private data: Transaction) { }

  ngOnInit() {
    this.tags = this.data.tags;
    console.log(this.tags);
  }

  addCustomTag() {
    this.tagService.tagTransactions(this.data.transactionID, this.newTag).subscribe((res)=> {
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}

import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TagService } from '../../service/tag.service';
import { MatDialog } from '@angular/material';
import { TagAddComponent } from '../tag-add/tag-add.component';
import { SessionStorageService } from 'ngx-webstorage';
import {Tag} from '../../model/tag';


@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.scss']
})
export class TagManagerComponent {
  tagManagerForm = this.fb.group({
    userId: ['', Validators.required]
  });
  tagError: Boolean = false;
  filteredTags: Tag[];
  @ViewChild('errorMessage') errorMessage: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tag: TagService,
    private dialog: MatDialog,
    private sessSt: SessionStorageService
  ) { }

  get userId() {
    return this.tagManagerForm.get('userId');
  }

  getTagsByCustomerId() {
    this.tag.getTagsByCustomer(this.userId.value).subscribe((res) => {
      if (res && res['customerId']) {
        this.filteredTags = res['tags'];
        console.log(this.filteredTags);
        this.sessSt.store('customerId', res['customerId']);
        this.sessSt.store('filteredTags', this.filteredTags);
      }
    });
  }

  openTagDialog() {
    // this.dialog.open() returns a MatDialogRef
    const dialogRef = this.dialog.open(TagAddComponent, {
      height: '200px',
      width: '400px',
      data: { custId: this.userId.value, filteredTags: this.filteredTags }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.filteredTags = result;
    });
  }

  proceed() {
    this.router.navigate(['/transactions']);
  }


}

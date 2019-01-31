import { Component, OnInit, Inject, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TagManagerComponent } from '../tag-manager/tag-manager.component';
import { FormBuilder, Validators } from '@angular/forms';
import { TagService } from '../../service/tag.service';
import { SessionStorageService } from '../../../node_modules/ngx-webstorage';

@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.scss']
})
export class TagAddComponent implements OnInit {
  addTagForm = this.fb.group({
    tag: ['', Validators.required]
  });
  dataFromTagManager: object;
  responseCode: any;
  tagNameAdded: any;
  allTags: any;

  constructor(
    private dialogRef: MatDialogRef<TagManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private tagService: TagService,
    private sessSt: SessionStorageService
  ) {
    // we are subscribing to the click event of the backdrop
    this.dialogRef.backdropClick().subscribe(() => {
      this.closeDialog();
    });
  }

  ngOnInit() { this.dataFromTagManager = this.data; }

  // sends data when closing esc on dialog box
  @HostListener('window:keydown.esc') onKeyUp() {
    this.closeDialog();
  }

  get tag() {
    return this.addTagForm.get('tag');
  }

  closeDialog() {
    // pass data to 'parent' here
    this.sessSt.store('filteredTags', this.allTags || this.data.filteredTags);
    console.log(this.data.filteredTags);
    this.dialogRef.close(this.allTags || this.data.filteredTags);
  }

  createTag() {
    const tagName = this.tag.value.toString();
    this.tagService.createTag(this.data.custId, tagName).subscribe(() => {
      this.reloadTags();
    });
  }

  reloadTags() {
    const customerId = this.sessSt.retrieve('customerId');
    this.tagService.getTagsByCustomer(customerId).subscribe((res) => {
      if (res && res['customerId']) {
        this.allTags = res['tags'];
      }
      this.closeDialog();
    });
  }



}

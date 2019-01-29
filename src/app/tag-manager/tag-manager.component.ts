import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TagService } from '../../service/tag.service';
import { MatDialog } from '@angular/material';
import { TagAddComponent } from '../tag-add/tag-add.component';


@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.scss']
})
export class TagManagerComponent {
  tagManagerForm = this.fb.group({
    userId: ['', Validators.required]
  })
  tagsPresent: Boolean = false;
  tagError: Boolean = false;
  filteredTags: Object[];
  @ViewChild('errorMessage') errorMessage: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tag: TagService,
    private dialog: MatDialog
  ) { }

  get userId() {
    return this.tagManagerForm.get('userId');
  }

  getTagsByCustomerId() {
    this.tag.getTagsLocal(this.userId.value).subscribe((resp) => {
      try {
        // clear error div value
        if (this.tagError) {
          this.tagError = !this.tagError;
          this.errorMessage.nativeElement.value = "";
        }
        this.filteredTags = resp;
        this.filteredTags.length > 0 ? this.tagsPresent = true : this.tagsPresent = false;
      } catch (e) {
        this.tagError = true;
        throw new Error(`Could not find records matching that customerId 
       ${e}`)
      }
      // resp.forEach((user) => {
      //     user must conform to shape of tag.ts interface. 
      //     How come it does type checking here? As opposed to at resp? (which should be an array)
      //     console.log(user.tagId);
      // });
    })
  }

  proceed() {
    this.router.navigate(['/transactions']);
  }

  openTagDialog() {
    // this.dialog.open() returns a MatDialogRef
    const dialogRef = this.dialog.open(TagAddComponent, {
      height: '200px',
      width: '400px',
      data: { custId: this.userId.value, filteredTags: this.filteredTags }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
      this.filteredTags = result;
    })
  }


}

import { Component, OnInit, Inject, AfterViewInit, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TagManagerComponent } from '../tag-manager/tag-manager.component';
import { FormBuilder, Validators } from '@angular/forms';
import { TagService } from '../../service/tag.service';

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
  addedTagResponse: any;
  addedTagObject: any;
  responseCode: any;
  tagNameAdded: any;
  allTags: any;

  constructor(
    private dialogRef: MatDialogRef<TagManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private tagService: TagService,
    private renderer: Renderer2,
  ) {
    // we are subscribing to the click event of the backdrop
    this.dialogRef.backdropClick().subscribe(resp => {
      this.closeDialog();
      console.log('closed by backdrop');
    })

    this.renderer.listen(window, "mousedown", (event) => {
      if (event.keyCode === 27) {
        this.closeDialog();
        console.log('closed by esc');
      }
    })
  }

  ngOnInit() { this.dataFromTagManager = this.data; }

  get tag() {
    return this.addTagForm.get('tag');
  }

  closeDialog() {
    // pass data to 'parent' here
    console.log(this.allTags);
    console.log(this.data.filteredTags);
    this.dialogRef.close(this.allTags || this.data.filteredTags);
  }

  createTag() {
    this.tagService.addTagsLocal(this.data.custId, this.tag.value.toString()).subscribe((resp) => {
      try {
        this.addedTagResponse = resp;
        this.addedTagObject = this.addedTagResponse.addedTag;
        this.tagNameAdded = this.addedTagResponse.statusMsg;
        this.responseCode = this.addedTagResponse.statusCode;
        this.allTags = this.addedTagResponse.allTags;
        console.log(this.addedTagResponse);
      } catch (e) {
        throw Error(e);
      }
    })
  }



}

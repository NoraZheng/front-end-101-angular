import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';
import { TagManagerComponent } from '../tag-manager/tag-manager.component';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.scss']
})
export class TagEditorComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<TagManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeDialog() {
    this.dialogRef.close('Pizza!')
  }

  ngOnInit() { console.log(this.data); }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '../../../node_modules/@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
import { TagService } from '../../service/tag.service';

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.scss']
})
export class TagManagerComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tag: TagService
  ) { }

  tagManagerForm = this.fb.group({
    userId: ['']
  })

  ngOnInit() { }

  get userId() {
    return this.tagManagerForm.get('userId');
  }

  showTagsByCustomerId() {
    console.log(this.userId.value);
    this.tag.getTagsLocal().subscribe(resp => {
      console.log(typeof resp);
    })
  }

  proceed() {
    this.router.navigate(['/transactions']);
  }

}

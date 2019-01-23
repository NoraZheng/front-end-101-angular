import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from 'src/model/tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTagsUrl = '/api/tag/all-tag';
  tagTransactionUrl = '/api/tag/transaction';

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.getTagsUrl);
  }

  tagTransactions(transationId: number, newTag: string) {
    console.log(newTag);
    return this.http.post(this.tagTransactionUrl, {
      transactionId: transationId,
      newTag: newTag
    });
  }
}

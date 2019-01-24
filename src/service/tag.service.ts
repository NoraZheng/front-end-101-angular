import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Tag } from 'src/model/tag';
import { localTag } from 'src/model/localTag'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTagsUrl = '/api/tag/all-tag';
  tagTransactionUrl = '/api/tag/transaction';
  localGetTagsUrl = '../assets/transaction.json';

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.getTagsUrl);
  }

  getTagsLocal(): Observable<localTag[]> {
    return this.http.get<localTag[]>(this.localGetTagsUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  tagTransactions(transationId: number, newTag: string) {
    console.log(newTag);
    return this.http.post(this.tagTransactionUrl, {
      transactionId: transationId,
      newTag: newTag
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occured:', error.error.message);
    } else {
      console.log(`Backend returned code ${error.status}, body was ${error.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }
}

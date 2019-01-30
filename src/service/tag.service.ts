import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Tag } from '../model/tag';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTagsUrl = '/api/tag/all-tag';
  tagTransactionUrl = '/api/tag/transaction';
  localGetTagsUrl = 'http://localhost:3600/getTags/';
  localPostTagUrl = 'http://localhost:3600/addTag/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

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

  getTagsLocal(customerId): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.localGetTagsUrl}${customerId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addTagsLocal(customerId: string, tagName: string) {
    return this.http.post(
      `${this.localPostTagUrl}${customerId}/${tagName}`,
      [
        {
          customerId: customerId,
          tagToAdd: tagName
        }
      ]
      // this.httpOptions
    )
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {  // if executes here, client-side error
      console.log('An error occured:', error.error.message);
    } else {  // back-end error
      console.log(`Backend returned code ${error.status}, body was ${JSON.stringify(error.error)}`);
    }

    return throwError('Something bad happened; please try again later.');
  }
}

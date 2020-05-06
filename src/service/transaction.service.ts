import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../model/transaction';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  tagUrl = '/api/customer/{customerId}/tags';
  tagTransactionUrl = 'api/customer/tag/transactions';

  getTagsByCustomer(customerId: string): Observable<Transaction[]> {
    const endpoint = this.tagUrl.replace('{customerId}', customerId);
    return this.http.get<Transaction[]>(endpoint)
      .pipe(
        catchError(error => {
          const fn = this.handleError;
          return fn(error)
        })
        // can also be wrtten as:
        // catchError(this.handleError)
        // but 'this' - the calling context - will be undefined/global? as it's nested within catchError
      );
  }

  handleError(error) {
    if (error.error instanceof ErrorEvent) {
      console.log('An Error occured:', error.error.message);
    } else {
      console.log(`Backend returned code ${error.error.message}. Body was ${error.error}`);
    }
    return throwError('Need to fix!')
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Tag} from '../model/tag';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {
  }

  tagUrl = '/api/customer/{customerId}/tags';
  tagTransactionUrl = 'api/customer/tag/transactions';

  tagTransactions(customerId: string, transactionTagArray) {
    return this.http.post(this.tagTransactionUrl, transactionTagArray);
  }

  getTagsByCustomer(customerId: string): Observable<Tag[]> {
    const endpoint = this.tagUrl.replace('{customerId}', customerId);
    return this.http.get<Tag[]>(endpoint);
  }

  createTag(customerId: string, tagName: string) {
    const endpoint = this.tagUrl.replace('{customerId}', customerId);
    return this.http.post(endpoint, {
      'tagName': tagName
    });
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  transactionUrl = '/api/customer/{customerId}/transactions';

  /**
   * Load a list of transactions from the server using http
   */
  getTransactionsByCustomerId(customerId: number): Observable<Transaction[]> {
    const endpoint = this.transactionUrl.replace(`{customerId}`, customerId.toString());
    return this.http.get<Transaction[]>(endpoint);
  }


}

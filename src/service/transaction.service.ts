import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from 'src/model/transaction';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  transactionUrlLocal = 'assets/transaction.json';
  transactionUrl = '/api/transaction/transactions';

  /**
   * Load a list of transactions from the server using http
   */
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionUrl);
  }
}

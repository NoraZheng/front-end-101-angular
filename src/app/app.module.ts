import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckbox, MatCheckboxModule, MatDialogModule, MatInputModule, MatSelectModule } from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';
import { NgxWebstorageModule } from 'ngx-webstorage';



@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'tagManager', pathMatch: 'full' },
      { path: 'tagManager', component: TransactionsComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  // entryComponents: [TagComponent, TagAddComponent]
})
export class AppModule { }

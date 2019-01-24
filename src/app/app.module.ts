import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagComponent } from './tag/tag.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '../../node_modules/@angular/router';
import { TagManagerComponent } from './tag-manager/tag-manager.component';


@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    TagComponent,
    TagComponent,
    TagManagerComponent
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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'tagManager', pathMatch: 'full' },
      { path: 'tagManager', component: TagManagerComponent },
      { path: 'transactions', component: TransactionsComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TagComponent]
})
export class AppModule { }

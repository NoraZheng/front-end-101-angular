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
import { RouterModule } from '@angular/router';
import { TagManagerComponent } from './tag-manager/tag-manager.component';
import { TagAddComponent } from './tag-add/tag-add.component';
import { TagEditComponent } from './tag-edit/tag-edit.component';
import { NgxWebstorageModule } from 'ngx-webstorage';



@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    TagComponent,
    TagComponent,
    TagManagerComponent,
    TagAddComponent,
    TagEditComponent
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
    NgxWebstorageModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'tagManager', pathMatch: 'full' },
      { path: 'tagManager', component: TagManagerComponent },
      { path: 'transactions', component: TransactionsComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TagComponent, TagAddComponent]
})
export class AppModule { }

import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AppMaterialModule} from './app-material.module'

// Forms
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

// Users
import {AddUserComponent} from './add-user/add-user.component'
import {ListUsersComponent} from './list-users/list-users.component'

// Dialogs
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog'
import {ListConformationDialog} from './list-users/dialogs/list-conformation-dialog'
import {UpdateRecordDialog} from './list-users/dialogs/update-record-dialog';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ListUsersComponent,
    ListConformationDialog,
    UpdateRecordDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  entryComponents: [ListConformationDialog, UpdateRecordDialog],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

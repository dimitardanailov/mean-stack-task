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

@NgModule({
  declarations: [AppComponent, AddUserComponent, ListUsersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

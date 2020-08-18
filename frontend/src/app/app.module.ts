import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AppMaterialModule} from './app-material.module'

// Forms
import {FormsModule} from '@angular/forms'

// Users
import {AddUserComponent} from './add-user/add-user.component'
import {ListUsersComponent} from './list-users/list-users.component'
import {NavbarComponent} from './navbar/navbar.component'

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ListUsersComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

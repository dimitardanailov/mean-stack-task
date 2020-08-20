import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

import {AddUserComponent} from './add-user/add-user.component'
import {ListUsersComponent} from './list-users/list-users.component'

const routes: Routes = [
  {
    path: 'add-user',
    component: AddUserComponent,
  },
  {
    path: '',
    component: ListUsersComponent,
  },
  {
    path: '**',
    // TODO: PageNotFoundComponent must be added
    component: ListUsersComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

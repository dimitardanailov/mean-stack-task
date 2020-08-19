import {Component, OnInit} from '@angular/core'
import User from '../../models/User'
import SelectBoxItem from '../../ui-models/SelectBoxItem'
import {environment} from '../../environments/environment'
import roles from '../../db/roles'

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'role',
    'operations',
  ]
  users: User[] = []
  positions: SelectBoxItem[] = [
    {key: 'all', value: 'All'},
    {key: 'artist', value: 'Artist'},
    {key: 'designer', value: 'Designer'},
    {key: 'art_manager', value: 'Art manager'},
  ]

  roles: Map<string, string> = roles

  constructor() {}

  async ngOnInit(): Promise<any> {
    fetch(environment.REST_API.list_users)
      .then(async res => {
        const data = await res.json()
        this.users = data.users
      })
      .catch(() => {
        console.error(`${environment.REST_API.list_users} is unreachable`)
      })
  }

  async deleteRow(email): Promise<any> {
    this.users = this.users.filter(user => {
      return user.email !== email
    })

    await this.deleteRowRequest(email)
  }

  async deleteRowRequest(email): Promise<any> {
    const requestObject = {
      email,
    }

    const promise = new Promise((resolve, reject) => {
      fetch(environment.REST_API.deleteUser, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestObject),
      })
        .then(() => {
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })

    return promise
  }
}

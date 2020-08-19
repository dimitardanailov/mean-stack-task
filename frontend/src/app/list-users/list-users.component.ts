import {Component, OnInit} from '@angular/core'
import User from '../../models/User'

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
    'edit',
    'remove',
  ]
  users: User[] = []

  constructor() {}

  async ngOnInit(): Promise<any> {
    const REST_API_END_POINT = 'http://localhost:8080/users'
    fetch(REST_API_END_POINT)
      .then(async res => {
        const data = await res.json()
        this.users = data.users
      })
      .catch(() => {
        console.error(`${REST_API_END_POINT} is unreachable`)
      })
  }
}

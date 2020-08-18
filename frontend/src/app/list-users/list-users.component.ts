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
    const res = await fetch('http://localhost:8080/users')
    const data = await res.json()
    this.users = data.users
  }
}

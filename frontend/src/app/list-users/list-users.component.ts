import {Component, OnInit} from '@angular/core'

export interface User {
  firstName: string
  lastName: string
  email: string
  role: string
}

const DUMMY_USERS: User[] = [
  {
    firstName: 'Default',
    lastName: 'Defaultson',
    email: 'def@somemail.com',
    role: 'Art Manager',
  },
  {
    firstName: 'Albert',
    lastName: 'Einstein',
    email: 'def@somemail.com',
    role: 'Artist',
  },
  {
    firstName: 'Arnold',
    lastName: 'Schwarzenegger',
    email: 'def@somemail.com',
    role: 'Designer',
  },
  {
    firstName: 'Success',
    lastName: 'Moe',
    email: 'john@example.com',
    role: 'Jr. Developer',
  },
  {
    firstName: 'Danger',
    lastName: 'moe',
    email: 'mary@example.com',
    role: 'Developer',
  },
  {
    firstName: 'Info',
    lastName: 'Dooley',
    email: 'july@example.com',
    role: 'Artist',
  },
  {
    firstName: 'Bill',
    lastName: 'Clinton',
    email: 'july@example.com',
    role: 'Product Owner',
  },
  {
    firstName: 'Warning',
    lastName: 'Refs',
    email: 'bo@example.com',
    role: 'Sys Admin',
  },
  {
    firstName: 'Active',
    lastName: 'Activeson',
    email: 'act@example.com',
    role: 'Artist',
  },
  {
    firstName: 'Penelope',
    lastName: 'Cruz',
    email: 'act@example.com',
    role: 'Artist',
  },
]

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
  dataSource = DUMMY_USERS

  constructor() {}

  ngOnInit(): void {}
}

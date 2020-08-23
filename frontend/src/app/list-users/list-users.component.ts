import {Component, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {MatDialog} from '@angular/material/dialog'

import {ListConformationDialog} from './dialogs/list-conformation-dialog'
import {UpdateRecordDialog} from './dialogs/update-record-dialog'

import User from '../../models/User'
import SelectBoxItem from '../../ui-models/SelectBoxItem'
import {environment} from '../../environments/environment'
import roles from '../../db/roles'

import fetchRequest from '../../requests/fetchRequest'

interface UIUser extends User {
  isVisible: Boolean
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = [
    'First Name',
    'Last Name',
    'Email',
    'Role',
    null,
  ]
  users: UIUser[] = []
  positions: SelectBoxItem[] = [
    {key: 'all', value: 'All'},
    {key: 'artist', value: 'Artist'},
    {key: 'designer', value: 'Designer'},
    {key: 'art_manager', value: 'Art manager'},
  ]

  roles: Map<string, string> = roles
  form

  constructor(
    private formBuilder: FormBuilder,
    private updateRecordDialog: MatDialog,
    private conformationDialog: MatDialog,
  ) {
    this.form = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    })
  }

  async ngOnInit(): Promise<any> {
    const next = async res => {
      const data = await res.json()
      const uiUsers = []
      data.users.forEach(element => {
        const tempUser = {
          isVisible: true,
          ...element,
        }
        uiUsers.push(tempUser)
      })

      this.users = uiUsers.map(element => {
        return element
      })
    }

    fetchRequest(next, environment.REST_API.list_users)
  }

  async filterData(): Promise<any> {
    const filterOptions: User = this.form.value

    this.users.forEach(user => {
      const firstNameOption = this.filterTextItem(
        user.firstName,
        filterOptions.firstName,
      )

      const lastNameOption = this.filterTextItem(
        user.lastName,
        filterOptions.lastName,
      )

      const emailOption = this.filterTextItem(user.email, filterOptions.email)

      const roleFilterOption = this.filterRoleItem(
        user.role,
        filterOptions.role,
      )

      user.isVisible =
        firstNameOption && lastNameOption && emailOption && roleFilterOption
    })
  }

  filterRoleItem(userRole: string, filterOption: string): Boolean {
    if (filterOption === 'all' || filterOption === '') return true

    return filterOption === userRole ? true : false
  }

  filterTextItem(dbRecord: string, filterOption: string): Boolean {
    if (filterOption.length === 0) return true

    const regExp = new RegExp(filterOption)

    return regExp.test(dbRecord) ? true : false
  }

  async openUpdateRecordDialog(user: User): Promise<any> {
    const dialogRef = this.updateRecordDialog.open(UpdateRecordDialog, {
      data: {
        user,
      },
    })

    dialogRef.afterClosed().subscribe(dbUser => {
      if (typeof dbUser === 'object') {
        this.users.forEach(loopUser => {
          if (loopUser.email === dbUser.email) {
            loopUser.firstName = dbUser.firstName
            loopUser.lastName = dbUser.lastName
          }
        })
      }
    })
  }

  async openListConformationDialog(email): Promise<any> {
    const dialogRef = this.conformationDialog.open(ListConformationDialog, {
      data: {
        email,
      },
    })

    dialogRef.afterClosed().subscribe(operation => {
      if (operation) {
        this.deleteRow(email)
      }
    })
  }

  async deleteRow(email): Promise<any> {
    this.users.forEach(user => {
      if (user.email === email) {
        user.isVisible = false
      }
    })

    await this.deleteRowRequest(email).then(dbEmail => {
      this.users = this.users.filter(user => {
        return user.email !== dbEmail
      })
    })
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
        .then(async res => {
          const data = await res.json()
          const dbEmail = data.email
          resolve(dbEmail)
        })
        .catch(error => {
          reject(error)
        })
    })

    return promise
  }
}

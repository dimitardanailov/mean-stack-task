import {Component, OnInit} from '@angular/core'
import {NgForm} from '@angular/forms'
import User from '../../models/User'
import {environment} from '../../environments/environment'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  dbHasArtManager = false
  formErrorMessage = ''

  constructor() {}

  async ngOnInit(): Promise<any> {
    this.dbHasArtManager = await this.updateDbHasArtManagerProperty()
  }

  async onSubmit(f: NgForm) {
    const user: User = {
      firstName: 'Dimitar',
      lastName: 'Danailov',
      email: 'dimityr.danailov@gmail.com',
      role: 'designer',
    }

    if (user.role === 'art_manager') {
      this.dbHasArtManager = await this.updateDbHasArtManagerProperty()
      if (this.dbHasArtManager) {
        this.formErrorMessage = 'Please choise a different position!'
        return
      }
    }

    const emailCanBeUsed = await this.emailIsUnique(user.email)
    if (!emailCanBeUsed) {
      this.formErrorMessage = "The current email can't be used!"
      return
    }

    console.log('json', JSON.stringify(user))

    const restAPIRequest = fetch(environment.REST_API.createUser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    restAPIRequest.then(res => {
      console.log('response', res)
    })

    console.log(f.value) // { first: '', last: '' }
    console.log(f.valid) // false
  }

  async updateDbHasArtManagerProperty(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      fetch(environment.REST_API.roleArtManagerIsAvailable)
        .then(async res => {
          const data = await res.json()
          resolve(data.dbHasArtManager)
        })
        .catch(error => {
          /**
           * DRY Anti pattern!!!
           *
           * TODO: The error handling should be reusable method.
           */
          console.error(
            `${environment.REST_API.roleArtManagerIsAvailable} is unreachable`,
          )
          reject(error)
        })
    })

    return promise
  }

  async emailIsUnique(email): Promise<any> {
    const uri = `${environment.REST_API.emailIsUnique}/${email}`
    const promise = new Promise((resolve, reject) => {
      fetch(uri)
        .then(async res => {
          const data = await res.json()
          resolve(data.emailIsUnique)
        })
        .catch(error => {
          /**
           * DRY Anti pattern!!!
           *
           * TODO: The error handling should be reusable method.
           */
          console.error(`${uri} is unreachable`)
          reject(error)
        })
    })

    return promise
  }
}

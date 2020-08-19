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

  constructor() {}

  async ngOnInit(): Promise<any> {
    this.dbHasArtManager = await this.updateDbHasArtManagerProperty()
  }

  onSubmit(f: NgForm) {
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
          console.error(
            `${environment.REST_API.roleArtManagerIsAvailable} is unreachable`,
          )
          reject(error)
        })
    })

    return promise
  }
}

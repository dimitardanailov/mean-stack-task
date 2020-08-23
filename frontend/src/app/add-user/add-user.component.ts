import {Component, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import User from '../../models/User'
import {environment} from '../../environments/environment'
import {Router} from '@angular/router'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  dbHasArtManager = false
  formErrorMessage = ''
  fieldErrors = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  }
  form

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    })
  }

  async ngOnInit(): Promise<any> {
    this.dbHasArtManager = await this.updateDbHasArtManagerProperty()
  }

  /**
   * The validation process must be replaced with https://xstate.js.org/
   * The current process creates potential bugs and issues.
   *
   * @param event
   */
  async validateFirstName(event) {
    const {value} = event.target
    if (value.length === 0) {
      this.fieldErrors.firstName = 'The first name is required!'
      return
    }

    const fieldHasNumbers = this.fieldValueHasNumbers(value)
    if (fieldHasNumbers) {
      this.fieldErrors.firstName = 'Numbers are not allowed.'
      return
    }

    this.fieldErrors.firstName = ''
  }

  async validateLastName(event) {
    const {value} = event.target

    if (value.length === 0) {
      this.fieldErrors.lastName = 'The last name is required!'
      return
    }

    const fieldHasNumbers = this.fieldValueHasNumbers(value)
    if (fieldHasNumbers) {
      this.fieldErrors.lastName = 'Numbers are not allowed'
      return
    }

    this.fieldErrors.lastName = ''
  }

  async validateEmail(event): Promise<any> {
    const email = event.target.value

    if (email.length === 0) {
      this.fieldErrors.email = 'The email field is required'
      return
    }

    /**
     * Article:
     * https://ui.dev/validate-email-address-javascript/
     */
    const emailIsValid = /\S+@\S+\.\S+/.test(email)
    if (!emailIsValid) {
      this.fieldErrors.email = 'The current email format is invalid'
      return
    }

    const emailCanBeUsed = await this.emailIsUnique(email)
    if (!emailCanBeUsed) {
      this.fieldErrors.email = 'The email is used by another person'
      return
    }

    this.fieldErrors.email = ''
  }

  async roleIsUpdated(): Promise<any> {
    this.fieldErrors.role = ''
  }

  disableButtonIsActive() {
    const firstNameHasErrors = this.fieldErrors.firstName.length > 0
    const lastNameHasErrors = this.fieldErrors.lastName.length > 0
    const emailFieldHasErrors = this.fieldErrors.email.length > 0

    if (firstNameHasErrors || lastNameHasErrors || emailFieldHasErrors) {
      return true
    }

    return false
  }

  async onSubmit(user: User) {
    if (user.firstName.length === 0) {
      this.fieldErrors.firstName = 'The first name is required!'
      return
    }

    if (user.lastName.length === 0) {
      this.fieldErrors.lastName = 'The last name is required!'
      return
    }

    if (user.email.length === 0) {
      this.fieldErrors.email = 'The email field is required!'
      return
    }

    if (user.role.length === 0) {
      this.fieldErrors.role = 'The role field is required!'
      return
    }

    if (user.role === 'art_manager') {
      this.dbHasArtManager = await this.updateDbHasArtManagerProperty()
      if (this.dbHasArtManager) {
        this.fieldErrors.role = 'Please choise a different position!'
        return
      }
    }

    const emailCanBeUsed = await this.emailIsUnique(user.email)
    if (!emailCanBeUsed) {
      this.formErrorMessage = "The current email can't be used!"
      return
    }

    const restAPIRequest = fetch(environment.REST_API.createUser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    restAPIRequest.then(() => {
      this.router.navigate(['/'])
    })
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

  fieldValueHasNumbers(value) {
    const regExp = /\d/
    if (regExp.test(value)) {
      return true
    } else {
      return false
    }
  }
}

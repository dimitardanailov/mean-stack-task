import {Component, Inject} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import User from '../../../../models/User'
import {environment} from '../../../../environments/environment'

export interface DialogData {
  user: User
}

@Component({
  selector: 'update-record-dialog',
  templateUrl: 'update-record-dialog.html',
})
export class UpdateRecordDialog {
  form

  constructor(
    public dialogRef: MatDialogRef<UpdateRecordDialog>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.form = this.formBuilder.group({
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      role: data.user.role,
    })
  }

  async onSubmit(user: User) {
    const restAPIRequest = fetch(environment.REST_API.updateUser, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    restAPIRequest.then(() => {
      this.dialogRef.close(user)
    })
  }
}

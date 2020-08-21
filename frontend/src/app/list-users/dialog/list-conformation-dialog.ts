import {Component, Inject} from '@angular/core'
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

export interface DialogData {
  email: string
}

@Component({
  selector: 'list-conformation-dialog',
  templateUrl: 'list-conformation-dialog.html',
})
export class ListConformationDialog {
  constructor(
    public dialogRef: MatDialogRef<ListConformationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  closeDialog(confirm) {
    this.dialogRef.close(confirm)
  }
}

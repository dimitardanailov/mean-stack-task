import {Component, OnInit} from '@angular/core'
import {NgForm} from '@angular/forms'
import User from '../../models/User'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  managerPositionIsAvailable = true

  constructor() {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    console.log(f.value) // { first: '', last: '' }
    console.log(f.valid) // false
  }
}

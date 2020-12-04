import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public user_code = new FormControl('', [Validators.required, Validators.maxLength(5)]); //length just for testing

  getErrorMessage() {
    if (this.user_code.hasError('required')) {
      return 'You must enter a value';
    }

    return this.user_code.hasError('user_code') ? 'Not a valid code' : '';
  }

}

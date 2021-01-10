import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Invitation } from '../core/interfaces/invitation.interface';
import { InviteService } from '../core/services/invite.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent implements OnInit {
  public inviteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    protected is: InviteService,
    private ns: NotificationService
  ) {
    this.inviteForm = this.formBuilder.group({
      invited_user: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  invite(form: FormGroup) {
    if (form.valid) {
      this.is.inviteUser(<Invitation>form.value);
      this.ns.show('You have sent the invitation!');
    } else {
      this.ns.show('ERROR! Invalid data');
    }
  }
}

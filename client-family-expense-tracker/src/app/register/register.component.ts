import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../core/interfaces/user.interface';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';
/* import { MatchValidation } from '../core/validators/match.validator'; */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{

  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    protected auth: AuthService,
		private ns: NotificationService
  ) {
    this.registerForm = this.formBuilder.group({
			name: [null, [Validators.minLength(5), Validators.required]],
			username: [null, [Validators.email, Validators.required]],
			password: [null, [Validators.required, Validators.maxLength(30)]],
			passwordConfirm: [null, Validators.required]
		},
		{
			/* validator: MatchValidation.MatchPassword */
		});
   }

   register(form: FormGroup): void {
		if (form.valid) {
      delete form.value.name;
      delete form.value.passwordConfirm;
      this.auth.register(<User>form.value);
      this.registerForm.reset();
		}
		else {
			this.ns.show('HIBA! Adatok nem megfelelőek!');
    }
  }

}

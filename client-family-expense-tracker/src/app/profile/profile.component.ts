import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../core/interfaces/user.interface';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor(public user: UserService) {}


  userProfile = this.user.userProfile$.getValue()[0];

  ngOnInit(): void {
    this.user.getProfile();
  }
}

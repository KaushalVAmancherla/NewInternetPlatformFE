import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../shared/services/user-info.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nip-header',
  templateUrl: './nip-header.component.html',
  styleUrls: ['./nip-header.component.scss']
})
export class NipHeaderComponent implements OnInit {

  faUser = faUser;

  constructor(
    protected router: Router,
    private userInfoService: UserInfoService
  ) { }

  ngOnInit() {
  }

  search() {
    // TODO Implement search
  }

  goToMyProfile() {
    if (this.userInfoService.getUser()) {
      // TODO Implement profile page
    } else {
      this.router.navigate(['login']);
    }
  }

  logout() {
    // TODO Implement logout
    this.userInfoService.setUser(null);
    this.router.navigate(['home']);
  }

}

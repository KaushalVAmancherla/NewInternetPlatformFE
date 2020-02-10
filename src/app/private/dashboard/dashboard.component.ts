import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../shared/services/user-info.service';

/**
 * User dashboard page
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    protected router: Router,
    private userInfoService: UserInfoService
  ) {
  }

  ngOnInit() {
  }

}

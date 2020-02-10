import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../shared/services/user-info.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from '../shared/models/menu-item';

/**
 * Header site
 */
@Component({
  selector: 'app-nip-header',
  templateUrl: './nip-header.component.html',
  styleUrls: ['./nip-header.component.scss']
})
export class NipHeaderComponent implements OnInit {

  faUser = faUser;

  /**
   * User menu
   */
  userMenu: Array<MenuItem> = [];

  constructor(
    protected router: Router,
    private userInfoService: UserInfoService
  ) {
  }

  ngOnInit() {
    this.userInfoService.isUserLogged().subscribe(isLogged => {
      this.setUserMenu();
    });
  }

  /**
   * Search in the site
   */
  search(): void {
    // TODO Implement search
  }

  /**
   * Set User menu
   */
  setUserMenu(): void {
    this.userMenu = [];
    const items: Array<MenuItem> = [];

    items.push({
      id: 'my-profile',
      label: 'My Profile',
      function: this.goToMyProfile,
      link: 'private/user-profile'
    });

    if (this.userInfoService.getUser()) {
      items.push({
        id: 'settings',
        label: 'Settings',
        function: this.goToLink,
        link: 'home' // TODO Set router link
      });
      items.push({
        id: 'logout',
        label: 'Logout',
        function: this.logout,
        link: 'home'
      });
    }

    this.userMenu = items;
  }

  trackByMenu(index, item): string {
    return item.id;
  }

  goToMyProfile(item): void {
    if (this.userInfoService.getUser()) {
      this.router.navigate([item.link]);
    } else {
      this.router.navigate(['login']);
    }
  }

  goToLink(item: any): void {
    this.router.navigate([item.link]);
  }

  /**
   * Perform user logout
   */
  logout(): void {
    // TODO Implement logout
    this.userInfoService.setUser(null);
    this.router.navigate(['home']);
  }

}

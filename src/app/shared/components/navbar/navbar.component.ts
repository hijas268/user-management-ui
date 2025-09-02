import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  template: \
  <nav>
    <a routerLink='/dashboard'>Dashboard</a>
    <a routerLink='/users' *ngIf='auth.isAuthenticated() && auth.getRole()===\"Admin\"'>Users</a>
    <a routerLink='/auth/login' *ngIf='!auth.isAuthenticated()'>Login</a>
    <button (click)='auth.logout()' *ngIf='auth.isAuthenticated()'>Logout</button>
  </nav>
  \
})
export class NavbarComponent {
  constructor(public auth: AuthService) {}
}

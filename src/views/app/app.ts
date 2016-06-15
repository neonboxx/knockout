import { Component } from '@angular/core';
import { Route, RouteConfig, RouterOutlet } from '@angular/router-deprecated';
import { AuthService } from 'src/core/auth';
import { SignIn } from 'src/views/sign-in';
import { Players } from 'src/views/players';
import { AppHeader } from './app-header';


@RouteConfig([
  new Route({path: '/', component: SignIn, name: 'SignIn'}),
  new Route({path: '/players', component: Players, name: 'Players'})
])

@Component({
  directives: [
    AppHeader,
    RouterOutlet
  ],
  selector: 'app',
  styles: [
    require('./app.scss')
  ],
  template: `
    <app-header
      [authenticated]="auth.authenticated"
      (signOut)="signOut()"></app-header>
    
    <main class="main">
      <router-outlet></router-outlet>
    </main>
  `
})

export class App {
  constructor(private auth: AuthService) {}

  signOut(): void {
    this.auth.signOut();
    window.location.replace('/');
  }
}

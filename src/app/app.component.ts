import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { NavbarComponent } from './core/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-shopping';

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {
    auth.getAuthState().subscribe((user) => {
      if (user) {
        userService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        let returnQueryParamns = JSON.parse(
          localStorage.getItem('returnQueryParams') || '{}'
        );
        if (returnUrl) {
          localStorage.removeItem('returnUrl');
          localStorage.removeItem('returnQueryParams');
        router.navigate([returnUrl], { queryParams: returnQueryParamns });
        }
      }
    });

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

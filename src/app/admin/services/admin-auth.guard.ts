import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { map, switchMap } from 'rxjs';
import { UserService } from 'shared/services/user.service';

export const AdminAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const userService = inject(UserService);

  return auth
    .getAuthState()
    .pipe(switchMap((user) => userService.get(user?.uid || '')))
    .pipe(
      map((x) => {
        return x?.isAdmin || false;
      })
    );
};

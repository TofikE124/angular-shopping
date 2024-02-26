import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { map } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.getAuthState().pipe(
    map((user) => {
      if (user) return true;
      auth.signInWithRedirect(state.url);
      return false;
    })
  );
};

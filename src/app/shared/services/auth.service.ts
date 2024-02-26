import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable, map, switchMap } from 'rxjs';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  async signInWithPopUp(returnUrl: string = '', queryParams: any = {}) {
    localStorage.setItem('returnUrl', returnUrl);
    localStorage.setItem('returnQueryParams', JSON.stringify(queryParams));
    const provider = new GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider);
  }

  async signInWithRedirect(returnUrl?: string) {
    if (returnUrl) localStorage.setItem('returnUrl', returnUrl);
    const provider = new GoogleAuthProvider();
    this.afAuth.signInWithRedirect(provider);
  }

  async signOut() {
    this.afAuth.signOut();
  }

  getAppUser$(): Observable<AppUser | null> {
    return this.afAuth.authState.pipe(
      switchMap((state) => this.userService.get(state?.uid || ''))
    );
  }

  getAuthState() {
    return this.afAuth.authState;
  }
}

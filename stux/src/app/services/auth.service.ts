import { Injectable, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  public isLoginSubject: EventEmitter < boolean > = new EventEmitter();

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async login(username: string, password: string) {

    try {
      await this.afAuth.auth.signInWithEmailAndPassword(username, password)
      console.log('login success');
      this.setUser(true);
      this.router.navigate(['admin-panel']);
    } catch (e) {
      alert("Error!" + e.message);
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.setUser(false);
    this.router.navigate(['home']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  setUser(loggedin: boolean) {
    this.isLoginSubject.emit(loggedin);
  }

  getUserEmitter(): Observable < boolean > {
    return this.isLoginSubject;
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Authentication } from './authentication';
import { User } from './user.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticationUrl = 'api/authentication';
  user = new BehaviorSubject<User | null>(null);
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router) { }

  private log(message: string) {
    this.messageService.add(`ProjectService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error);
  
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }

  login(authentication: Authentication): Observable<Authentication> {
    return this.http.post<Authentication>(this.authenticationUrl, authentication, this.httpOptions).pipe(
      tap((newAuhenticaton: Authentication) => this.log(`added project w/ email=${newAuhenticaton.email}`)),
      tap(
        resData => {
          const user = new User(resData.email, resData._token);
          this.user.next(user);
        }
      ),
      catchError(this.handleError<Authentication>('loginUser'))
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/accueil']); 
  }

}

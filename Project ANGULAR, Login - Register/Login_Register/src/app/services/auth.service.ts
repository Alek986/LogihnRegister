import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ovoj signal oznacuva dali sme avtenticirani ili ne za da vlagame vo rutite.

  isAuth = signal<boolean>(false);

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  //da se stavi tocnata ruta od api-to
  register(firstName: string, lastName: string, userName: string, email: string, cardNumber: number, password: string) {
    return this.http.post('localhost:3000/api/auth/register', {
      firstName,
      lastName,
      userName,      
      email,
      cardNumber,
      password
    }).pipe(
      catchError((error) => {
        if (error) {
          console.log(error)
        }
        return of(null)
      })
    )
  };


  //da se stavi tocnata ruta od api-to
  login(userName: string, password: string) {

    return this.http.post<{
      accessToken: string,
      refreshToken: string
    }>('localhost:3000/api/auth/login', {
      userName,
      password
    }).pipe(
      tap((response) => {
        console.log('auth-response', response);
        localStorage.setItem('access', response.accessToken);
        localStorage.setItem('refresh', response.refreshToken);

        this.isAuth.set(true);
      }),
      catchError((error) => {
        if(error) {
          console.log(error)
        }
        this.isAuth.set(false)
        return of (null)
      })
    )

  };  



  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.isAuth.set(false);
    this.router.navigate(['/login']);
  };


}

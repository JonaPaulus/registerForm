import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor() { }

  public registerUser(registerFormData: string): Promise<number> {
    return fetch('https://demo-api.now.sh/users', {
      method: 'POST',
      body: registerFormData,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(data => {
      return (data && data.status) ? data.status : 500;
    })
    .catch(err => {
      console.error('there has been an error creating a new account: ' + err);
      return 500;
    });
  }
}

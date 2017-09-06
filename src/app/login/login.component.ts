import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { LoginService } from './login.service';

@Component({
  selector: 'my-login',
  templateUrl: './login.html',
  styleUrls:  ['./login.css'],
  providers: [LoginService]
})
export class LoginComponent {
  constructor(public router: Router ,private loginService: LoginService) {}

  login(event, username, password) {
    event.preventDefault();
    this.loginService.login(username, password)
                     .subscribe(
                       response => {
                        localStorage.setItem('token', response.access_token);
                        this.router.navigateByUrl('/home');
                       },
                       error => {
                        alert(error);
                       }
                     );
 }
}

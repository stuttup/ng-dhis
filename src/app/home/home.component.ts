import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';

import { Router } from '@angular/router';

@Component({
    selector: 'my-home',
    templateUrl: './home.html',
    styleUrls:  ['./home.css'],
    providers : [ LoginService ]
})
export class HomeComponent {

constructor(public router: Router ,private loginService: LoginService) {}

    logout(){
        this.loginService.logout();
        this.router.navigateByUrl('/login');
    }
}

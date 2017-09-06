import { Component, OnInit } from '@angular/core';

import {getInstance} from 'd2/lib/d2';
import {init} from 'd2/lib/d2';

import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Gemed Pilot';
  application_url = 'https://gemed-pilot.sante-bj.org/';

  constructor (private login: LoginService)  {
  }

  ngOnInit(): void {
    // init({baseUrl: 'https://gemed-pilot.sante-bj.org/api'})
    // .then(d2 => {
    //   d2.models.user.list()
    //     .then(userCollection => {
    //       userCollection.forEach(user => console.log(user.name));
    //     });
    // });
  }
  get loggedIn(){
    return this.login.loggedIn();
}
}

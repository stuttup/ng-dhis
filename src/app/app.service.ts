import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';

import { CookieService } from 'ngx-cookie-service';

export class Foo {
  constructor(
    public id: number,
    public name: string) { }
}

@Injectable()
export class AppService {
  constructor(
    private _router: Router, private _http: Http, private Cookie: CookieService,private oauthService: OAuthService){
      this.oauthService.tokenEndpoint = "https://gemed-pilot.sante-bj.org/uaa/oauth/token";
      //this.oauthService.userinfoEndpoint = "https://gemed-pilot.sante-bj.org/dhis-web-dashboard-integration/index.html";
      this.oauthService.clientId = "angular";
      this.oauthService.scope = "read write foo bar";
      this.oauthService.setStorage(sessionStorage);
      this.oauthService.dummyClientSecret = "3c0d8dd51-6d99-e733-760e-6992f6140ba";
      //this.oauthService.tryLogin({});

    }

  obtainAccessToken(loginData){
    let params = new URLSearchParams();
    params.append('username',loginData.username);
    params.append('password',loginData.password);
    params.append('grant_type','password');
    params.append('client_id','angular');

    let data = "username=" + loginData.username + "&password=" + loginData.password + "&grant_type=password&scope=read%20write&";
    let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded',"Accept": "application/json",
     'Authorization': 'Basic '+btoa("angular:3c0d8dd51-6d99-e733-760e-6992f6140ba")});
    let options = new RequestOptions({ headers: headers });

    this._http.post('https://gemed-pilot.sante-bj.org/uaa/oauth/token', params.toString(), { headers: headers })
      .map(res => res.json())
      .subscribe(
        data => this.saveToken(data),
        err => alert('Invalid Credentials'));
  }

  saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.Cookie.set("access_token", token.access_token, expireDate);
    this._router.navigate(['/']);
  }

  getResource(resourceUrl) : Observable<Foo>{
    var headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+this.Cookie.get('access_token')});
    var options = new RequestOptions({ headers: headers });
    return this._http.get(resourceUrl, options)
                   .map((res:Response) => res.json())
                   .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  checkCredentials(){
    if (!this.Cookie.check('access_token')){
        this._router.navigate(['/login']);
    }
  }

  logout() {
    this.Cookie.delete('access_token');
    this._router.navigate(['/login']);
  }
}

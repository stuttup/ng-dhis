import { Injectable } from '@angular/core';
import { Http , URLSearchParams , Response  } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class LoginService {
  private OauthLoginEndPointUrl = 'https://gemed-pilot.sante-bj.org/uaa/oauth/token';  // Oauth Login EndPointUrl to web API
  private clientId ='angular';
  private clientSecret ='3c0d8dd51-6d99-e733-760e-6992f6140ba';
  private isLoggedIn: boolean;

  constructor(public http: Http) {}

  login(username, password) : Observable<any> {

    let params: URLSearchParams = new URLSearchParams();
     params.set('username', username );
     params.set('password', password );
     params.set('client_id', this.clientId );
     params.set('client_secret', this.clientSecret );
     params.set('grant_type', 'password' );

    return this.http.get(this.OauthLoginEndPointUrl , {
                   search: params
                 }).map((res: Response) => {
                   let body = res.json();
                   if (body && body.token) {
                     localStorage.setItem('currentUser', JSON.stringify(body));
                     this.isLoggedIn = true;
                   }
                   return body;
                 })
                   .catch(this.handleError);
  }

  private handleData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  public logout() {
     localStorage.removeItem('token');
  }
  loggedIn() {
    return !(localStorage.getItem('token') == null);
  }
}

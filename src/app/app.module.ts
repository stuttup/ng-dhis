import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }   from './app.component';
import { LoginComponent }   from './login/login.component';
import { HomeComponent }   from './home/home.component';
import { DhisMenuComponent } from './dhis/ng2-dhis-menu';

import { CanActivateViaOAuthGuard } from './oAuth.canActivateGuard';

// Import configured routes
import { routing } from './app.routes';

@NgModule({
  providers:    [ CanActivateViaOAuthGuard ],
  imports:      [ BrowserModule , routing , FormsModule, HttpModule],
  declarations: [ AppComponent , HomeComponent, LoginComponent,
     DhisMenuComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

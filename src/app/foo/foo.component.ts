import { Component } from '@angular/core';

import {AppService, Foo } from '../app.service';

@Component({
  selector: 'foo-details',
  providers: [AppService],
  templateUrl: './foo.component.html',
})

export class FooComponent {
    public foo = new Foo(1,'sample foo');
    //private foosUrl = 'http://localhost:8082/spring-security-oauth-resource/foos/';

    //constructor(private _service:AppService) {}

    getFoo(){
        // this._service.getResource(this.foosUrl+this.foo.id)
        //   .subscribe(
        //     data => this.foo = data,
        //     error =>  this.foo.name = 'Error');
    }
}

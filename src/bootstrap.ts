import { bootstrap } from 'angular2/platform/browser';
import { bind , Component } from 'angular2/core';
import { FORM_PROVIDERS } from "angular2/common";
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import {Form1} from './form.ts';


@Component({
    selector: 'app-component',
    template: `
        <form-one></form-one>
    `,
    directives : [Form1]
})
export class AppComponent  {
    constructor() {
        console.log(this);
    }
}

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    FORM_PROVIDERS,
    HTTP_PROVIDERS,
    bind(LocationStrategy).toClass(HashLocationStrategy)
]).then(
    success => console.log('AppComponent bootstrapped!'),
    error => console.log(error)
);

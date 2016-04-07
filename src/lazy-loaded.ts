import {Component} from 'angular2/core';
import { Router } from 'angular2/router';


@Component({
    selector: 'lazy-loaded',
    templateUrl: '/src/lazy-loaded.html'
})

export class LazyLoaded {
    constructor(public _router:Router){
        console.log(this);
    }

    gohere() {
        // the url should match the "as" property of the @RouteConfig but lowercase.
        this._router.navigateByUrl('/contactus/blue-peter');
    }
}
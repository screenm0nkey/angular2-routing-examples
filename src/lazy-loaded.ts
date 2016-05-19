import {Component} from 'angular2/core';
import { Router } from 'angular2/router';

@Component({
    selector: 'lazy-loaded',
    template: `
        <p>I'm a lazy-loaded component</p>
        <p>Notice that once it's loaded I can access the router.</p>
        <button (click)="gohere()">router.navigateByUrl() to Contact Us</button>
        `
})
export class LazyLoaded {
    constructor(public _router:Router){
        console.log(this);
    }

    gohere() {
        this._router.navigateByUrl('/contactus/blue-peter');
    }
}
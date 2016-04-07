import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, Route, RouteParams, Location} from 'angular2/router';


// Nested Component
// *******************
@Component({
    selector: 'nested-component',
    template: `<h3>I'm a nested component</h3><p>I'm a route param <i>"{{routeParams}}"</i></p>`
})
class NestedComponent {
    routeParams : String;
    constructor(params: RouteParams) {
        this.routeParams = params.get('id');
    }
}



@Component({
    selector: 'deep-link-component',
    template: `
        <a [routerLink]="['/Deep/NestedOne', {'id': 'one'}]">Nested Component One</a>
        <a [routerLink]="['/Deep/NestedTwo', {'id': 'two'}]">Nested Component Two</a>
        <hr>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/nested-one/:id', component: NestedComponent, name: 'NestedOne' },
    { path: '/nested-two/:id', component: NestedComponent, name: 'NestedTwo' }
])
export class DeepLinkComponent {
    location:Location;

    constructor(location:Location) {
        this.location = location;
    }
    getLinkStyle(path) {
        return this.location.path().indexOf(path) > -1;
    }
}



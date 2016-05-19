import {bootstrap} from 'angular2/platform/browser';
import {bind, Component, ViewEncapsulation} from 'angular2/core';
import {FORM_PROVIDERS} from "angular2/common";
import {
    ROUTER_PROVIDERS,
    ROUTER_DIRECTIVES,
    AsyncRoute,
    Route,
    Router,
    RouterOutlet,
    RouteConfig,
    RouterLink,
    RouteParams,
    RouteData,
    Location,
    LocationStrategy,
    HashLocationStrategy
} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {DeepLinkComponent} from './deep-link-component'


class ComponentHelper {
    static LoadComponentAsync(name, path) {
        return System.import(path).then(c => c[name]);
    }
}

// Home Component
// *******************
@Component({
    selector: 'home',
    directives: [ROUTER_DIRECTIVES],
    template: `
        <h2>Routing Example</h2>
        <a href="#/sausage">This is a redirect to Nested page</a><br>
        <a [routerLink]="['/Deep', 'NestedTwo', {'id':'cats'}]">Link to Nested style 1</a><br>
        <a [routerLink]="['/Deep/NestedTwo', {'id':'dogs'}]">Link to Nested style 2</a>
    `,
    styles: ['.home {background: red}'],
})
export class HomeComponent {
}


// About Us Component
// *******************
@Component({
    selector: 'aboutus',
    template: `
        <h1>About us</h1>
        <a [routerLink]="['/ContactUs', {'id': 'Hello world'}]">Contact Us</a>
        <p>this is router data from the initial route (below) <strong>{{routerData}}</strong></p>
        <pre>{path: '/aboutus', component: AboutUsComponent,  name: 'AboutUs', data: {project: 'angular-2-samples'}}</pre>
        <button (click)="gohere()">router.navigateByUrl() to contact Us</button>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class AboutUsComponent {
    routerData:String = '';

    constructor(private _router:Router, routeData:RouteData) {
        console.log(this);
        this.routerData = routeData.get('project');
    }

    gohere() {
        this._router.navigateByUrl('/contactus/merry-xmas');
    }
}


// Contact Us Component
// *******************
@Component({
    selector: 'contactUs',
    template: '<h2>Contact Us</h2><i>RouteParams = "{{id}}"</i>'
})
export class ContactUsComponent {
    id:string = '';

    constructor(routeParams:RouteParams) {
        this.id = routeParams.get('id');
    }
}


// Root Component
// *******************
@Component({
    selector: 'app-component',
    directives: [RouterOutlet, RouterLink, DeepLinkComponent], // you could use ROUTER_DIRECTIVES
    template: `
        <a [routerLink]="['/Home']">Home</a>
        <a [routerLink]="['/AboutUs', {some : querystringval}]">AboutUs</a>
        <a [routerLink]="['/ContactUs', {'id': 'hello-world'}]">Contact Us</a>
        <a [routerLink]="['/Deep/NestedOne', {'id': 'shoes'}]" class="link">DeepLink</a>
        <a [routerLink]="['/Lazy']">Lazy</a>
        <hr>
        <router-outlet></router-outlet>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: ['.router-link-active { color : red;}'],

})
@RouteConfig([
    // the 'redirectTo' can also be written as ['/Deep', 'NestedOne', {'id':'sausage'}]
    {path: '/sausage', name: 'saus', redirectTo: ['/Deep/NestedOne', {'id': 'sausage'}]},
    {path: '/', component: HomeComponent, name: 'Home', useAsDefault: true},
    {path: '/aboutus', component: AboutUsComponent, name: 'AboutUs', data: {project: 'angular-2-samples'}},
    {path: '/contactus/:id', component: ContactUsComponent, name: 'ContactUs'},
    {path: '/deep/...', component: DeepLinkComponent, name: 'Deep'},
    new AsyncRoute({
        path: '/lazy',
        name: 'Lazy',
        loader: () => ComponentHelper.LoadComponentAsync('LazyLoaded', '/src/lazy-loaded.ts')
    })
])
class RootComponent {
    location:Location;
    querystringval:string = 'lowmanz';

    constructor(location:Location) {
        this.location = location;
    }
}


bootstrap(RootComponent, [
    ROUTER_PROVIDERS,
    FORM_PROVIDERS,
    HTTP_PROVIDERS,
    bind(LocationStrategy).toClass(HashLocationStrategy)
]).then(
    success => console.log('AppComponent bootstrapped!'),
    error => console.log(error)
);

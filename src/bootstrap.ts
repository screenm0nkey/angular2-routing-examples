import { bootstrap } from 'angular2/platform/browser';
import { bind , Component } from 'angular2/core';
import { FORM_PROVIDERS } from "angular2/common";
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, AsyncRoute, Route, Router, RouterOutlet, RouteConfig, RouterLink, RouteParams, RouteData, Location, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import {DeepLinkComponent} from './deep-link-component'


class ComponentHelper{
    static LoadComponentAsync(name,path){
        return System.import(path).then(c => c[name]);
    }
}


// Home Component
// *******************
@Component({
    selector: 'home',
    directives : [ROUTER_DIRECTIVES],
    template: `
        <h2>Welcome to <a href="http://www.codeandyou.com" target="_blank"> www.codeandyou.com </a></h2>
        <a href="#/sausage">This is a redirect to Nested page</a><br>
        <a [routerLink]="['/Deep', 'NestedTwo', {'id':'cats'}]">Link to Nested style 1</a><br>
        <a [routerLink]="['/Deep/NestedTwo', {'id':'dogs'}]">Link to Nested style 2</a>
    `,
    styles: ['.home {background: red}'],
})
export class HomeComponent {}



// About Us Component
// *******************
@Component({
    selector: 'aboutus',
    templateUrl: '/src/about-us.html',
    directives: [ROUTER_DIRECTIVES]
})
export class AboutUsComponent {
    routerData : String = '';

    constructor(private _router:Router, data: RouteData) {
        console.log(this);
        this.routerData = data.get('project');
    }

    gohere() {
        // the url should match the "as" property of the @RouteConfig but lowercase.
        this._router.navigateByUrl('/contactus/merry-xmas');
    }
}



// Contact Us Component
// *******************
@Component({
    selector: 'contactUs',
    template: '<h2>Contact Us "<i>{{id}}</i>"</h2>'
})
export class ContactUsComponent {
    id : Number = 0;
    constructor(params: RouteParams) {
        this.id = params.get('id');
    }
}



// Root Component
// *******************
@Component({
    selector: 'app-component',
    directives: [RouterOutlet, RouterLink, DeepLinkComponent], // you could use ROUTER_DIRECTIVES
    template: `
        <a [routerLink]="['/Home']" [class.active]="isActive('')">Home</a>
        <a [routerLink]="['/AboutUs']" [class.active]="isActive('/aboutus')">AboutUs</a>
        <a [routerLink]="['/ContactUs', {'id': 'hello-world'}]" [class.active]="isActive('/contactus/')">Contact Us</a>
        <a [routerLink]="['/Deep/NestedOne', {'id': 'shoes'}]" class="link">DeepLink</a>
        <a [routerLink]="['/Lazy']" [class.active]="isActive('/lazy')">Lazy</a>
        <hr>
        <router-outlet></router-outlet>
    `
})
@RouteConfig([
    // the 'redirectTo' can also be written as ['/Deep', 'NestedOne', {'id':'sausage'}]
    {path: '/sausage', name: 'saus', redirectTo: ['/Deep/NestedOne', {'id':'sausage'}]},
    {path: '/',              component: HomeComponent,      name: 'Home', useAsDefault: true},
    {path: '/aboutus',       component: AboutUsComponent,   name: 'AboutUs', data: {project: 'angular-2-samples'}},
    {path: '/contactus/:id', component: ContactUsComponent, name: 'ContactUs'},
    {path: '/deep/...',      component: DeepLinkComponent,  name: 'Deep'},
    new AsyncRoute({
        path: '/lazy',
        name: 'Lazy',
        loader: () => ComponentHelper.LoadComponentAsync('LazyLoaded','/src/lazy-loaded.ts')
    })
])
class RootComponent {
    location: Location;
    constructor(location: Location) {
        this.location = location;
    }

    isActive(path) {
        let locPath = this.location.path().trim();
        path = path.trim();

        if (locPath !== '' && path !== '') {
            return locPath.startsWith(path);
        }

        if (locPath === '' && path === '') {
            return true;
        }
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

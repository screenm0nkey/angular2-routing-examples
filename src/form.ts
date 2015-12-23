import {Component} from 'angular2/core';
import {ControlGroup, FORM_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'form-one',
    directives: [FORM_DIRECTIVES],
    templateUrl: '/src/form.html'
})

export class Form1 {
    constructor() {
        console.log(this);
    }

    onSubmit(ngForm:ControlGroup) {
        console.log('form object is an instance of Control Group', ngForm);
        console.log('you submitted value: ', ngForm.value);
    }
}
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'template-driven',
  templateUrl: 'template-driven.component.html',
  styles: [`
    input.ng-invalid.ng-touched {
      border: 1px solid red;
    }
    input.ng-valid.ng-touched {
      border: 1px solid green;
    }
  `]
})
export class TemplateDrivenComponent {
  private user = {
    username: 'john',
    email: 'john@test.com',
    password: '123',
    gender: 'male'
  };

  private genders = [
    'male',
    'female'
  ];

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}

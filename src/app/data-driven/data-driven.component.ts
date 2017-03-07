import { Observable } from 'rxjs/Rx';
import { FormArray } from '@angular/forms/src/model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'data-driven',
    templateUrl: 'data-driven.component.html'
})
export class DataDrivenComponent {
    myForm: FormGroup;
    emailValidationPattern = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    genders = [
        'male',
        'female'
    ];

    constructor(private formBuilder: FormBuilder) {
        // this.myForm = new FormGroup({
        //     'userData': new FormGroup({
        //         'username': new FormControl('John', Validators.required),
        //         'email': new FormControl('', [
        //             Validators.required, 
        //             Validators.pattern(this.emailValidationPattern)
        //         ]),
        //     }),
        //     'password': new FormControl('', Validators.required),
        //     'gender': new FormControl(),
        //     'hobbies': new FormArray([
        //         new FormControl('Music', Validators.required)
        //     ])
        // });

        this.myForm = formBuilder.group({
            'userData': formBuilder.group({
                'username': ['John', [Validators.required, this.exampleValidator]],
                'email': ['', [
                    Validators.required,
                    Validators.pattern(this.emailValidationPattern)
                ]],
            }),
            'password': ['', Validators.required],
            'gender': [],
            'hobbies': formBuilder.array([
                ['Music', Validators.required, this.asyncExampleValidator]
            ])
        });

        this.myForm.valueChanges.subscribe((data: any) => console.log(data));
        // this.myForm.statusChanges.subscribe((data: any) => console.log(data));
    }

    onAddHobby() {
        (<FormArray>this.myForm.get('hobbies')).push(new FormControl(
            '',
            Validators.required,
            this.asyncExampleValidator
        ));
    }

    exampleValidator(control: FormControl): {[s: string]: boolean} {
        if (control.value === 'Example') {
            return {example: true};
        }
        return null;
    }

    asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'Example') {
                resolve({valid: false}); // If returne anything but not null - validation fails
            } else {
                resolve(null); // If return null validation pass
            }
            }, 1500);
        });
        return promise;
    }

    onReset() {
        this.myForm.reset();
    }

    onSubmit() {
        console.log(this.myForm);
    }
}

/* Imports */

//Angular
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

/* Componant configuration */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})

/* Componant class definition and export */
export class RegisterComponent implements OnInit {

    @Output() formSubmit = new EventEmitter();
    // Declarations
    public formData: FormGroup;

    // Inject FormBuilder
    constructor(private FormBuilder: FormBuilder) {}

    //Return if both passwords are the same or not
    private verifMotDePasse = (group: FormGroup) => {

        let password = group.controls.password.value;
        let confirmPassword = group.controls.confirmPassword.value;

        //differents passwords
        if(password !== confirmPassword)
        {
        	return {differents: true}
        }
        //Same passwords
        else{
        	return null;
        }
    }

    // Method to reset form
    // Can't be validate with differents passwords
    private resetForm = () => {
        this.formData = this.FormBuilder.group({
            firstname: [ null, Validators.required ],
            lastname: [ null, Validators.required ],  
            email: [ null, [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ],
            password: [ null, [Validators.required, Validators.minLength(5)] ],
            confirmPassword: [ null, Validators.required ]
        },{validator: this.verifMotDePasse});
    };

    /* Start */
    ngOnInit() {
        this.resetForm();
    }
};
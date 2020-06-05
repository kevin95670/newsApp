/* Imports */

//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Inner
import { User } from '../../models/user.model';
import { CrudService } from "../../services/crud/crud.service";

/* Componant configuration */
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: []
})

/* Componant class definition and export */
export class RegisterPageComponent {

    constructor(private Router: Router, private CrudService: CrudService) { }

    ngOnInit(){}

    register = async (user: User) => {

        //Remove extra field
        delete user.confirmPassword;

        const userInfo = await this.CrudService.createItem('register', user);
        //User successfully registered
        if(Object.keys(userInfo.data).length > 0){
            this.Router.navigateByUrl('/');
        }
    };

}
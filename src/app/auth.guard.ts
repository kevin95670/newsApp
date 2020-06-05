// Imports
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Inner
import { CrudService } from "./services/crud/crud.service";

// Definition
@Injectable({ providedIn: 'root' })

// Export
export class AuthGuard implements CanActivate {

    constructor(private CrudService: CrudService, private Router: Router){}

    //Vérifie si un utilisateur est connecté ou non
    canActivate(): Promise<any> {
        return new Promise( (resolve, reject) => {
            this.CrudService.createItem('me', { token: localStorage.getItem('token') })
            .then(apiResponse =>  {  
                if (Object.keys(apiResponse.data).length > 0) {
                    return resolve(true)    
                } else {
                    this.Router.navigateByUrl('/')
                };
            })
            .catch( (apiResponse) => this.Router.navigateByUrl('/'))
        })
    }
}
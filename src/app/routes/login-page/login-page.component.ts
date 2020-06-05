/* Imports */

//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Inner
import { ObservablesService } from "../../services/observable/observable.service";
import { CrudService } from "../../services/crud/crud.service";

/* Componant configuration */
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})

/* Componant class definition and export */
export class LoginPageComponent implements OnInit {

  	constructor(private CrudService: CrudService, private Router: Router, private ObservablesService: ObservablesService) { }

  	/* Start */
	ngOnInit() {
		//this.getUserInfo('Sincere@april.biz');
	}

	public getUserInfo = async (user: Object) => {
	    
		const userInfo = await this.CrudService.createItem('login', user);
		/* localStorage.setItem('email', userInfo.data.user.email); */
		
		//User logged in
		if(Object.keys(userInfo.data).length > 0){
	        //Set his token in localStorage
	        localStorage.setItem('token', userInfo.data.token);

			const userData = await this.CrudService.createItem('me', { token: localStorage.getItem('token') });

			if(Object.keys(userData.data).length > 0){
				// Set user bookmarks observable value
				this.ObservablesService.setObservableData('bookmarks', userData.data.bookmark);

				//Change route endpoint
			  	this.Router.navigateByUrl('/');
			}
	    }
	};
}

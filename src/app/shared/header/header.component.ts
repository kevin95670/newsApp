/* Imports */

//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Inner
import { ObservablesService } from "../../services/observable/observable.service";
import { CrudService } from "../../services/crud/crud.service";

/* Componant configuration */
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: []
})

/* Componant class definition and export */
export class HeaderComponent implements OnInit {

	/* 
	Declaration
	*/
    // Properties
    public userData: any;

    constructor(private ObservablesService: ObservablesService, private Router : Router, private CrudService: CrudService){
        
        // Get user data observer
		this.ObservablesService.getUserInfo().subscribe( userDataObserver => {
		    if(userDataObserver === null) { 
		    	this.userData = null 
		    }
		    else { 
		        if(Object.keys(userDataObserver).length > 0) {
		            // Set local storage
		            localStorage.setItem('token', userDataObserver.token );

		            // Update userData value
		            this.userData = userDataObserver;
		        }
		        else {
		            this.userData = null
		        }
		    }
		})
    }

	/* Start */
    ngOnInit(){};

    // Logout a user
    public logout = () => {

	    // Delete token in localStorage
	    localStorage.removeItem('token');

	    // Set user info observable value
	    this.ObservablesService.setObservableData('user', null);
	    this.ObservablesService.setObservableData('bookmarks', null)
	    this.Router.navigateByUrl('/');
	}
};

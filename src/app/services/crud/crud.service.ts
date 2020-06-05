/* Imports */

// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
// Inner
import { ObservablesService } from "../observable/observable.service";

/* 
Definition 
*/
@Injectable()
export class CrudService {

	protected apiUrl = 'https://newsapp.dwsapp.io/api/';
	protected apiKey = 'aee599e104ab492bb481aa32a5a09fab';

  	// Inject module(s) in the service
  	constructor( private HttpClient: HttpClient, private ObservablesService: ObservablesService ){};

  	//CRUD METHOD : read one item
	public readOneItem(endpoint: String, _id: String): Promise<any>{
    	return this.HttpClient.get(`${this.apiUrl}${endpoint}?${_id}`).toPromise()
    	.then( data => this.getData(endpoint, data))
    	.catch(this.handleError);
  	};

	// CRUD method: read all items
 	public readAllItems(endpoint: String): Promise<any>{
    	return this.HttpClient.get(`${this.apiUrl}${endpoint}`)
        .toPromise().then( data => this.getData(endpoint,data) ).catch(this.handleError);
  	};

	// CRUD method: create item
    public createItem(endpoint: String,data: any): Promise<any>{
	  	// Set header
	  	let myHeader = new HttpHeaders();
	  	myHeader.append('Content-Type', 'application/json');

	  	// Launch request
	  	return this.HttpClient.post(`${this.apiUrl}${endpoint}`, data, { headers: myHeader })
	  	.toPromise().then(data => this.getData(endpoint,data)).catch(this.handleError);
    }

	// CRUD method: edit an item
 	public updateItem(endpoint: String, _id: String, data: any): Promise<any>{
		// Set header
		let myHeader = new HttpHeaders();
		myHeader.append('Content-Type', 'application/json');

		// Launch request
		return this.HttpClient.put(`${this.apiUrl}${endpoint}/${_id}`, data, { headers: myHeader })
		.toPromise().then(data => this.getData(endpoint,data)).catch(this.handleError);
  	};

    // CRUD method: delete an item
  	public deleteItem(endpoint: String,_id: String, data: any): Promise<any>{
  		//Set httpOptions
	    const httpOptions = {
    		headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: data
		};

	    // Launch request
	    return this.HttpClient.delete(`${this.apiUrl}${endpoint}/${_id}`, httpOptions)
	    .toPromise().then( data => this.getData(endpoint,data))
	    .catch(this.handleError);
  	};

	/* 
	Methods to get API responses
	*/
	// Get the API response
	private getData = (endpoint, apiResponse: any) => {
	    // Switch endpoint to set observable value
	    switch(endpoint){
	    case 'login':
	        // Set user info observable value
	        this.ObservablesService.setObservableData('user',apiResponse.data)

	        // Return data
	        return apiResponse || {};
	        break;
        case 'register':
	        // Set user info observable value
	        this.ObservablesService.setObservableData('user',apiResponse.data)

	        // Return data
	        return apiResponse || {};
	        break;
	    default:
	        // Retun data anytime
	        return apiResponse || {};
	        break;
	    };
	};
	// Get the API error
	private handleError = (apiError: any) => Promise.reject(apiError.error);
	//
};
//
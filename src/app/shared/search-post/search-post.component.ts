/* Imports */

//Angular
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

//Inner
import { News } from '../../models/news.model';
import { ObservablesService } from '../../services/observable/observable.service';

/* Componant configuration */
@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styles: []
})

/* Componant class definition */
export class SearchPostComponent implements OnInit {
  
    @Input() sources: Object[];
    @Input() bookmarks: News[];

    @Output() formSubmit = new EventEmitter();
    @Output() addFavoriteSource = new EventEmitter();
    @Output() removeFavoriteSource = new EventEmitter();

    public formData: FormGroup;
    public user: Boolean;
    public found: Boolean;

    constructor(private ObservablesService: ObservablesService, private FormBuilder: FormBuilder) {
    }

    //Return if a user is logged in or not
    userLogged(){
        this.ObservablesService.getUserInfo().subscribe(user => {
            if(user !== null){
                this.user = true;
            }
            else{
                this.user = false;
            }
        });
    }

    //Return if a source is already in favorites or not
    sourceAlreadyInFavorites = (sourceId) => {
        //If user is logged in and he has favorites sources
        if(this.user === true && this.bookmarks !== null){
            //If the source is present in the table of favorites
            if(this.bookmarks.some(bookmarks => bookmarks.id === sourceId)){
                this.found = true;
            }
            else{
                this.found = false;
            }
        }
        //else no favorites
        else{
          this.found = false;
        }
        return this.found;
    }

    /* Put the last source if it exists. Null instead */
    private resetForm = () => {
        this.formData = this.FormBuilder.group({
            source: [ localStorage.getItem('last_research') === "null" ? null : localStorage.getItem('last_research'), Validators.required ],
            keywords: [ null ],
        });
    };

    /* Start */
    ngOnInit() {
        this.resetForm();
        this.userLogged();
    }

    /* Remove last research and reset form */
    resetNewsForm(){
        localStorage.removeItem('last_research');
        this.resetForm();
    }

}
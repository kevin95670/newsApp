/* Imports */

//Angular
import { Component } from '@angular/core';

//Inner
import { CrudService } from '../../services/crud/crud.service';
import { ObservablesService } from '../../services/observable/observable.service';

/* Componant configuration */
@Component({
    selector: 'app-favorites-page',
    templateUrl: './favorites-page.component.html',
    styles: []
})

/* Componant class definition and export */
export class FavoritesPageComponent{

    bookmarks: Object[];
    articles: Object[];

    protected apiKey = 'aee599e104ab492bb481aa32a5a09fab';

    constructor(private ObservablesService: ObservablesService, private CrudService: CrudService) {}

    /* Retrieve all bookmarks */
    public getBookmarks(){
        this.ObservablesService.getBookmarks().subscribe(bookmarks => {
            this.bookmarks = bookmarks;
        })
    }

    ngOnInit(){
        this.getBookmarks();
    }

    public getArticles = async(source: String) => {
        const articles = await this.CrudService.createItem(`news/${source}/null`, { news_api_token: this.apiKey });
        //If there is article for this research
        if(articles.data.articles.length >= 0){
            //Fill articles array
            this.articles = articles.data.articles;
        }
    }
}
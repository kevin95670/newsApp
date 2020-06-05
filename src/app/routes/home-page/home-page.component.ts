/* Imports */

//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Inner
import { News } from '../../models/news.model';
import { CrudService } from "../../services/crud/crud.service";
import { ObservablesService } from "../../services/observable/observable.service";

/* Componant configuration */
@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styles: []
})

/* Componant class definition and export */
export class HomePageComponent implements OnInit {

	sources: News[] = [];
	articles: Object[] = null;
    bookmarks = [];
	apiKey = 'aee599e104ab492bb481aa32a5a09fab';

    constructor(private ObservablesService: ObservablesService,private CrudService: CrudService, private Router: Router) {}

    /* Retrieve all sources */
    public getSources = async() => {

        const sources = await this.CrudService.createItem('news/sources/', { news_api_token: this.apiKey });
        
        //If sources are retrieve
        if(sources.data.sources.length > 0){
            this.sources = sources.data.sources;
        }
    }

    /* If a research has already occurred */
    public getArticlesLastResearch(){
        if (localStorage.getItem('last_research') !== "null") {
            //Get all articles with the last_research source
            this.getArticles({ source: localStorage.getItem('last_research'), keywords: null }) 
        }
    }

    /* Retrieve all bookmarks */
    public getBookmarks(){
        this.ObservablesService.getBookmarks().subscribe(bookmarks => {
            this.bookmarks = bookmarks;
        })
    }

    /* Start */
	ngOnInit(){
		//this.getUserInfo('Sincere@april.biz');
        this.getSources();
        this.getArticlesLastResearch();
        this.getBookmarks();
	}

    addSourceToFavorites = async(sourceId: String) => {
        if (sourceId === null) return;

        const token = localStorage.getItem('token');

        //Get in the sources, the source with id sourceId
        const source = this.sources.find(source => source.id.toString() === sourceId);

        const bookmarks = await this.CrudService.createItem('bookmark', { ...source, token });

        if(Object.keys(bookmarks.data.data).length > 0){
            //Add the new source in the favorites
            this.bookmarks.push(bookmarks.data.data);
            // Set bookmarks observable value
            this.ObservablesService.setObservableData('bookmarks', this.bookmarks);
        }
    }

    removeSourceToFavorites = async(sourceId: String) => {
        if (sourceId === null) return;

        const token = localStorage.getItem('token');

        //Get in the favorites, the source with id sourceId
        const bookmark = this.bookmarks.find(bookmark => bookmark.id.toString() === sourceId);

        const bookmarks = await this.CrudService.deleteItem('bookmark', bookmark._id, { token });

        //If no error
        if(bookmarks.err === null){
            //delete this source from the favorites
            this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id.toString() !== sourceId);
            // Set bookmarks observable value
            this.ObservablesService.setObservableData('bookmarks', this.bookmarks);
        }
    }

    public getArticles = async({ source, keywords }) => {

        //Set the last source researched
        localStorage.setItem('last_research', source);

        if(source !== null){

            const articles = await this.CrudService.createItem(`news/${source}/${keywords}`, { news_api_token: this.apiKey });
            //If there is article for this research
            if(articles.data.articles.length >= 0){
                //Fill articles array
                this.articles = articles.data.articles;
            }
        }
        //No source
        else{
            this.articles = [];
        }
    };

}

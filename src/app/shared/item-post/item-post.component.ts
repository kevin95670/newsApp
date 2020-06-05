/* Imports */

// Angular
import { Component, OnInit, Input } from '@angular/core';

/* Componant configuration */
@Component({
    selector: 'app-item-post',
    templateUrl: './item-post.component.html'
})

/* Componant class definition */
export class ItemPostComponent implements OnInit {

    // Input  data from parent component
    @Input() article: any;

    constructor(){}
    ngOnInit(){}
};
/* Imports */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/* Definition and export */
@Injectable({
    providedIn: 'root'
})

export class ObservablesService {

    protected userInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    protected bookmarks: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor() {}

	public getUserInfo(): Observable<any> { return this.userInfo };
    public getBookmarks(): Observable<any> { return this.bookmarks };

	public setObservableData = (type: string, data: any) => {
        switch(type){ 
            case 'user':
                this.userInfo.next(data);
            break;
            case 'bookmarks':
                this.bookmarks.next(data);
            break;
            default:
            break;
        }
    };

}
/* Imports */
// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Router
import { RouterModule } from "@angular/router"
import { AppRouterModule } from "./app.router";

// Inner
import { AppComponent } from './app.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { FavoritesPageComponent } from './routes/favorites-page/favorites-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { CrudService } from "./services/crud/crud.service";
import { ObservablesService } from "./services/observable/observable.service";
import { FormLoginComponent } from './shared/form-login/form-login.component';
import { ItemPostComponent } from './shared/item-post/item-post.component';
import { RegisterComponent } from './shared/register/register.component';
import { RegisterPageComponent } from './routes/register-page/register-page.component';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { SearchPostComponent } from './shared/search-post/search-post.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        FavoritesPageComponent,
        HeaderComponent,
        FormLoginComponent,
        ItemPostComponent,
        RegisterComponent,
        RegisterPageComponent,
        LoginPageComponent,
        SearchPostComponent
    ],
        imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule, 
        ReactiveFormsModule,
        RouterModule.forRoot( AppRouterModule, { onSameUrlNavigation: 'reload' } ),
    ],
        providers: [
        CrudService,
        ObservablesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

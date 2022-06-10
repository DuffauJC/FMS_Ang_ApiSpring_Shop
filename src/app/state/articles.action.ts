import { Action } from '@ngrx/store';
import { Article } from '../model/article.model';



// une seule action pour tester
export enum ArticlesActionsTypes {
    //Action : Get all Articles
    //s'agissant de l'action consistant à afficher tous les formation, nous avons 3 états possible
    GET_ALL_ARTICLES = '[Articles] Get All ARTICLES',
    GET_ALL_ARTICLES_SUCCESS = '[Articles] Get All ARTICLES Success',
    GET_ALL_ARTICLES_ERROR = '[Articles] Get All ARTICLES Error',
  
}

//Get all Articles
export class GetAllArticlesAction implements Action {
    type: ArticlesActionsTypes = ArticlesActionsTypes.GET_ALL_ARTICLES;
    constructor(public payload: any) { }
}
export class GetAllArticlesActionSuccess implements Action {
    type: ArticlesActionsTypes = ArticlesActionsTypes.GET_ALL_ARTICLES_SUCCESS;
    constructor(public payload: Article[]) { }
}
export class GetAllArticlesActionError implements Action {
    type: ArticlesActionsTypes = ArticlesActionsTypes.GET_ALL_ARTICLES_ERROR;
    constructor(public payload: string) {
        //message d'erreur
    }
}

export type ArticlesActions=GetAllArticlesAction|GetAllArticlesActionError|GetAllArticlesActionSuccess



import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable,map, mergeMap, catchError, EMPTY } from 'rxjs';
import { ApiService } from '../services/api.service'

import { ArticlesActions, ArticlesActionsTypes,GetAllArticlesActionSuccess } from './articles.action';
@Injectable()
    
export class ArticlesEffects {

    constructor(
        private effectActions$: Actions,
        private apiService: ApiService
    ) { }

    getAllArticles$ = createEffect(
        () => 
       this.effectActions$.pipe(
            ofType(ArticlesActionsTypes.GET_ALL_ARTICLES),
            mergeMap((action: ArticlesActions) => this.apiService.getArticles()
                .pipe(
                    map((Articles) => new GetAllArticlesActionSuccess(Articles)),
                    catchError(() =>EMPTY))
                )
            )
        )
                

   
}
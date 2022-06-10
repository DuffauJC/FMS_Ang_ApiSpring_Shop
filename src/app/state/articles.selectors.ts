import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Article } from '../model/article.model';
import { AppState } from './app.state';



export const selectAllArticles = createSelector(
    createFeatureSelector('articles'),
    (state:AppState) => {
        let articles: Article[] = new Array<Article>();

        state.articles.forEach((a) => {
            articles.push(a);
        });
        return articles;
    }
);
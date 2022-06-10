
import { Action } from '@ngrx/store';
import { AppState, initState } from './app.state';
import { ArticlesActions, ArticlesActionsTypes } from './articles.action';

export function ArticleReducer(
    state: AppState = initState,
    action: Action
): AppState {
    switch (
    action.type //pour chaque action, on retourne un clone du state (immutable)
    ) {
        case ArticlesActionsTypes.GET_ALL_ARTICLES:
            return { ...state, }; //renvoi clone du state + le nouveau dataState
        case ArticlesActionsTypes.GET_ALL_ARTICLES_SUCCESS:
            // Action a été reçu par l'effect qui a fait une demande en base, reçoit les datas et génère l'action pour indiquer que tout est ok
            return {
                ...state,
                articles: (<ArticlesActions>action).payload,
            };
        // renvoi clone + nouveau dataState + liste des avions en base contenu dans le payload
        case ArticlesActionsTypes.GET_ALL_ARTICLES_ERROR:
            return {
                ...state,
                errorMessage: (<ArticlesActions>action).payload,
            };

        default:
            return { ...state };
    }
}
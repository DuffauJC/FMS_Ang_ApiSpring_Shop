import { Article } from "../model/article.model";

export interface AppState {
   articles: Article[];  
    errorMessage: string;
}

export const initState: AppState= {
    articles: [],
    errorMessage: "",
}
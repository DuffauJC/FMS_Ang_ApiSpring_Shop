import { Training } from "../model/training.model";

export interface AppState {
    trainings: Training[];  
    errorMessage: string;
}

export const initState: AppState= {
    trainings: [],
    errorMessage: "",
}
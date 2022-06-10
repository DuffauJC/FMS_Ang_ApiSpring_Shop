import { Action } from '@ngrx/store';
import { Training } from '../model/training.model';



// une seule action pour tester
export enum TrainingsActionsTypes {
    //Action : Get all TRAININGS
    //s'agissant de l'action consistant à afficher tous les formation, nous avons 3 états possible
    GET_ALL_TRAININGS = '[TRAININGS] Get All TRAININGS',
    GET_ALL_TRAININGS_SUCCESS = '[TRAININGS] Get All TRAININGS Success',
    GET_ALL_TRAININGS_ERROR = '[TRAININGS] Get All TRAININGS Error',
  
}

//Get all TRAININGS
export class GetAllTrainingsAction implements Action {
    type: TrainingsActionsTypes = TrainingsActionsTypes.GET_ALL_TRAININGS;
    constructor(public payload: any) { }
}
export class GetAllTrainingsActionSuccess implements Action {
    type: TrainingsActionsTypes = TrainingsActionsTypes.GET_ALL_TRAININGS_SUCCESS;
    constructor(public payload: Training[]) { }
}
export class GetAllTrainingsActionError implements Action {
    type: TrainingsActionsTypes = TrainingsActionsTypes.GET_ALL_TRAININGS_ERROR;
    constructor(public payload: string) {
        //message d'erreur
    }
}

export type TrainingsActions=GetAllTrainingsAction|GetAllTrainingsActionError|GetAllTrainingsActionSuccess



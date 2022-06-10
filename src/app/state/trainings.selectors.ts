import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Training } from '../model/training.model';
import { AppState } from './app.state';



export const selectAllTrainings = createSelector(
    createFeatureSelector('trainings'),
    (state:AppState) => {
        let trainings: Training[] = new Array<Training>();

        state.trainings.forEach((a) => {
            trainings.push(a);
        });
        return trainings;
    }
);
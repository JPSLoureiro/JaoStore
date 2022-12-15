import { Appstate } from './appstate';
import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';


export const setAPIStatus = createAction(
  "[API] success or failure status",
  props<{apiStatus:Appstate}>()
)

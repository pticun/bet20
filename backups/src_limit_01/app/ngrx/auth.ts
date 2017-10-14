import { Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const RESET = 'RESET';

export const initialData : any = { 
	sportListe : 0,
	sportsName : 0
 };
export const initialState = { 
	language : 2,
	isLogin : 0
 };

export const authState = 0;

export function authReducer(state = authState, action: Action) {
	switch (action.type) {
		case LOGIN:
		state = 1;
		return state;
		case LOGOUT:
		state = 0;
		return state;
		case RESET:
			return state;
		default:
			return state;
	}
}

export function getInitialState() {
  return {...initialState, ...initialData};
}

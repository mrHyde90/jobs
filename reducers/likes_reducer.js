import _ from 'lodash';
import {
	LIKE_JOB,
	CLEAR_LIKED_JOBS
} from '../actions/type';

/*
	-el lodash es para que se haga unico
	-revisa el payload, como es un objeto revisa su jobkey,
	recordar que jobkey el el id o lo que identifica a cada trabajo
	sí es unico entonces lo manda y manda al arreglo state
	-recordar ...state es una copiaa del arreglo
	-recordar que lo que se manda se adhiere al state, si es un arreglo
*/
export default function(state=[], action){
	switch(action.type){
		case CLEAR_LIKED_JOBS:
			return [];
		case LIKE_JOB:
			return _.uniqBy([
				action.payload, ...state
				], 'jobkey');
		default:
			return state;
	}
}
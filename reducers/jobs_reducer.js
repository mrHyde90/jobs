import {
	FETCH_JOBS
} from '../actions/type';

//recuerda que no puede ser undefined
const INITIAL_STATE = {
	results: []
};
//ese INITIAL_STATE va a ser llamado la primera vez 
export default function(state=INITIAL_STATE, action){
	switch(action.type){
		case FETCH_JOBS:
			return action.payload;
		default:
			return state;
	}
}
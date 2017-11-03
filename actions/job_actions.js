import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
	FETCH_JOBS,
	LIKE_JOB,
	CLEAR_LIKED_JOBS
} from './type';

/*
	publisher: es el codigo de tu api
	format: como quieres que te devuelva el resultado
	v: la version de la api
	latlong: 1 para que te devuelva la longitud y latitude
	radius: es en millas y es el rango de busqueda
	q: es el query, lo que busca el usuario, el trabjao
*/
const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
	publisher: '4201738803816157',
	format: 'json',
	v: '2',
	latlong: 1,
	radius: 10,
	q: 'javascript'
};

const buildJobsUrl = (zip) => {
	//crea la cadena con el objeto dado
	const query = qs.stringify({...JOB_QUERY_PARAMS, l: zip});
	return `${JOB_ROOT_URL}${query}`;
};
//recuerda que las navegaciones no pueden ser llamadas en action creators, debido a que
//la propiedad es heredada solo en donde son usadas, asi que se tiene que pasar
//desde donde es usada
export const fetchJobs = (region, callback) => async (dispatch) => {
	try {
		//crea el zipCode con los datos de longitu y latitud
		let zip = await reverseGeocode(region);
		//crea la url con el zipcode y los parametros del query
		const url = buildJobsUrl(zip);
		//extrae solo los datos al momento de llamar a la api con los datos
		let {data} = await axios.get(url);
		//lo manda a las actions
		dispatch({type: FETCH_JOBS, payload: data});
		console.log(data);
		callback();
	} catch(e){
		console.error(e);
	}
};

export const likeJob = (job) => {
	return {
		payload: job,
		type: LIKE_JOB
	};
};

export const clearLikedJobs = () => {
	return {type: CLEAR_LIKED_JOBS};
};
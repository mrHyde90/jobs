import { AsyncStorage } from 'react-native';
import {Facebook} from 'expo';

import {
	FACEBOOK_LOGIN_SUCCESS,
	FACEBOOK_LOGIN_FAIL
} from './type';

//How to use AsyncStorage:
//persistence of data
//you see is asyncrono, toma tiempo, promise
//AsyncStorage.setItem("fb_token", token);
//AsyncStorage.getItem("fb_token");

//cuando e vato reinicia el redux flat out dumped

/*
	esa es una version mejorada gracias a ecmaScript 2017 y babel
	checa que el async await sirve para manejar condigo asyncronico, en lugar de usar promise
	el await hace que espere
	codigo normal seria () => { return async (dispatch) => {}}
	como solo se va a pasar una variable se omiten los parentesis () => { return async dispatch => {}}
	como solo se va a regresar una cosa, se omite el return y llaves () =>  async (dispatch) => {}
	el dispatch es para manejar asincronic code (redux-thunk)
	recuerda que el actionCreator regresa todo instantaneamente, pero no puede porque las llamadas necesitan un tiempo
	es por ello que usamos codigo asyncronico
*/

export const facebookLogin = () => async dispatch => {
	let token  = await AsyncStorage.getItem("fb_token");

	if(token){
		//Dispatch an action saying FB login is done
		dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token});
	} else {
		//Start up FB Login process
		doFacebookLogin(dispatch);
	}
};
//como no es un actionCreator, solo es una simple funcion solamente ponemos el async así
//lo ponemos porque el codigo regresa promise, ya que es codigo asincronico
//->
//los argumentos son:
//el id de nuestra aplicacion
//los permisos, vamos a acceder a los datos publicos del usuario
//->
//nota que usamos destructuring para solo obtener los datos que necesitamos
//type: si tubimos exito o no con la conexion, puede que el usuario se haya arrempetido
//->
//como es una funcion, no tiene acceso al dispatch, es por ello que se lo tienes que mandar
const doFacebookLogin = async dispatch => {
	let {type, token} = await Facebook.logInWithReadPermissionsAsync('1542461305850892', {
		permissions: ["public_profile"]
	});
	if(type === 'cancel'){
		return dispatch({type: FACEBOOK_LOGIN_FAIL});
	}
	await AsyncStorage.setItem("fb_token", token);
	dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token});
};
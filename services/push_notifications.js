import {Permissions, Notifications} from 'expo';
import {AsyncStorage} from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = "http://rallycoding.herokuapp.com/api/tokens"
/*
	Permissions: libreria que contienen una serie de permisos preconstruidos 
	notifications: se usa para generar el token
*/
export default async () => {
	//checamos primero si ya existia un token
	let previousToken = await AsyncStorage.getItem('pushtoken');
	console.log(previousToken);
	//si existia entonces solo regresamos
	if(previousToken){
		return;
	} else {
		//si no existia le preguntamos al usuario si nos da permiso
		//El remote ya esta preconstruidos, es para notificaciones remotas
		//mira que se usa el asyn porque son llamadas asincronas
		let {status} = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
		//si no nos da permiso entonces solo regresamos
		if(status !== 'granted'){
			return;
		}
		//si nos da permiso entonces generamos el token
		//igual son llamadas asincronas
		let token = await Notifications.getExpoPushTokenAsync();
		await axios.post(PUSH_ENDPOINT, {token: {token} });
		AsyncStorage.setItem('pushtoken', token);
	}
};
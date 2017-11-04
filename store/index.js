import {createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';
//nota que no tienes que especificar el index.js, index js shortcut
import reducers from '../reducers';

//los reducers
//el estado que auisieramos ponerlo al inicio
//el compose aún
//applyMidleware para que funcione el thunk, codigo asincrono

//autoRehydrate jala los datos de la primera llamada creada por redux y los rellena
const store = createStore(
	reducers,
	{},
	compose(
		applyMiddleware(thunk),
		autoRehydrate()
	)
);
//cada vez que el estado cambia, jala los datos y los pone en el AsyncStorage
//quiero que cheques cuando cambie likedJobs reducer
persistStore(store, {storage: AsyncStorage, whitelist: ['likedJobs']});

export default store;
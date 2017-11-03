import {createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//nota que no tienes que especificar el index.js, index js shortcut
import reducers from '../reducers';

//los reducers
//el estado que auisieramos ponerlo al inicio
//el compose aún
//applyMidleware para que funcione el thunk, codigo asincrono

const store = createStore(
	reducers,
	{},
	compose(
		applyMiddleware(thunk)
	)
);

export default store;
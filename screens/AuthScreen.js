import React, {Component} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';


//cada vez que cambio el estado en redux, todos los compoenentes mapeados a redux
//con el setStateToProps, se renderizan de nuevo
class AuthScreen extends Component{
	componentDidMount(){
		this.props.facebookLogin();
		console.log("Se renderizo el AuthScreen");
		this.onAuthComplete(this.props);
	}

	componentWillReceiveProps(nextProps){
		this.onAuthComplete(nextProps);
	}

	onAuthComplete(props){
		if(props.token){
			console.log("El token si se encuetra aqui");
			this.props.navigation.navigate('map');
		}
	}

	render(){
		return(
			<View />
		);
	}
}

function mapStateToProps({auth}){
	console.log("El token es: " + auth.token);
	return {token: auth.token};
}

export default connect(mapStateToProps, actions)(AuthScreen);
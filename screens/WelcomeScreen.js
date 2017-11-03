import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import {AppLoading} from 'expo';
import Slides from '../components/Slides';

/*
	Los datos estaticos o lo que hace a la app especial van aqui
	no van dentrro del Slide component, porque queremos que sea reusable
	imagina si lo ponemos en el slide entonces vamos a estar cambiando codigo
	cada vez que reciclemos el componente
	es por eso que cualquier data va aqui
*/

const SLIDE_DATA = [
	{text: "Welcome to job App", color: "#03A9F4"},
	{text: "Use this to get a job", color: '#009688'},
	{text: "Set your location, then swipe away", color: "#03A9F4"}
];

//cualquier compoonente renderizado con react-navigation, tiene la propiedad navigation
class WelcomeScreen extends Component{
	state = {token: null};

	async componentWillMount(){
		let token = await AsyncStorage.getItem('fb_token');

		if(token){
			this.setState({token});
			this.props.navigation.navigate('map');
		} else{
			this.setState({token: false});
		}
	} 

	onSlidesComplete = () => {
		this.props.navigation.navigate('auth');
	}
	render(){
		if(_.isNull(this.state.token)){
			return <AppLoading />;
		} 

		return(
			<Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
		);
	}
}

export default WelcomeScreen;
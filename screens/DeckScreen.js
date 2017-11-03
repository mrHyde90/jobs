import React, {Component} from 'react';
import {View, Text, Platform} from 'react-native';
import { connect } from 'react-redux';
import {MapView} from 'expo';
import {Card, Button, Icon} from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

/*
	scrollEnabled: es para que cuando es usuario toque el mapa, nose mueva como mapa sino estatico y pueda
	moverlo

	cacheEnabled: para que en lugar de mapa sea como una imagen, debido al performance
	En android se comporta con varios bugs, es por ello que vemos si esta en android
*/
class DeckScreen extends Component{
	static navigationOptions = {
		tabBarLabel: 'Jobs',
		tabBarIcon: ({tintColor}) => (
			<Icon name="description" size={30} color={tintColor} />
		)
	};
	///
	renderCard(job){
		const initialRegion = {
			longitude: job.longitude,
			latitude: job.latitude,
			latitudeDelta: 0.045,
			longitudeDelta: 0.02
		};
		return(
			<Card title={job.jobtitle}>
				<View style={{height: 300}}>
					<MapView  
						scrollEnabled={false}
						style={{flex: 1}}
						cacheEnabled={Platform.OS === 'android' ? true : false}
						initialRegion={initialRegion}
					>

					</MapView>
				</View>
				<View style={styles.detailWrapper}>
					<Text>{job.company}</Text>
					<Text>{job.formattedRelativeTime}</Text>
				</View>
				<Text>
					{job.snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}
				</Text>
			</Card>
		);
	}
///el render no morecards esta siendo ejecutado por swipe, así que ese this.props son realmente de swipe
//no de deckScreen, necesitas bindear la funcion a deckScreen, renderNoMoreCards() a render = () => {}
	renderNoMoreCards = () => {
		return (
			<Card title="No more jobs">
				<Button 
					title="Back To Map"
					large
					icon={{name: 'my-location'}}
					backgroundColor='#03A9F4'
					onPress={() => this.props.navigation.navigate('map')}
				/>
			</Card>
		);
	}
///
	render(){
		return(
			<View style={{marginTop: 10}}>
				<Swipe 
					data={this.props.jobs}
					renderCard={this.renderCard}
					renderNoMoreCards={this.renderNoMoreCards}
					onSwipeRight={job => this.props.likeJob(job)}
					keyProp="jobkey"
				/>
			</View>
		);
	}
}
///
const styles = {
	detailWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 10
	}
};

//state.jobs
//solamente se lleva el jobs del state
//destructuring
function mapStateToProps({jobs}){
	return {jobs: jobs.results};
}

export default connect(mapStateToProps, actions)(DeckScreen);
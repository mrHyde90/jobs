import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {MapView} from 'expo';
import {connect} from 'react-redux';
import {Button, Icon} from 'react-native-elements';

import * as actions from '../actions';

class MapScreen extends Component{
	static navigationOptions = {
		tabBarLabel: 'Map',
		tabBarIcon: ({tintColor}) => (
			<Icon name="my-location" size={30} color={tintColor} />
		)
	};
	
///
	state = {
		region: {
			longitude: -122,
			latitude: 37,
			longitudeDelta: 0.04,
			latitudeDelta: 0.09
		}
	}

	onRegionChangeComplete = (region) => {
		this.setState({region});
	}
//dentro de los actioncreators no se puede hacer llamado de la navegacion
//porque esas llamadas son heredadas por quienes estan dentro del stack de la navegacion
	onButtonPress = () => {
		this.props.fetchJobs(this.state.region, () => {
			this.props.navigation.navigate('deck');
		});
	}

	render(){
		return(
			<View style={{flex: 1}} >
				<MapView
				 region={this.state.region}
				 style={{flex: 1}} 
				 onRegionChangeComplete={this.onRegionChangeComplete}
				/>
				<View style={styles.buttonContainer}>
					<Button 
						large
						title="Search This Area"
						backgroundColor="#009688"
						icon={{ name: 'search'}}
						onPress={this.onButtonPress}
					/>
				</View>
			</View>
		);
	}
}

const styles = {
	buttonContainer: {
		position: 'absolute',
		bottom: 20,
		left: 0,
		right: 0
	}
}

export default connect(null, actions)(MapScreen);
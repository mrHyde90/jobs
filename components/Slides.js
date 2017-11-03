import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get("window").width;

class Slides extends Component{

	renderLastSlide(index){
		if(index === this.props.data.length - 1){
			return(
				<Button 
					title="Onwards!"
					raised
					buttonStyle={styles.buttonStyle}
					onPress={this.props.onComplete}
				/>
			);
		}
	}
///
	renderSlides = () => {
		console.log("You are inside the renderSlides");
		return this.props.data.map((slide, index) => {
			console.log("your slice is: " + slide.text);
				return(
					<View 
						key={slide.text} 
						style={[styles.slideStyle, {backgroundColor: slide.color}]}
					>
						<Text style={styles.slideText}>{slide.text}</Text>
						{this.renderLastSlide(index)}
					</View>
				);
			}
		);
	}
///
//gracias a ecma2017 las variables con dato booleano no se ponen
//horizontal=True -> horizontal
	render(){
		return(
			<ScrollView
				horizontal
				pagingEnabled
			>
			{this.renderSlides()}
			</ScrollView>
		);
	}
}

const styles = {
	slideStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: SCREEN_WIDTH
	},
	slideText: {
		fontSize: 30,
		color: "white",
		textAlign: "center"
	},
	buttonStyle: {
		backgroundColor: "#0288D1",
		marginTop: 15
	}
};

export default Slides;
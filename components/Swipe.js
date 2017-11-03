import React, {Component} from 'react';
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager, Platform} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
//limite para que se active
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

const SWIPE_OUT_DURATION = 250;

class Swipe extends Component{
	static defaultProps = {
		onSwipeRight: () => {},
		onSwipeLeft: () => {},
		keyProp: 'id'
	}
	constructor(props){
		super(props);

		//onStartShouldSetPanResponder <- es ejecutada cada vez que el usuario hace tap en la pantalla
		//true <- para que este panresponder se encargue si el usuario presiona la pantalla
		//false <- si no quieres que se responsable de manejar el gesture

		//onPanMove <- que pasa cuando el usuario mueve el objeto, cada vez que el usuario mueve 1px X 1px

		//onPanRelease <- es llamado cuando quita su dedo de la pantalla

		//event <- datos de lo que tocas; gesture <- datos de tu dedo, que tan rapido mueves y localizacion

		//cuidado con el console.log dentro del PanResponderMove, pon un debugger

		//dx dy are single gestures, solo pasar el dedo
		/*
			debugger
			console.log(gesture)
		*/
		const position = new Animated.ValueXY();
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				position.setValue({x: gesture.dx, y: gesture.dy});
			},
			onPanResponderRelease: (event, gesture) => {
				if(gesture.dx > SWIPE_THRESHOLD){
					this.forceSwipe("right");
				} else if (gesture.dx < -SWIPE_THRESHOLD){
					this.forceSwipe("left");
				} else{
					this.resetPostion();
				}
			}
		});

		//no hay algo fuerte para decir que debe estar guaradado en el state
		//pero en versiones oficciales siempre esta hay
		//igual puedes crear un this.panResponder

		//nota que rompes las reglas en position, estas actualizandolo sin el setState
		//igual puedes hacer esto this.position = position;
		this.state = {panResponder, position, index: 0};
	}

	//sera llamada cada vez que se reciban nuevos props
	//evalua si es el mismo MISMO arreglo
	componentWillReceiveProps(nextProps){
		if(nextProps.data !== this.props.data){
			this.setState({index: 0});
		}
	}

	componentWillUpdate(){
		//if this function exist, we will call
		UIManager.setLayoutAnimationEnabledExperimental  && UIManager.setLayoutAnimationEnabledExperimental(true);
		//le dice a react native que cuando hayga un cambio en el componente tiene que animar ese cambio
		LayoutAnimation.spring();
	}

	forceSwipe(direction){
		const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
		Animated.timing(this.state.position, {
			toValue: {x, y:0 },
			duration: SWIPE_OUT_DURATION
		}).start(() => this.onSwipeComplete(direction));
	}

	onSwipeComplete(direction){
		const {onSwipeLeft, onSwipeRight, data} = this.props;
		const item = data[this.state.index];
		direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
		//tienes que reiniciar los valores, sino el siguiente card va a tener la misma poscision
		//hacia afuera
		//checa que en el state no usamos el setState
		this.state.position.setValue({x: 0, y: 0});
		this.setState({index: this.state.index + 1});
	}

	resetPostion(){
		Animated.spring(this.state.position, {
			toValue: {x: 0, y:0 }
		}).start();
	}

	getCardStyle(){
		const {position} = this.state;
		const rotate = position.x.interpolate({
			inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
			outputRange: ['-120deg', '0deg', '120deg']
		});
		return {
			...position.getLayout(),
			transform: [{rotate}]
		};
	}

	//cada vez que la tarjeta cambia, cambia tampien el animated view

	renderCards(){
		if(this.state.index >= this.props.data.length){
			return this.props.renderNoMoreCards();
		}
		console.log("Pasaste de nuevo por aqui");
		const deck = this.props.data.map((item, i) => {
			if(i < this.state.index){return null;}
			if(i === this.state.index){
				return(
					<Animated.View
						key={item[this.props.keyProp]}
						style={[this.getCardStyle(), styles.cardStyle, {elevation: 1}]}
			  			{...this.state.panResponder.panHandlers}
					>
						{this.props.renderCard(item)}
					</Animated.View>
				);
			}
///
			return( 
				<Animated.View 
					key={item[this.props.keyProp]} 
					style={[styles.cardStyle, {top: 10 * (i - this.state.index)}]}
				>
					{this.props.renderCard(item)}
				</Animated.View>
			);
		});
///
		return Platform.OS === 'android' ? deck.reverse() : deck;
	}
	//El {...state} es para pasar todas las propiedades del panHandlres al view

	render(){
		return(
			<View >
				{this.renderCards()}
			</View>
		);
	}
}
///
const styles = {
	cardStyle: {
		position: "absolute",
		width: SCREEN_WIDTH
	}
}

export default Swipe;
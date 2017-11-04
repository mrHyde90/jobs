import Expo, {Notifications} from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Provider } from 'react-redux';

import registerForNotifications from './services/push_notifications';
import store from './store';
import {TabNavigator, StackNavigator} from 'react-navigation';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
  componentDidMount(){
    //date cuenta que es una funcion
    registerForNotifications();
    Notifications.addListener((notification) => {
      const {data: {text}, origin } = notification;
      //const text = notification.data.text
      if(origin === 'received' && text){
        Alert.alert(
          'New Push Notification',
          text,
          [{text: 'Ok.'}]
        );
      }
    });
  }
  //One of the biggest gotcha
  //react-navigation renderiza a todos los que se encuentren en el tab navigator
  render() {
    const MainNavigator = TabNavigator({
      welcome: {screen: WelcomeScreen},
      auth: {screen: AuthScreen},
      main: {
        screen: TabNavigator({
          map: {screen: MapScreen},
          deck: {screen: DeckScreen},
          review: {
            screen: StackNavigator({
              review: {screen: ReviewScreen},
              settings: {screen: SettingsScreen}
            })
          }
        },
        {
          tabBarPosition: 'bottom',
          lazy: true,
          swipeEnabled: false,
          animationEnabled: false,
          tabBarOptions: {
            showIcon: true,
            iconStyle: {
              width: 30,
              height: 30
            }
          }
        })
      }
    }, 
    {
      navigationOptions: {
        tabBarVisible: false
      },
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      lazy:true,
      animationEnabled: false
    }
    );

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

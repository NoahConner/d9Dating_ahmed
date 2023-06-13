import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../../screens/App/Home';
import ViewUser from '../../../screens/App/Home/ViewUser/index';
import FunInteraction from '../../../screens/App/Home/FunInteraction';
import Comments from '../../../screens/App/Home/Comments';
import CreatePost from '../../../screens/App/CreatePost';
import Map from '../../../screens/Auth/Register/Map';
import Likes from '../../../screens/App/Home/Likes';
import * as RootNavigation from '../../../../RootNavigation';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Chat from '../../../screens/App/Message/Chat/index';

const Stack = createStackNavigator();

const HomeStack = () => {
  const navigator = useNavigation();
  // haseeb's code
  useEffect(() => {
    if (Platform.OS == 'ios') {
      PushNotificationIOS.requestPermissions({
        alert: true,
        badge: true,
        sound: true,
        critical: true,
      }).then(
        data => {
          PushNotificationIOS.addEventListener(
            'error',
            function (key, message) {
              // alert('error: ' + message);
            },
          );
        },
        data => {},
      );
    }

    PushNotification.configure({
      onRegister: function (token) {},

      onNotification: async (notification, props) => {
        const userData = JSON.parse(notification?.data?.userData);
        if (notification?.data?.screen == 'InnerChat') {
          navigator.navigate('MessageStack', {
            screen: 'InnerChat',
            params: {userData: userData},
          });
        }
        if (notification?.data?.screen == 'Notification') {
          navigator.navigate('Notification', {
            screen: 'Notification',
            params: {userData: userData},
          });
        } else {
          RootNavigation.navigate(notification?.data?.screen, {
            data: data,
          });
        }
      },

      popInitialNotification: true,
      requestPermissions: true,
      requestPermissions: Platform.OS === 'ios',
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: false,
        sound: false,
      },
    });
  }, []);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ViewUser" component={ViewUser} />
      <Stack.Screen name="FunInteraction" component={FunInteraction} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="createPost" component={CreatePost} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default HomeStack;

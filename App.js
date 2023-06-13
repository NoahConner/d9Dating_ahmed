import 'react-native-gesture-handler';
import {KeyboardAvoidingView, Platform, PermissionsAndroid} from 'react-native';
import React, {memo, useEffect} from 'react';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, useToast} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MyStatusBar from './src/Components/StatusBar';
import RNBootSplash from 'react-native-bootsplash';
import BottomTabs from './src/Navigation/BottomTabs';
import AuthStack from './src/Navigation/Stacks/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosconfig from './src/Providers/axios';
import messaging from '@react-native-firebase/messaging';
import socket from './src/utils/socket';
import SplashScreen from 'react-native-splash-screen';
import {navigationRef} from './RootNavigation';
import {AppState} from 'react-native';
import {AppContext, AppProvider, useAppContext} from './src/Context/AppContext';

const user_details = {
  about_me: null,
  block_status: 0,
  connected: 0,
  created_at: '2023-06-06T12:21:34.000000Z',
  date: '6/06/2005',
  date_login: '2023-06-07 07:27:08',
  device_token:
    'cjpfF71SSfek0x-BdoI8w3:APA91bHe5BAFrEZ5_hpNF9Cz0z49kkXDoIeUiOcz5o87DP2Y-QtLaPk0XPpQGjBNgs2bM6fdiQZQJkOF3vmzJIRgbp5GPz6Ra0EqFu0p9kCUcPvyI_OfAKsXT3qUVK28tWM0Es1an1Sr',
  email: 'emilymartin9875@gmail.com',
  email_verified_at: null,
  gender: 'Female',
  group: 'Omega Psi Phi Fraternity, Inc.',
  id: 2,
  image:
    'https://designprosusa.com/the_night/storage/app/1686122942base64_image.png',
  last_name: 'martin',
  location: null,
  month: null,
  name: 'Emily',
  notify: '0',
  otp: '8405',
  phone_number: '+443334443333',
  post_privacy: '1',
  privacy_option: '1',
  status: '1',
  story_privacy: '00000000001',
  theme_mode: null,
  updated_at: '2023-06-07T07:29:02.000000Z',
  year: null,
};

const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
    }
  }
  // const checkToken = async () => {
  //   const fcmToken = await messaging().getToken();
  //   if (fcmToken) {
  //     dispatch(setFToken(fcmToken));
  //   }

  // };

  const requestNotificationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          await AsyncStorage.setItem('permission', 'granted');
        } else {
          await AsyncStorage.setItem('permission', 'denied');
        }
      } else {
        const status = await request(PERMISSIONS.IOS.NOTIFICATIONS);
        if (status === RESULTS.GRANTED) {
          await AsyncStorage.setItem('permission', 'granted');
        } else {
          await AsyncStorage.setItem('permission', 'denied');
        }
      }
    } catch (error) {
      console.log('Error requesting notification permission: ', error);
    }
  };

  useEffect(() => {
    checkNotPer();
  }, []);

  const checkNotPer = async () => {
    const checkPermission = await AsyncStorage.getItem('permission');
    askForPermission(checkPermission);
  };

  const askForPermission = checkPermission => {
    if (checkPermission == 'granted') {
    } else {
      const checkAndRequestNotificationPermission = async () => {
        try {
          const status = await check(
            Platform.OS === 'android'
              ? PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
              : PERMISSIONS.IOS.NOTIFICATIONS,
          );
          if (status === RESULTS.GRANTED) {
            await AsyncStorage.setItem('permission', 'granted');
          } else {
            await requestNotificationPermission();
          }
        } catch (error) {
          console.log('Error checking notification permission: ', error);
        }
      };

      checkAndRequestNotificationPermission();
    }
  };
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected');
    });
    socket.on('disconnect', reason => {
      console.log('Socket disconnected');
      console.log('Reason:', reason);
    });
    socket.on('error', error => {
      console.error('Socket error:', error);
    });
    socket.on('connect_error', error => {
      console.log('Connection error:', error);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    requestUserPermission();
    // checkToken();
  }, []);

  useEffect(() => {}, []);

  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};
const AppContent = memo(() => {
  const {token, setToken} = useAppContext(AppContext);

  useEffect(() => {
    const init = async () => {
      getToken();
      
    };

    init().finally(async () => {
      if (Platform.OS == 'ios') {
        await RNBootSplash.hide({fade: true, duration: 500});
      } else {
        setTimeout(() => {
          SplashScreen.hide();
        }, 1500);
      }
    });
  }, []);

  const getToken = async () => {
    let token = await AsyncStorage.getItem('userToken');
    let exist = await AsyncStorage.getItem('already');
    let userData = await AsyncStorage.getItem('userData');
    userData = JSON.parse(userData);
    if (token) {
      socket.auth = {username: userData?.email};
      socket.connect();
    }
    setToken(token);
  };

  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <MyStatusBar backgroundColor="#000" barStyle="light-content" />
        <NavigationContainer ref={navigationRef}>
          {token === null ? <AuthStack /> : <BottomTabs />}
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
});
export default App;

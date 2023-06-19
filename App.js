import 'react-native-gesture-handler';
import {KeyboardAvoidingView, Platform, PermissionsAndroid} from 'react-native';
import React, {memo, useEffect} from 'react';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, useToast} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MyStatusBar from './src/Components/StatusBar';
import {useSelector, useDispatch} from 'react-redux';
import {setTheme, setUserToken, setExist, setFToken} from './src/Redux/actions';
import RNBootSplash from 'react-native-bootsplash';
import BottomTabs from './src/Navigation/BottomTabs';
import AuthStack from './src/Navigation/Stacks/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosconfig from './src/Providers/axios';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import {navigationRef} from './RootNavigation';
import {AppState} from 'react-native';
import {AppContext, AppProvider, useAppContext} from './src/Context/AppContext';
import { ToastProvider } from 'react-native-toast-notifications';

const App = () => {
  const dispatch = useDispatch();
  
  const userToken = useSelector(state => state.reducer.userToken);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
    }
  }
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      dispatch(setFToken(fcmToken));
    }
  };

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
      console.error('Error requesting notification permission: ', error);
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
          console.error('Error checking notification permission: ', error);
        }
      };

      checkAndRequestNotificationPermission();
    }
  };

  useEffect(() => {
    requestUserPermission();
    checkToken();
  }, []);

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

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'active') {
      } else {
        updateLastSeen();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);
  }, []);
  const updateLastSeen = async () => {
    let tokens = await AsyncStorage.getItem('userToken');
    if (tokens) {
      await axiosconfig
        .post(
          `last-seen`,
          {},
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(tokens)}`,
            },
          },
        )
        .then(res => {
        })
        .catch(err => {
          console.error(err, 'last seen err1');
        });
    }
  };

  const getToken = async () => {
    let token = await AsyncStorage.getItem('userToken');
    let exist = await AsyncStorage.getItem('already');
    let userData = await AsyncStorage.getItem('userData');
    userData = JSON.parse(userData);
    dispatch(setExist(exist));
    setThemeMode();
    dispatch(setUserToken(token));
  };

  const setThemeMode = async () => {
    let SP = await AsyncStorage.getItem('id');
    let tokens = await AsyncStorage.getItem('userToken');
    axiosconfig
      .get(`user_view/${SP}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(tokens)}`,
        },
      })
      .then(res => {
        if (
          res?.data?.user_details?.theme_mode == null ||
          res?.data?.user_details?.theme_mode == '' ||
          res?.data?.user_details?.theme_mode == 0
        ) {
          dispatch(setTheme('dark'));
        } else {
          dispatch(setTheme('light'));
        }
        if (Platform.OS == 'android') {
          console.log('close splash');
        }
      })
      .catch(err => {
        if (Platform.OS == 'android') {
          setTimeout(() => {
            SplashScreen.hide();
          }, 1500);
        }
        console.error('error', err);
      });
  };
  return (
    <AppProvider>
      <ToastProvider>
      <AppContent />
      </ToastProvider>
    </AppProvider>
  );
};
const AppContent = memo(() => {
  const {token} = useAppContext(AppContext);

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

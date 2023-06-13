import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../../../screens/App/User';
import Help from '../../../screens/App/User/Help';
import Settings from '../../../screens/App/User/Settings';
import Privacy from '../../../screens/App/User/Privacy';
import Resetpass from '../../../screens/App/User/ResetPass';
import ForgetPassword from '../../../screens/Auth/ForgetPass';
import About from '../../../screens/App/User/About/About';
import ChangePass from '../../../screens/Auth/ChangePass';
import Login from '../../../screens/Auth/Login';
import Block from '../../../screens/App/User/Blocked';
import Map from '../../../screens/Auth/Register/MapTest';
import HiddenPosts from '../../../screens/App/User/Hidden Posts';
import socket from '../../../utils/socket';
import {View, Text} from 'react-native';
import {useToast} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {moderateScale} from 'react-native-size-matters';
import {useEffect, useState} from 'react';
import CreatePost from '../../../screens/App/CreatePost';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();

const ProfileStack = () => {
  const [myData, setMyData] = useState('');
  const toast = useToast();

  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('userData');
      setMyData(JSON.parse(data));
    };
    getData();

    const handleMessage = ({from, to, message, time}) => {
      if (to == myData?.id) {
        toast.show({
          placement: 'top',
          render: () => {
            return (
              <View
                style={{
                  borderRadius: moderateScale(10, 0.1),
                  paddingVertical: moderateScale(10, 0.1),
                  paddingHorizontal: moderateScale(15, 0.1),
                  backgroundColor: '#FFD700',
                  flexDirection: 'row',
                }}>
                <Icon name={'envelope'} color={'#000'} size={18} />
                <Text
                  style={{color: '#000', marginLeft: moderateScale(10, 0.1)}}>
                  You have a new message
                </Text>
              </View>
            );
          },
        });
      }
    };

    const handleSocketMessage = ({from, to, message, time}) => {
      handleMessage({from, to, message, time});
    };
    const handleRequest = ({from, to, type}) => {
      if (to == myData?.id && type == 'connectRequest') {
        toast.show({
          placement: 'top',
          render: () => {
            return (
              <View
                style={{
                  borderRadius: moderateScale(10, 0.1),
                  paddingVertical: moderateScale(10, 0.1),
                  paddingHorizontal: moderateScale(15, 0.1),
                  backgroundColor: '#FFD700',
                  flexDirection: 'row',
                }}>
                <Icon name={'envelope'} color={'#000'} size={18} />
                <Text
                  style={{color: '#000', marginLeft: moderateScale(10, 0.1)}}>
                  You have a new request
                </Text>
              </View>
            );
          },
        });
      }
    };

    const handleSocketRequest = ({from, to, type}) => {
      handleRequest({from, to, type});
    };
    socket.on('message', handleSocketMessage);
    socket.on('request', handleSocketRequest);

    return () => {
      socket.off('message', handleSocketMessage);
      socket.off('request', handleSocketRequest);
    };
  }, [socket, myData]);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="ResetPass" component={Resetpass} />
      <Stack.Screen name="Forgot" component={ForgetPassword} />
      <Stack.Screen name="ChangePass" component={ChangePass} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Block" component={Block} />
      <Stack.Screen name="HiddenPosts" component={HiddenPosts} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default ProfileStack;

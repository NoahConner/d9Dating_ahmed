import {StyleSheet, Platform, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {moderateScale} from 'react-native-size-matters';
import HomeStack from '../Stacks/HomeStack';
import MessageStack from '../Stacks/MessageStack';
import CreatePostStack from '../Stacks/CreatePostStack';
import ProfileStack from '../Stacks/ProfileStack';
import Notification from '../Stacks/NotificationStack';
import Icon from 'react-native-vector-icons/Octicons';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import socket from '../../utils/socket';
import {AppContext, useAppContext} from '../../Context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const {request, setRequest, uniqueId, messageAlert, setMessageAlert} =
    useAppContext(AppContext);
  const [myData, setMyData] = useState('');
  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('userData');
      setMyData(JSON.parse(data));
    };
    getData();

    const handleMessage = ({from, to, message, time}) => {
      if (to == myData?.id) {
        setMessageAlert(true);
      }
    };

    const handleSocketMessage = ({from, to, message, time}) => {
      handleMessage({from, to, message, time});
    };
    const handleRequest = ({from, to, type}) => {
      if (to == myData?.id && type == 'connectRequest') {
        setRequest(true);
      }
    };

    const handleSocketRequest = ({from, to, type}) => {
      handleRequest({from, to, type});
    };
    const handleLike = ({postId, postUserId, myId}) => {
      console.log(postUserId, myData?.id, 'idssso flike');
      if (postUserId == myData?.id && myId != myData?.id) {
        setRequest(true);
      }
    };

    const handleSocketLike = ({postId, postUserId, myId}) => {
      handleLike({postId, postUserId, myId});
    };
    const handleComment = ({postId, postUserId, myId}) => {
      console.log(postUserId, myData?.id, 'idssso flike');
      if (postUserId == myData?.id && myId != myData?.id) {
        setRequest(true);
      }
    };

    const handleSocketComment = ({postId, postUserId, myId}) => {
      handleComment({postId, postUserId, myId});
    };
    socket.on('message', handleSocketMessage);
    socket.on('request', handleSocketRequest);
    socket.on('like', handleSocketLike);
    socket.on('comment', handleSocketComment);

    return () => {
      socket.off('message', handleSocketMessage);
      socket.off('request', handleSocketRequest);
      socket.off('like', handleSocketLike);
    socket.off('comment', handleSocketComment);
    };
  }, [socket, myData]);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#343434',
          position: 'relative',
          borderWidth: 0,
          borderColor: '#343434',
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={'HomeStack'}
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Home
                name="home"
                color={focused ? '#FFD700' : '#F8F8F8'}
                solid
                size={moderateScale(24, 0.1)}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'MessageStack'}
        component={MessageStack}
        options={{
          tabBarStyle: {
            display: 'none',
          },
          tabBarVisible: false,
          tabBarIcon: ({focused}) => (
            <View>
              {messageAlert ? (
                <View style={styles.notificationAvailable}></View>
              ) : null}
              <ChatIcon
                name="md-chatbubble-ellipses"
                color={focused ? '#FFD700' : '#F8F8F8'}
                solid
                size={moderateScale(22, 0.1)}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'CreatePostStack'}
        component={CreatePostStack}
        options={{
          tabBarStyle: {
            display: 'none',
          },
          tabBarIcon: ({focused}) => (
            <View style={styles.addTab}>
              <Icon
                name="plus"
                color={'#F8F8F8'}
                solid
                size={moderateScale(30, 0.1)}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Notification'}
        component={Notification}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              {request ? (
                <View style={styles.notificationAvailable}></View>
              ) : null}
              <AntDesign
                name="heart"
                color={focused ? '#FFD700' : '#F8F8F8'}
                solid
                size={moderateScale(22, 0.1)}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'ProfileStack'}
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesome5
                name="user"
                color={focused ? '#FFD700' : '#F8F8F8'}
                solid
                size={moderateScale(22, 0.1)}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addTab: {
    backgroundColor: '#FFD700',
    width: moderateScale(50, 0.1),
    height: moderateScale(50, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(25, 0.1),
    position: 'absolute',
    top: moderateScale(-25),
  },
  notificationAvailable: {
    backgroundColor: 'red',
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(10),
    position: 'absolute',
    zIndex: 1,
    left: moderateScale(0),
    bottom: moderateScale(0),
  },
});
export default BottomTabs;

import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import {ScrollView} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import axiosconfig from '../../../Providers/axios';
import {useIsFocused} from '@react-navigation/native';
import {Header, Loader} from '../../../Components/Index';
import {AppContext, useAppContext} from '../../../Context/AppContext';
import socket from '../../../utils/socket';
import {dummyImage, socketRequest, width} from '../../../Constants/Index';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {theme} from '../../../Constants/Index';

const dummyData = [
  {
    created_at: '2023-06-07T07:01:22.000000Z',
    id: 9,
    notifiable_id: '2',
    read_status: '0',
    status: '0',
    text: 'like your post',
    type: 'Like',
    type_id: '3',
    updated_at: '2023-06-07T07:01:22.000000Z',
    user_id: '2',
    users: {
      about_me: 'my about info',
      created_at: '2023-06-06T12:21:34.000000Z',
      date: '6/06/2005',
      date_login: '2023-06-07 12:12:30',
      device_token:
        'fZYK_18WRRCK7bRQlIS0KC:APA91bEzzPVuCC0Jx-GbQA81cX8nfRgGQrhVDvpaphQxSBMLX2DSZj618DzwnKyAk9srilIQ4L6RtdpAYFGzuCMHfC2Y3g2gBbVESvPODUFG-7NzdJVmQA5pNS4ttkRZiKY7KQB_76B1',
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
      updated_at: '2023-06-07T12:12:30.000000Z',
      year: null,
    },
  },
  {
    created_at: '2023-06-07T07:01:09.000000Z',
    id: 8,
    notifiable_id: '2',
    read_status: '0',
    status: '0',
    text: 'oodd',
    type: 'Comment',
    type_id: '6',
    updated_at: '2023-06-07T07:01:09.000000Z',
    user_id: '2',
    users: {
      about_me: 'my about info',
      created_at: '2023-06-06T12:21:34.000000Z',
      date: '6/06/2005',
      date_login: '2023-06-07 12:12:30',
      device_token:
        'fZYK_18WRRCK7bRQlIS0KC:APA91bEzzPVuCC0Jx-GbQA81cX8nfRgGQrhVDvpaphQxSBMLX2DSZj618DzwnKyAk9srilIQ4L6RtdpAYFGzuCMHfC2Y3g2gBbVESvPODUFG-7NzdJVmQA5pNS4ttkRZiKY7KQB_76B1',
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
      updated_at: '2023-06-07T12:12:30.000000Z',
      year: null,
    },
  },
  {
    created_at: '2023-06-07T07:00:15.000000Z',
    id: 7,
    notifiable_id: '2',
    read_status: '0',
    status: '0',
    text: 'beautiful',
    type: 'Comment',
    type_id: '5',
    updated_at: '2023-06-07T07:00:15.000000Z',
    user_id: '2',
    users: {
      about_me: 'my about info',
      created_at: '2023-06-06T12:21:34.000000Z',
      date: '6/06/2005',
      date_login: '2023-06-07 12:12:30',
      device_token:
        'fZYK_18WRRCK7bRQlIS0KC:APA91bEzzPVuCC0Jx-GbQA81cX8nfRgGQrhVDvpaphQxSBMLX2DSZj618DzwnKyAk9srilIQ4L6RtdpAYFGzuCMHfC2Y3g2gBbVESvPODUFG-7NzdJVmQA5pNS4ttkRZiKY7KQB_76B1',
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
      updated_at: '2023-06-07T12:12:30.000000Z',
      year: null,
    },
  },
  {
    created_at: '2023-06-07T06:59:41.000000Z',
    id: 6,
    notifiable_id: '2',
    read_status: '0',
    status: '0',
    text: 'hello',
    type: 'Comment',
    type_id: '4',
    updated_at: '2023-06-07T06:59:41.000000Z',
    user_id: '2',
    users: {
      about_me: 'my about info',
      created_at: '2023-06-06T12:21:34.000000Z',
      date: '6/06/2005',
      date_login: '2023-06-07 12:12:30',
      device_token:
        'fZYK_18WRRCK7bRQlIS0KC:APA91bEzzPVuCC0Jx-GbQA81cX8nfRgGQrhVDvpaphQxSBMLX2DSZj618DzwnKyAk9srilIQ4L6RtdpAYFGzuCMHfC2Y3g2gBbVESvPODUFG-7NzdJVmQA5pNS4ttkRZiKY7KQB_76B1',
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
      updated_at: '2023-06-07T12:12:30.000000Z',
      year: null,
    },
  },
];
const Notifications = ({navigation, route}) => {
  const flatListRef = useRef(null);
  const isFocused = useIsFocused();
  const {token, request, setRequest} = useAppContext(AppContext);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [notificationdata, setNotificationData] = useState(dummyData);
  const [response, setResponse] = useState('');
  const [index, setIndex] = useState('');
  const [myData, setMyData] = useState('');
  useEffect(() => {
    setResponse('');
    getList(true);
    if (request) {
      setRequest(false);
    }
  }, [isFocused]);
  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('userData');
      setMyData(JSON.parse(data));
    };
    getData();

    const handleLike = ({postId, postUserId, myId}) => {
      console.log(postUserId, myData?.id, 'idssso flike');
      if (postUserId == myData?.id) {
        getNotification();
      }
    };

    const handleSocketLike = ({postId, postUserId, myId}) => {
      handleLike({postId, postUserId, myId});
    };
    const handleComment = ({postId, postUserId, myId}) => {
      console.log(postUserId, myData?.id, 'idssso flike');
      if (postUserId == myData?.id) {
        getNotification();
      }
    };

    const handleSocketComment = ({postId, postUserId, myId}) => {
      handleComment({postId, postUserId, myId});
    };
    const handleRequest = ({from, to, type}) => {
      if (to == myData?.id && (type == 'connect' || type == 'connectRequest')) {
        getList(false);
      }
      if (to == myData?.id && type == 'connectRequest') {
        if (request) {
          setRequest(false);
        }
      }
    };

    const handleSocketRequest = ({from, to, type}) => {
      handleRequest({from, to, type});
    };
    socket.on('request', handleSocketRequest);
    socket.on('like', handleSocketLike);
    socket.on('comment', handleSocketComment);

    return () => {
      socket.off('request', handleSocketRequest);
      socket.off('like', handleSocketLike);
      socket.off('comment', handleSocketComment);
    };
  }, [socket, myData]);
  const id = route?.params?.data?.id;
  const matchId = () => {
    data.map((v, index) => {
      if (v.user_id == id) {
        const matchedId = v.user_id;
        if (index !== -1 && flatListRef.current) {
          flatListRef.current.scrollToIndex({index, animated: true});
        }
      } else {
      }
    });
  };
  const getItemLayout = (data, index) => ({
    length: 200,
    offset: 200 * index,
    index,
  });

  const getList = async loader => {};

  const getNotification = async () => {
    setNotificationData(dummyData);
  };
  const connectAccept = async connectId => {
    console.log('accept');
  };
  const connectDecline = async connectId => {
    console.log('decline');
  };

  const renderItem = (elem, i) => {
    return (
      <View key={i} style={s.card}>
        <View style={s.dp}>
          <Image
            source={{
              uri: elem?.item?.request_user?.image
                ? elem?.item?.request_user?.image
                : dummyImage,
            }}
            style={s.dp1}
            resizeMode={'cover'}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ViewUser', {
              screen: 'search',
              post: {id: elem?.item?.request_user?.id},
            });
          }}
          style={{flex: 0.7, alignSelf: 'center'}}>
          <View>
            <View
              style={{flexDirection: 'column', width: moderateScale(200, 0.1)}}>
              <Text style={[s.name, s.nameBold, {color: textColor}]}>
                {elem?.item?.request_user?.name}{' '}
                {elem?.item?.request_user?.last_name}
              </Text>
              <Text style={[s.name1]}> requested to follow you</Text>
            </View>
          </View>
        </TouchableOpacity>

        {response && index == elem?.item?.request_user?.id ? (
          <View style={s.icon}>
            <View style={s.fView}>
              <Text style={[s.fText, {color: textColor}]}>{response}</Text>
            </View>
          </View>
        ) : (
          <View style={[s.icon]}>
            <TouchableOpacity
              onPress={() => connectAccept(elem?.item?.request_user?.id)}>
              <View
                style={{
                  paddingHorizontal: moderateScale(6, 0.1),
                  right: moderateScale(15),
                }}>
                <Antdesign name="checkcircle" size={20} color="green" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => connectDecline(elem?.item?.request_user?.id)}>
              <View
                style={{
                  right: moderateScale(5),
                }}>
                <Antdesign name="closecircle" size={20} color="red" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  const NotificationRenderItem = (notification, i) => {
    return (
      <View key={i} style={s.card}>
        <View style={s.dp}>
          <Image
            source={{
              uri: notification?.item?.users?.image
                ? notification?.item?.users?.image
                : dummyImage,
            }}
            style={s.dp1}
            resizeMode={'cover'}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ViewUser', {
              screen: 'search',
              post: {id: notification?.item?.users?.id},
            });
          }}
          style={{flex: 1, alignSelf: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <Text style={[s.name, s.nameBold, {color: textColor}]}>
                {notification?.item?.users?.name}{' '}
                {notification?.item?.users?.last_name}
              </Text>
              <Text style={s.name1}>
                {notification?.item?.type == 'Like'
                  ? 'like your post'
                  : 'comment on your post'}
              </Text>
            </View>
            <Text style={s.name1}>
              {moment(notification?.item?.created_at).fromNow()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const renderEmptyComponent = () => {
    return !data?.length ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'white', fontSize: moderateScale(16, 0.1)}}>
          No notifications
        </Text>
      </View>
    ) : null;
  };
  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: color}}>
      <Header navigation={navigation} />
      <View style={[s.container, {backgroundColor: color}]}>
        <View>
          <Text style={[s.HeadingText, {color: textColor}]}>Notifications</Text>
        </View>
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          keyExtractor={(item, index) => String(index)}
          scrollEnabled={true}
        />
        <FlatList
          ref={flatListRef}
          data={notificationdata}
          renderItem={NotificationRenderItem}
          getItemLayout={getItemLayout}
          keyExtractor={(item, index) => String(index)}
          scrollEnabled={true}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

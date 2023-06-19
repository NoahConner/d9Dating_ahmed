import {TouchableOpacity, Text, SafeAreaView, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import {addUsers, addSocketUsers} from '../../../Redux/actions';
import s from './style';
import {FlatList} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import UserListModal from '../../../Components/userListModal';
import axiosconfig from '../../../Providers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import Inicon from 'react-native-vector-icons/Ionicons';
import {Loader} from '../../../Components/Index';
import {AppContext, useAppContext} from '../../../Context/AppContext';
import {dummyImage} from '../../../Constants/Index';
import { socket } from '../../../Navigation/BottomTabs';

const Message = ({navigation, route}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {token, setMessageAlert, uniqueId, newMessageAlert, setNewMessageAlert} = useAppContext(AppContext);
  const theme = useSelector(state => state.reducer.theme);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [myData, setMyData] = useState('');
  useEffect(() => {
    userslist();
    setMessageAlert(false)
  }, [isFocused]);  
  useEffect(() => {
    socket.on('users', users => {
      users.forEach(user => {
        user.self = user.userID === socket.id;
      });
      dispatch(addSocketUsers(users));
    });
  }, []);
  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('userData');
      setMyData(JSON.parse(data));
    };
    getData();
    const handleMessage = async ({from, to, message, time, socketUniqueId}) => {
      if (to == myData?.id || to == uniqueId) {
        await latestMsg();
      }
    };

    const handleSocketMessage = ({from, to, message, time, socketUniqueId}) => {
      handleMessage({from, to, message, time, socketUniqueId});
    };

    socket.on('message', handleSocketMessage);
    return () => {
      socket.off('message', handleSocketMessage);
    };
  }, [socket, myData]);
  const userslist = async () => {
    setLoader(true);
    await axiosconfig
      .get(`connected_users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        dispatch(addUsers(res?.data.friends));
        latestMsg();
      })
      .catch(err => {
        setLoader(false);
        console.error(err);
      });
  };

  const latestMsg = async () => {
    await axiosconfig
      .get(`message_index`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setRooms(res?.data);
        setLoader(false);
      })
      .catch(err => {
        console.log(err,"hello message list response");
        setLoader(false);
        console.error(err);
      });
  };

  const handleCreateRoom = user => {
    navigation.navigate('InnerChat', user);
    setModalVisible(false);
  };

  const renderItem = (elem, i) => {
    let latest;

    if (
      elem?.item?.user_sender[0]?.id !== undefined &&
      elem?.item?.user_receive[0]?.id == undefined
    ) {
      latest = elem?.item?.user_sender[0];
    } else if (
      elem?.item?.user_receive[0]?.id !== undefined &&
      elem?.item?.user_sender[0]?.id == undefined
    ) {
      latest = elem?.item?.user_receive[0];
    } else {
      latest =
        Number(elem?.item?.user_receive[0]?.id) >
        Number(elem?.item?.user_sender[0]?.id)
          ? elem?.item?.user_receive[0]
          : elem?.item?.user_sender[0];
    }

    if (
      Number(elem?.item?.user_receive.length) > 0 ||
      Number(elem?.item?.user_sender.length) > 0
    ) {
      return (
        <View style={s.card}>
          <TouchableOpacity onPress={() => {}} style={[s.dp]}>
            <Image
              source={{
                uri: elem.item?.image ? elem.item?.image : dummyImage,
              }}
              style={s.dp}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MessageStack', {
                screen: 'InnerChat',
                params: {userData: elem?.item},
              });
            }}
            style={[s.col, {flex: 0.6, justifyContent: 'flex-end'}]}>
            <View>
              <Text style={[s.name, s.nameBold, {color: textColor}]}>
                {elem?.item?.name}
              </Text>
            </View>

            {latest?.read_status == 1 ? (
              <Text style={[s.textSmall, s.nameBold, {color: textColor}]}>
                {latest?.message}
              </Text>
            ) : (
              <Text style={[s.textSmall, s.nameBold, {color: '#FFD700'}]}>
                {latest?.read_status == 0 ? 'New message' : null}
              </Text>
            )}
          </TouchableOpacity>
          <View style={s.time}>
            <Text style={[s.textRegular, {color: textColor}]}>
              {moment(latest?.created_at).fromNow()}
            </Text>
          </View>
        </View>
      );
    } else {
      return;
    }
  };
  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: color}}>
      {modalVisible ? (
        <UserListModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
          handleCreateRoom={handleCreateRoom}
        />
      ) : (
        <>
          <View
            style={[s.container, {backgroundColor: color}]}>
            <View
              style={{
                marginLeft: moderateScale(-5, 0.1),
                marginVertical: moderateScale(10, 0.1),
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={() => navigation.goBack('')}>
                <Inicon
                  name="arrow-back-circle-outline"
                  size={moderateScale(30)}
                  color={textColor}
                />
              </TouchableOpacity>
              <Text style={[s.HeadingText, {color: textColor}]}>Messages</Text>
            </View>

            <View></View>
            <View style={[s.border, {borderBottomColor: textColor}]}>
              <TouchableOpacity style={s.btn}>
                <Text style={[s.chats, {color: textColor}]}>Chats</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.btn}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Entypo
                  name={'new-message'}
                  color={textColor}
                  size={moderateScale(20, 0.1)}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={rooms}
              renderItem={renderItem}
              keyExtractor={(item, index) => String(index)}
              scrollEnabled={true}
              inverted
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Message;

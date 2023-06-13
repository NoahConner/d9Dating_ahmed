import React, {useEffect, useState} from 'react';

import {moderateScale} from 'react-native-size-matters';
import {Menu, Pressable} from 'native-base';
import {Text, View, Image, FlatList, Keyboard, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Antdesign from 'react-native-vector-icons/AntDesign';
import ChatHeader from '../../../../Components/ChatHeader';
import axiosconfig from '../../../../Providers/axios';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {
  dummyImage,
  formatTimestamp,
  generateRandomId,
  getColor,
  socketMessage,
  storeMsg,
  theme,
} from '../../../../Constants/Index';
import ChatFooter from '../../../../Components/ChatFooter';
import socket from '../../../../utils/socket';
import Loader from '../../../../Components/Loader';

const InnerChat = ({navigation, route}) => {
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [userData, setUserData] = useState(route.params?.userData);
  const [myData, setMyData] = useState('');
  const [loader, setLoader] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const {token} = useAppContext(AppContext);

  useEffect(() => {
    if (route.params) {
      setUserData(route.params?.userData);
      getMessages();
    }
  }, [userData]);

  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        setMyData(JSON.parse(data));
      }
    };
    getData();

    const handleMessage = ({from, to, message, time, socketUniqueId}) => {
      if (from === userData?.id && to == myData?.id) {
        setChatMessages(chatMessages => [
          ...chatMessages,
          {
            user_id: userData?.id,
            reciever_id: myData?.id,
            message: message,
            fromSelf: false,
            time: time,
          },
        ]);
      } else if (from === myData?.id && to === userData?.id) {
        setChatMessages(chatMessages => [
          ...chatMessages,
          {
            user_id: myData?.id,
            reciever_id: userData?.id,
            message,
            fromSelf: true,
            time: time,
            socketUniqueId: socketUniqueId,
          },
        ]);
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

  const getMessages = async () => {
    setLoader(true);
    try {
      const res = await axiosconfig.get(`message_show/${userData?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChatMessages(res?.data);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.log(err, 'message show API err');
    }
  };

  const handleNewMessage = async () => {
    if (message != '') {
      await setMessage('');
      const hour = await new Date().getHours().toString().padStart(2, '0');
      const mins = await new Date().getMinutes().toString().padStart(2, '0');
      const time = `${hour}:${mins}`;
      const socketUniqueId = await generateRandomId();
      await socketMessage(
        myData?.id,
        userData?.id,
        message,
        time,
        socketUniqueId,
      );
      await storeMsg(
        {
          id: userData.id,
          message: message,
          fromSelf: true,
          time: `${hour}:${mins}`,
          socketUniqueId: socketUniqueId,
        },
        token,
      );
    }
  };

  const msgDlt = async id => {
    setLoader(true);
    try {
      await axiosconfig
        .get(`message_delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setLoader(false);
          getMessages();
        });
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  const chatRenderItem = elem => {
    const status = elem?.item?.user_id === myData.id;
    return (
      <View
        style={[
          s.message,
          {justifyContent: status ? 'flex-end' : 'flex-start'},
        ]}
        key={elem.index}>
        {!status && (
          <View
            style={[
              s.dp,
              {
                borderColor: getColor(
                  !status ? userData?.group : myData?.group,
                ),
              },
            ]}>
            <Image
              source={{
                uri: !status
                  ? userData?.image
                    ? userData?.image
                    : dummyImage
                  : myData?.image
                  ? myData?.image
                  : dummyImage,
              }}
              style={s.dp1}
              resizeMode="cover"
            />
          </View>
        )}
        <View
          style={[
            {
              maxWidth: '80%',
              marginLeft: !status ? moderateScale(20, 0.1) : 0,
              marginRight: !status ? 0 : moderateScale(5, 0.1),
            },
          ]}>
          <View style={s.options}>
            <Menu
              borderWidth={moderateScale(1, 0.1)}
              borderColor="grey"
              backgroundColor={color}
              marginRight={moderateScale(15, 0.1)}
              marginTop={moderateScale(25, 0.1)}
              closeOnSelect={true}
              trigger={triggerProps => {
                return (
                  <Pressable
                    {...triggerProps}
                    style={{
                      flexDirection: 'row',
                      right: moderateScale(8, 0.1),
                    }}>
                    <View style={status ? s.textFrom : s.textTo}>
                      <Text style={s.textSmall1}>{elem?.item?.message}</Text>
                      <Text style={[s.textSmall1, {textAlign: 'right'}]}>
                        {formatTimestamp(elem?.item?.created_at)}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}>
              <Menu.Item
                onPress={() => {
                  msgDlt(elem?.item?.socketUniqueId);
                }}>
                <View style={s.optionView}>
                  <Antdesign
                    name="delete"
                    color={textColor}
                    size={moderateScale(13, 0.1)}
                    style={{flex: 0.3}}
                  />
                  <Text style={[s.optionBtns, {color: textColor}]}>Delete</Text>
                </View>
              </Menu.Item>
            </Menu>
          </View>
        </View>
        {status && (
          <View
            style={[
              s.dp,
              {
                borderColor: getColor(
                  !status ? userData?.group : myData?.group,
                ),
              },
            ]}>
            <Image
              source={{
                uri: !status
                  ? userData?.image
                    ? userData?.image
                    : dummyImage
                  : myData?.image
                  ? myData?.image
                  : dummyImage,
              }}
              style={s.dp1}
              resizeMode="cover"
            />
          </View>
        )}
      </View>
    );
  };

  return loader ? (
    <Loader />
  ) : (
    <View style={[s.container, {backgroundColor: color}]}>
      <ChatHeader
        userData={userData}
        getMessages={getMessages}
        setLoader={setLoader}
        navigation={navigation}
      />
      <View style={s.chat}>
        <FlatList
          inverted
          contentContainerStyle={{flexDirection: 'column-reverse'}}
          data={chatMessages}
          renderItem={chatRenderItem}
          keyExtractor={(item, index) => index.toString()}
          keyboardShouldPersistTaps="never"
          showsVerticalScrollIndicator={true}
        />
      </View>
      <ChatFooter
        message={message}
        setMessage={setMessage}
        handleNewMessage={handleNewMessage}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  chat: {
    maxHeight: '85%',
  },
  dp: {
    width: moderateScale(55, 0.1),
    height: moderateScale(55, 0.1),
    borderWidth: moderateScale(2, 0.1),
    borderRadius: moderateScale(55 / 2, 0.1),
  },
  dp1: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(53 / 2, 0.1),
  },
  options: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: moderateScale(15, 0.1),
  },
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: moderateScale(10, 0.1),
    marginBottom: moderateScale(15, 0.1),
  },
  textTo: {
    flexDirection: 'column',
    padding: moderateScale(15, 0.1),
    backgroundColor: '#4D4D4D',
    borderRadius: moderateScale(5, 0.1),
  },
  textFrom: {
    flexDirection: 'column',
    padding: moderateScale(15, 0.1),
    backgroundColor: '#333232',
    borderRadius: moderateScale(5, 0.1),
  },
  textSmall1: {
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(15, 0.1),
    marginVertical: moderateScale(2, 0.1),
    color: '#fff',
  },
});
export default InnerChat;

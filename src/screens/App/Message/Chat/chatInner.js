import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import {Input, Menu, Pressable} from 'native-base';
import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  Image,
  FlatList,
  Keyboard,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import s from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import Inicon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import socket from '../../../../utils/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Antdesign from 'react-native-vector-icons/AntDesign';
import axiosconfig from '../../../../Providers/axios';
import MaterialCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {addSocketUsers} from '../../../../Redux/actions';
import moment from 'moment';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {dummyImage, getColor} from '../../../../Constants/Index';
import Loader from '../../../../Components/Loader';

const Chat = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {token} = useAppContext(AppContext);
  const organizations = useSelector(state => state.reducer.organization);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState('');
  const [online, setOnline] = useState(true);
  const socketUsers = useSelector(state => state.reducer.socketUsers);
  const [loader, setLoader] = useState(false);
  const theme = useSelector(state => state.reducer.theme);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [backendUser, setBackendUser] = useState(route?.params?.backendUser);
  const [socketUser, setSocketUser] = useState(route?.params?.socketUser);

  useEffect(() => {
    getMessages();
    getData();
    sendReadStatus();
    setOnlineStatus(socketUsers);
  }, []);

  useEffect(() => {
    socket.on('private_message', ({content, from, time}) => {
      if (from === socketUser?.userID) {
        setChatMessages(chatMessages => [
          ...chatMessages,
          {
            user_id: backendUser?.id,
            reciever_id: userData?.id,
            message: content,
            fromSelf: false,
            time: time,
          },
        ]);
        sendReadStatus();
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on('users', users => {
      users.forEach(user => {
        user.self = user.userID === socket.id;
      });
      dispatch(addSocketUsers(users));
      setOnlineStatus(users);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('user-disconnected', users => {
      console.log('a user disconnected');
      users.forEach(user => {
        user.self = user.userID === socket.id;
      });
      dispatch(addSocketUsers(users));
      setOnlineStatus(users);
    });
  }, [socket]);

  const setOnlineStatus = async susers => {
    setOnline(false);
    let temp = false;
    console.log(susers, 'susers');
    susers.findLast((elem, index) => {
      if (elem?.username === backendUser?.email) {
        setOnline(true);
        temp = true;
        setSocketUser(elem);
      }
    });
    if (!temp) {
      getUserData();
    }
  };

  const getMessages = async () => {
    setLoader(true);
    await axiosconfig
      .get(`message_show/${backendUser?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setChatMessages(res?.data);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.log(err, 'message show API err');
      });
  };

  const getData = async () => {
    const data = await AsyncStorage.getItem('userData');
    setUserData(JSON.parse(data));
  };

  const handleNewMessage = () => {
    console.log(message,"hello mesage");
    Keyboard.dismiss();
    if(message != '' ||message != null || message != undefined ){
      const hour =
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : `${new Date().getHours()}`;
  
      const mins =
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : `${new Date().getMinutes()}`;
      let content = message;
  
      if (socketUser) {
        socket.emit('private_message', {
          content,
          to: socketUser.userID,
          timestamp: {hour, mins},
        });
        setChatMessages([
          ...chatMessages,
          {
            user_id: userData?.id,
            reciever_id: backendUser?.id,
            message,
            fromSelf: true,
            time: `${hour}:${mins}`,
          },
        ]);
        storeMsg({
          id: backendUser.id,
          message: message,
          fromSelf: true,
          time: `${hour}:${mins}`,
        });
        setMessage('');
      }
    }
  };

  const sendReadStatus = async () => {
    await axiosconfig
      .post(
        `read_status`,
        {id: backendUser?.id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        console.log('read status', res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const storeMsg = async msg => {
    await axiosconfig
      .post(`message_store`, msg, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('message send', res.data);
      })
      .catch(err => {});
  };

  const msgDlt = async id => {
    setLoader(true);
    await axiosconfig
      .delete(`message_delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        getMessages();
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
      });
  };
  const chatDlt = async () => {
    setLoader(true);
    await axiosconfig
      .delete(`clear_chat/${backendUser?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res?.data?.message, 'clear chat');
        getMessages();
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
      });
  };

  const getUserData = async () => {
    axiosconfig
      .get(`user_view/${backendUser?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setBackendUser(res.data.user_details);
      })
      .catch(err => {
        console.log(err);
      });
  };

  function formatTimestamp(timestamp) {
    const now = moment();
    const date = moment(timestamp);
    if (now.isSame(date, 'day')) {
      return date.format('h:mm A');
    } else {
      return date.format('DD/mm/yyyy');
    }
  }

  const renderItem = elem => {
    const status = elem?.item?.user_id === userData.id;
    return (
      <View
        style={[
          s.message,
          {justifyContent: status ? 'flex-end' : 'flex-start'},
        ]}
        key={elem.index}>
        {!status ? (
          <View
            style={[
              s.dp,
              {
                borderColor: getColor(
                  !status ? backendUser?.group : userData?.group,
                ),
              },
            ]}>
            <Image
              source={{
                uri: !status
                  ? backendUser?.image
                    ? backendUser?.image
                    : dummyImage
                  : userData?.image
                  ? userData?.image
                  : dummyImage,
              }}
              style={s.dp1}
              resizeMode={'cover'}
            />
          </View>
        ) : null}
        <View
          style={[
            {
              maxWidth: '80%',
              marginLeft: !status ? moderateScale(20, 0.1) : 0,
              marginRight: !status ? 0 : moderateScale(5, 0.1),
            },
          ]}>
          <View style={[s.options]}>
            <Menu
              borderWidth={moderateScale(1, 0.1)}
              borderColor={'grey'}
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
                  msgDlt(elem?.item?.id);
                }}>
                <View style={s.optionView}>
                  <Antdesign
                    name={'delete'}
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
        {status ? (
          <View
            style={[
              s.dp,
              {
                borderColor: getColor(
                  !status ? backendUser?.group : userData?.group,
                ),
              },
            ]}>
            <Image
              source={{
                uri: !status
                  ? backendUser?.image
                    ? backendUser?.image
                    : dummyImage
                  : userData?.image
                  ? userData?.image
                  : dummyImage,
              }}
              style={s.dp1}
              resizeMode={'cover'}
            />
          </View>
        ) : null}
      </View>
    );
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: color}}>
      <View style={[s.container, {backgroundColor: color}]}>
        <View style={s.header}>
          <TouchableOpacity
            style={{flex: 0.1}}
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'Message'}],
                }),
              );
            }}>
            <Inicon
              name="arrow-back-circle-outline"
              size={moderateScale(30)}
              color={textColor}
            />
          </TouchableOpacity>
          <View style={s.card}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ViewUser', {
                  screen: 'search',
                  post: {id: backendUser?.id},
                });
              }}
              style={[
                s.dp,
                {
                  marginHorizontal: moderateScale(10, 0.1),
                  borderColor: getColor(backendUser?.group),
                },
              ]}>
              <Image
                source={{
                  uri: backendUser?.image ? backendUser?.image : dummyImage,
                }}
                style={s.dp1}
                resizeMode={'cover'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ViewUser', {
                  screen: 'search',
                  post: {id: backendUser?.id},
                })
              }>
              <Text style={[s.name, {color: textColor}]}>
                {backendUser?.name + ' ' + backendUser?.last_name}
              </Text>
              <Text style={[s.name, {color: textColor}]}>
                {online
                  ? 'online'
                  : `Last seen ${
                      formatTimestamp(backendUser?.date_login)
                        ? formatTimestamp(backendUser?.date_login)
                        : formatTimestamp(new Date())
                    }`}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[s.options]}>
            <Menu
              borderWidth={moderateScale(1, 0.1)}
              borderColor={'grey'}
              backgroundColor={color}
              marginLeft={moderateScale(9, 0.1)}
              marginRight={moderateScale(9, 0.1)}
              marginTop={moderateScale(25, 0.1)}
              closeOnSelect={true}
              trigger={triggerProps => {
                return (
                  <Pressable
                    accessibilityLabel="More options menu"
                    {...triggerProps}>
                    <Entypo
                      name={'dots-three-vertical'}
                      color={textColor}
                      size={moderateScale(15, 0.1)}
                    />
                  </Pressable>
                );
              }}>
              <Menu.Item
                onPress={() => {
                  chatDlt();
                }}>
                <TouchableOpacity
                  onPress={() => {
                    chatDlt();
                  }}
                  style={s.optionView}>
                  <MaterialCIcons
                    name={'delete-forever'}
                    color={textColor}
                    size={moderateScale(13, 0.1)}
                    style={{flex: 0.4}}
                  />
                  <Text style={[s.optionBtns, {color: textColor}]}>
                    Clear chat
                  </Text>
                </TouchableOpacity>
              </Menu.Item>
            </Menu>
          </View>
        </View>
        <View style={s.chat}>
          <FlatList
            inverted
            contentContainerStyle={{flexDirection: 'column-reverse'}}
            data={chatMessages}
            renderItem={renderItem}
            key={(e, i) => i}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="never"
            showsVerticalScrollIndicator={true}
          />
        </View>
      </View>
      <View style={[s.messageInput, {backgroundColor: color}]}>
        <View style={s.input}>
          <View style={s.circle}>
            <Icon2
              name={'email'}
              color={'#8F8A8A'}
              solid
              size={moderateScale(20, 0.1)}
            />
          </View>
          <View style={s.inputText}>
            <Input
              w={'100%'}
              variant="unstyled"
              placeholderTextColor={'#fff'}
              color={'#fff'}
              placeholder="Type Message"
              value={message}
              multiline
              flexWrap={'wrap'}
              maxHeight={60}
              onChangeText={text => setMessage(text)}
            />
          </View>
        </View>
        <View style={s.sendBtn}>
          <TouchableOpacity onPress={() => handleNewMessage()} style={s.circle}>
            <Inicon
              name={'md-send'}
              color={'#8F8A8A'}
              size={moderateScale(20, 0.1)}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;

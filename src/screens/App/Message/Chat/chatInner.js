import {
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  FlatList,
  Keyboard,
} from 'react-native';
// const {v4: uuidv4} = require('uuid');
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import Inicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Input, FormControl, Button, Menu, Pressable} from 'native-base';
import socket from '../../../../utils/socket';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Antdesign from 'react-native-vector-icons/AntDesign';
import axiosconfig from '../../../../Providers/axios';
import Loader from '../../../../Components/Loader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Chat = ({navigation, route}) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const [refresh, setRefresh] = useState(true);
  const users = useSelector(state => state.reducer.users);
  const [loader, setLoader] = useState(false);
  const [msg, setMsg] = useState([]);
  const [input, setInput] = useState('');
  const userToken = useSelector(state => state.reducer.userToken);

  console.log('route data', route?.params);
  const dispatch = useDispatch();
  const theme = useSelector(state => state.reducer.theme);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const {username, userID} = route.params;
  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      const id = await AsyncStorage.getItem('id');
      if (value) {
        setUser(value);
      }
      if (id) {
        setUserId(id);
      }
    } catch (e) {
      console.error('Error while loading username!');
    }
  };
  useEffect(() => {
    getUsername();
  }, [userId]);
  const handleNewMessage = async () => {
    console.log('abc');
    // storeMsg();
    Keyboard.dismiss();
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;
    let content = message;
    socket.emit('message', {
      // id: uuidv4(),
      content,
      to: route?.params?.sender_user?.id
        ? route?.params?.sender_user?.id
        : route?.params?.id,
      timestamp: {hour, mins},
      from: userId,
    });
    setMessage('');
  };

  useEffect(() => {
    const recieverId = route.params.sender_user?.id
      ? route.params.sender_user?.id
      : route.params?.id;
    const handleReceiveMessage = data => {
      const time = data.timestamp.hour + ':' + data.timestamp.mins;
      if (data.to === userId && data.from === recieverId) {
        setChatMessages(chatMessages => [
          {
            message: data.content,
            time: time,
            from: recieverId,
            to: userId,
            fromSelf: false,
          },
          ...chatMessages,
        ]);
      } else if (data.to === recieverId && data.from === userId) {
        setChatMessages(chatMessages => [
          {
            message: data.content,
            time: time,
            from: userId,
            to: recieverId,
            fromSelf: true,
          },
          ...chatMessages,
        ]);
      }
      console.log('from', 'useriDsss', userId, chatMessages);
    };

    socket.on('message', handleReceiveMessage);

    return () => {
      socket.off('message', handleReceiveMessage);
    };
  }, [chatMessages]);
  const storeMsg = async () => {
    var data = {
      text: message,
      id: route.params.id,
    };
    await axiosconfig
      .post(`message_store`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(res => {
        console.log('data', res.data);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.log(err);
      });
  };
  const msgDlt = async () => {
    await axiosconfig
      .delete(`message_delete/${route.params.id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(res => {
        console.log('data', res.data);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.log(err);
      });
  };
  const chatDlt = async () => {
    console.log('chat dlt');
    await axiosconfig
      .delete(`clear_chat/${route.params.id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(res => {
        console.log('data', res.data);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.log(err);
      });
  };
  const sendMessage = () => {
    socket.emit('chat message');
  };
  const renderItem = elem => {
    const status = elem?.item?.fromSelf;

    return (
      <View
        style={[
          s.messege,
          {justifyContent: status ? 'flex-end' : 'flex-start'},
        ]}
        key={elem.index}>
        {!status ? (
          <View style={[s.dp]}>
            <Image
              source={{
                uri: !status
                  ? route?.params?.sender_user?.image
                  : route?.params?.sender_user?.image
                  ? route?.params?.sender_user?.image
                  : route?.params?.image,
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
              marginRight: moderateScale(10, 0.1),
            },
          ]}>
          <View style={[s.options]}>
            <Menu
              w="150"
              borderWidth={moderateScale(1, 0.1)}
              borderColor={'grey'}
              backgroundColor={color}
              marginRight={moderateScale(15, 0.1)}
              marginTop={moderateScale(25, 0.1)}
              closeOnSelect={true}
              trigger={triggerProps => {
                return (
                  <Pressable
                    // onLongPress={}
                    accessibilityLabel="More options menu"
                    {...triggerProps}
                    style={{
                      flexDirection: 'row',
                      right: moderateScale(8, 0.1),
                    }}>
                    <View style={status ? s.textFrom : s.textTo}>
                      <Text style={s.textSmall1}>{elem?.item?.message}</Text>
                      <Text style={[s.textSmall1, {textAlign: 'right'}]}>
                        {/* time */}
                        {elem?.item?.time?.toLocaleString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}>
              <Menu.Item
                onPress={() => {
                  console.log('unsend');
                }}>
                <View style={s.optionView}>
                  <MaterialIcons
                    name={'cancel-schedule-send'}
                    color={textColor}
                    size={moderateScale(13, 0.1)}
                    // style={{marginRight: moderateScale(10, 0.1)}}
                    style={{flex: 0.3}}
                  />
                  <Text style={[s.optionBtns, {color: textColor}]}>Unsend</Text>
                </View>
              </Menu.Item>
              <Menu.Item
                onPress={() => {
                  console.log('reply');
                }}>
                <View style={s.optionView}>
                  <MaterialIcons
                    name={'reply'}
                    color={textColor}
                    size={moderateScale(13, 0.1)}
                    style={{flex: 0.3}}
                  />
                  <Text style={[s.optionBtns, {color: textColor}]}>Reply</Text>
                </View>
              </Menu.Item>

              <Menu.Item
                onPress={() => {
                  console.log('delete');
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

              <Menu.Item
                onPress={() => {
                  console.log('Block');
                }}>
                <View style={s.optionView}>
                  <MaterialIcons
                    name={'block'}
                    color="red"
                    size={moderateScale(13, 0.1)}
                    style={{flex: 0.3}}
                  />
                  <Text style={[s.optionBtns]}>Block</Text>
                </View>
              </Menu.Item>
            </Menu>
          </View>
        </View>
        {status ? (
          <View style={[s.dp]}>
            <Image
              source={{
                uri: !status
                  ? route?.params?.sender_user?.image
                  : route?.params?.sender_user?.image
                  ? route?.params?.sender_user?.image
                  : route?.params?.image,
              }}
              style={s.dp1}
              resizeMode={'cover'}
            />
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: color}}>
      <View style={[s.container, {backgroundColor: color}]}>
        <View style={s.header}>
          <TouchableOpacity
            style={{flex: 0.1}}
            onPress={() => navigation.goBack()}>
            <Inicon
              name="arrow-back-circle-outline"
              size={moderateScale(30)}
              color={textColor}
            />
          </TouchableOpacity>
          <View style={s.card}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ViewUser');
              }}
              style={s.dp}>
              <Image
                source={{
                  uri: route?.params?.sender_user?.image
                    ? route?.params?.sender_user?.image
                    : route.params?.image,
                }}
                style={s.dp1}
                resizeMode={'cover'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ViewUser')}>
              <Text style={[s.name, {color: textColor}]}>
                {(route?.params?.sender_user?.name
                  ? route?.params?.sender_user?.name
                  : route.params?.name) + ' '}
                {route?.params?.sender_user?.last_name
                  ? route?.params?.sender_user?.last_name
                  : route?.params?.last_name}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[s.options]}>
            <Menu
              w="130"
              borderWidth={moderateScale(1, 0.1)}
              borderColor={'grey'}
              backgroundColor={color}
              marginLeft={moderateScale(9, 0.1)}
              marginTop={moderateScale(25, 0.1)}
              closeOnSelect={true}
              trigger={triggerProps => {
                return (
                  <Pressable
                    accessibilityLabel="More options menu"
                    {...triggerProps}
                    style={
                      {
                        // flexDirection: 'row',
                        // right: moderateScale(8, 0.1),
                      }
                    }>
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
                <View style={s.optionView}>
                  <Text style={[s.optionBtns, {color: textColor}]}>
                    clear chat
                  </Text>
                </View>
              </Menu.Item>
              <Menu.Item
                onPress={() => {
                  // hide(elem?.item?.id);
                }}>
                <View style={s.optionView}>
                  <Text style={[s.optionBtns, {color: textColor}]}>Hide</Text>
                </View>
              </Menu.Item>
            </Menu>
          </View>
          {/* <TouchableOpacity style={s.options}>
            <Entypo
              name={'dots-three-vertical'}
              color={textColor}
              size={moderateScale(15, 0.1)}
            />
          </TouchableOpacity> */}
        </View>
        <View style={s.chat}>
          <FlatList
            inverted
            data={chatMessages}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps={false}
            showsVerticalScrollIndicator={true}
          />
        </View>
      </View>
      <View style={s.messageInput}>
        <View style={s.input}>
          <TouchableOpacity style={s.circle}>
            <Icon
              name={'smile'}
              color={'#8F8A8A'}
              solid
              size={moderateScale(20, 0.1)}
            />
          </TouchableOpacity>
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

          <TouchableOpacity style={s.attach}>
            <Entypo
              name={'attachment'}
              color={'#8F8A8A'}
              size={moderateScale(20, 0.1)}
            />
          </TouchableOpacity>
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
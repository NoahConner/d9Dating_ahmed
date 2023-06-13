import {TouchableOpacity, Text, SafeAreaView, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import s from './style';
import {FlatList} from 'react-native';
import {ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosconfig from '../../../Providers/axios';
import firebase from 'firebase/app';
import firestore from '@react-native-firebase/firestore';
import {AppContext, useAppContext} from '../../../Context/AppContext';
import {theme} from '../../../Constants/Index';

const Message = ({navigation}) => {
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const {token} = useAppContext(AppContext);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [id, setid] = useState(null);

  const getAllUsers = async () => {};
  const getData = async () => {};
  useEffect(() => {
    getId();
    getAllUsers();
  }, []);

  useEffect(() => {}, []);

  const getId = async () => {
    let SP = await AsyncStorage.getItem('id');
    setid(SP);
  };

  function onChatPress(otherUser) {
    const chatId = firestore().collection('chat').push().key;

    const newChat = {
      participants: {
        [id]: true,
        [otherUser.uid]: true,
      },
      messages: [],
    };

    firebase.database().ref(`chats/${chatId}`).set(newChat);

    navigation.navigate('ChatRoom', {chatId, currentUser, otherUser});
  }
  const renderItem = (elem, i) => {
    if (elem.item.id != id) {
      return (
        <View style={s.card}>
          <TouchableOpacity
            onPress={() => {
              const chatId = firestore().collection('chat').push().key;
              const user = elem.item.id;
              const newChat = {
                participants: {
                  [id]: true,
                  [elem.item.id]: true,
                },
                messages: [],
              };

              firestore().collection(`chat/${chatId}`).set(newChat);

              navigation.navigate('ViewUser', {chatId, id, user});
            }}
            style={s.dp}>
            <Image
              source={{uri: 'https://placeimg.com/140/140/people'}}
              style={s.dp1}
              resizeMode={'cover'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('InnerChat', {
                id: elem.item.id,
                name: elem.item.name,
              })
            }
            style={[s.col, {flex: 0.6, justifyContent: 'flex-end'}]}>
            <View>
              <Text style={[s.name, s.nameBold, {color: textColor}]}>
                {elem?.item?.name}
              </Text>
            </View>
            <Text style={[s.textSmall, {color: '#787878'}]}>{'hello'}</Text>
          </TouchableOpacity>
          <View style={s.time}>
            <Text style={[s.textRegular, {color: textColor}]}>{'10:55'}</Text>
          </View>
        </View>
      );
    } else {
      null;
    }
  };
  return (
    <SafeAreaView style={{display: 'flex', flex: 1}}>
      <ScrollView
        contentContainerStyle={[s.container, {backgroundColor: color}]}>
        <View>
          <Text style={[s.HeadingText, {color: textColor}]}>Messages</Text>
        </View>
        <View style={[s.border, {borderBottomColor: textColor}]}>
          <TouchableOpacity style={s.btn}>
            <Text style={[s.chats, {color: textColor}]}>Chats</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          scrollEnabled={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Message;

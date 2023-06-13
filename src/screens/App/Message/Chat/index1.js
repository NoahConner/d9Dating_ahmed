import {
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import Inicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Input, FormControl, Button} from 'native-base';
import socket from '../../../../utils/socket';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {theme} from '../../../../Constants/Index';

const Chat = ({navigation, route}) => {
  const [msg, setMsg] = useState([]);
  const [input, setInput] = useState('');
  const data = route?.params;
  const [text, setText] = useState([]);

  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const uid = route.params.id;

  const renderItem = elem => {
    if (elem?.item.to === uid) {
      return (
        <View
          style={[s.messege, {justifyContent: 'flex-end'}]}
          key={elem.index}>
          <View
            style={[
              {
                maxWidth: '80%',
                marginRight: moderateScale(10, 0.1),
              },
            ]}>
            <View style={s.textFrom}>
              <Text style={s.textSmall1}>{elem.item.text}</Text>
              <Text style={[s.textSmall1, {textAlign: 'right'}]}>
                {elem.item.time.toLocaleString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </View>
          <View style={[s.dp]}>
            <Image
              source={{uri: elem.item.avatar}}
              style={s.dp1}
              resizeMode={'cover'}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={[s.messege, {justifyContent: 'flex-start'}]}
          key={elem.index}>
          <View style={[s.dp]}>
            <Image
              source={{uri: elem.item.avatar}}
              style={s.dp1}
              resizeMode={'cover'}
            />
          </View>
          <View
            style={[
              {
                maxWidth: '80%',
                marginRight: moderateScale(10, 0.1),
              },
            ]}>
            <View style={s.textTo}>
              <Text style={s.textSmall1}>{elem.item.text}</Text>
              <Text style={[s.textSmall1, {textAlign: 'right'}]}>
                {elem.item.time.toLocaleString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </View>
        </View>
      );
    }
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
                source={messages[0].userImage}
                style={s.dp1}
                resizeMode={'cover'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ViewUser')}>
              <Text style={[s.name, {color: textColor}]}>
                {messages[0].from}
              </Text>

              <Text style={s.textSmall}>Last Seen 5:52 PM</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={s.options}>
            <Entypo
              name={'dots-three-vertical'}
              color={textColor}
              size={moderateScale(15, 0.1)}
            />
          </TouchableOpacity>
        </View>
        <View style={s.chat}>
          <FlatList
            data={msg}
            renderItem={renderItem}
            keyExtractor={(item, index) => String(index)}
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
              w={'80%'}
              variant="unstyled"
              placeholderTextColor={'#fff'}
              color={'#fff'}
              placeholder="Type Message"
              value={input}
              onChangeText={text => setInput(text)}
              size="md"
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
          <TouchableOpacity onPress={() => sendMessage()} style={s.circle}>
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

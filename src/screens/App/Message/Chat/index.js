import {
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import Inicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Input, FormControl, Button} from 'native-base';
import io from 'socket.io-client';
import {theme} from '../../../../Constants/Index';
const messages = [
  {
    uid: 2,
    from: 'Julie Watson',
    to: '',
    date: '',
    text: ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
    userImage: require('../../../../assets/images/png/u2.png'),
  },
  {
    uid: 1,
    from: 'Julie Watson',
    to: '',
    date: '',
    text: ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
    userImage: require('../../../../assets/images/png/mydp.png'),
  },
  {
    uid: 2,
    from: 'Julie Watson',
    to: '',
    date: '',
    text: ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
    userImage: require('../../../../assets/images/png/u2.png'),
  },
  {
    uid: 1,
    from: 'Julie Watson',
    to: '',
    date: '',
    text: ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
    userImage: require('../../../../assets/images/png/mydp.png'),
  },
  {
    uid: 2,
    from: 'Julie Watson',
    to: '',
    date: '',
    text: ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
    userImage: require('../../../../assets/images/png/u2.png'),
  },
  {
    uid: 1,
    from: 'Julie Watson',
    to: '',
    date: '',
    text: ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.',
    userImage: require('../../../../assets/images/png/mydp.png'),
  },
];

const elem = {
  from: 'Julie Watson',
  text: 'Welcome',
  time: 'Now',
  userImage: require('../../../../assets/images/png/u6.png'),
};

const Chat = ({navigation, route}) => {
  console.log(route.params);
  const data = route?.params;
  const [text, setText] = useState(null);

  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const uid = 1;

  const RenderItem = () => {
    return (
      <View style={s.card}>
        <View style={s.dp}>
          <Image source={data?.userImage} style={s.dp1} resizeMode={'cover'} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Chat')}
          style={[s.col, {flex: 0.6, justifyContent: 'flex-end'}]}>
          <View>
            <Text style={[s.name, s.nameBold, {color: textColor}]}>
              {data?.from}
            </Text>
          </View>
          <Text style={s.textSmall}>{elem?.item?.text}</Text>
        </TouchableOpacity>
        <View style={s.time}>
          <Text style={[s.textRegular, {color: textColor}]}>
            {elem?.item?.time}
          </Text>
        </View>
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
        <ScrollView contentContainerStyle={[s.chatContainer]}>
          {messages.map((elem, i) => {
            console.log(elem);
            if (elem?.uid === uid) {
              return (
                <View style={s.messege} key={i}>
                  <View
                    style={[
                      s.text,
                      {
                        flex: 0.8,
                        backgroundColor: '#333232',
                        marginRight: moderateScale(10, 0.1),
                      },
                    ]}>
                    <Text style={s.userName}>
                      {elem?.from}
                      <Text style={s.textSmall1}>{elem?.text}</Text>
                    </Text>
                  </View>
                  <View style={[s.dp, {flex: 0.2}]}>
                    <Image
                      source={elem?.userImage}
                      style={s.dp1}
                      resizeMode={'cover'}
                    />
                  </View>
                </View>
              );
            } else {
              return (
                <View style={s.messege} key={i}>
                  <View style={[s.dp, {flex: 0.2}]}>
                    <Image
                      source={elem?.userImage}
                      style={s.dp1}
                      resizeMode={'cover'}
                    />
                  </View>
                  <View style={[s.text, {flex: 0.8}]}>
                    <Text style={s.userName}>
                      {elem?.from}
                      <Text style={s.textSmall1}>{elem?.text}</Text>
                    </Text>
                  </View>
                </View>
              );
            }
          })}
        </ScrollView>
      </View>
      <View style={[s.row, {backgroundColor: color}]}>
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
              onChangeText={v => setText(v)}
              value={text}
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
          <TouchableOpacity
            onPress={() => {
              setText('');
              Keyboard.dismiss();
            }}
            style={s.circle}>
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

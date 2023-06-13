import {
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';

import {moderateScale} from 'react-native-size-matters';
import s from './style';
import Header from '../../../Components/Header';
import {FlatList} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Inicon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';
import {theme} from '../../../Constants/Index';
const messages = [
  {
    from: 'Julie Watson',
    text: 'Awesome',
    time: 'Now',
    userImage: require('../../../assets/images/png/mydp.png'),
  },
  {
    from: 'John Smith',
    text: 'Sent a Voice Message',
    time: '10:00pm',
    userImage: require('../../../assets/images/png/u7.png'),
  },
  {
    from: 'Julie Watson',
    text: 'Thanks a lot',
    time: 'Friday',
    userImage: require('../../../assets/images/png/u1.png'),
  },
  {
    from: 'Julie Watson',
    text: 'Are You Busy',
    time: 'Monday',
    userImage: require('../../../assets/images/png/u2.png'),
  },
  {
    from: 'John Smith',
    text: 'Nice',
    time: 'Last Week',
    userImage: require('../../../assets/images/png/u4.png'),
  },
  {
    from: 'John Smith',
    text: 'Lunch Today',
    time: 'Last Week',
    userImage: require('../../../assets/images/png/u5.png'),
  },
  {
    from: 'Julie Watson',
    text: 'Welcome',
    time: 'Now',
    userImage: require('../../../assets/images/png/u6.png'),
  },
  {
    from: 'John Smith',
    text: 'Lunch Today',
    time: 'Last Week',
    userImage: require('../../../assets/images/png/u5.png'),
  },
  {
    from: 'Julie Watson',
    text: 'Welcome',
    time: 'Now',
    userImage: require('../../../assets/images/png/u6.png'),
  },
];
const Message = ({navigation}) => {
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';

  useEffect(() => {}, []);

  const renderItem = (elem, i) => {
    return (
      <View style={s.card}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ViewUser');
          }}
          style={s.dp}>
          <Image
            source={elem.item.userImage}
            style={s.dp1}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Chat', elem.item)}
          style={[s.col, {flex: 0.6, justifyContent: 'flex-end'}]}>
          <View>
            <Text style={[s.name, s.nameBold, {color: textColor}]}>
              {elem?.item?.from}
            </Text>
          </View>
          <Text style={[s.textSmall, {color: '#787878'}]}>
            {elem?.item?.text}
          </Text>
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
    <SafeAreaView style={{display: 'flex', flex: 1}}>
      {/* <Header /> */}
      <ScrollView
        contentContainerStyle={[s.container, {backgroundColor: color}]}>
        <View
          style={{
            marginLeft: moderateScale(-5, 0.1),
            marginVertical: moderateScale(10, 0.1),
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() => navigation.goBack('')}>
            <Inicon
              name="arrow-back-circle-outline"
              size={moderateScale(30)}
              color={textColor}
            />
          </TouchableOpacity>
          <Text style={[s.HeadingText, {color: textColor}]}>Messages</Text>
        </View>
        <View style={[s.border, {borderBottomColor: textColor}]}>
          <TouchableOpacity style={s.btn}>
            <Text style={[s.chats, {color: textColor}]}>Chats</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={s.btn}>
            <Text style={[s.chats, {color: textColor}]}>Stories</Text>
          </TouchableOpacity> */}
        </View>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(e, i) => i.toString()}
          scrollEnabled={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Message;

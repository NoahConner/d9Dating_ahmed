import {Input} from 'native-base';
import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  Pressable,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {moderateScale} from 'react-native-size-matters';
import Inicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {dummyImage, getColor, theme} from '../Constants/Index';
import Entypo from 'react-native-vector-icons/Entypo';
const Poppins = '';
const PoppinsBold = '';
const Users = [
  {
    id: 1,
    from: 'Julie Watson',
    text: 'Awesome',
    time: 'Now',
    userImage: require('../assets/images/png/mydp.png'),
  },
  {
    id: 2,
    from: 'John Smith',
    text: 'Sent a Voice Message',
    time: '10:00pm',
    userImage: require('../assets/images/png/u7.png'),
  },
  {
    id: 3,
    from: 'Ema Watson',
    text: 'Thanks a lot',
    time: 'Friday',
    userImage: require('../assets/images/png/u1.png'),
  },
  {
    id: 4,
    from: 'Emily',
    text: 'Are You Busy',
    time: 'Monday',
    userImage: require('../assets/images/png/u2.png'),
  },
  {
    id: 5,
    from: 'Hoju',
    text: 'Nice',
    time: 'Last Week',
    userImage: require('../assets/images/png/u4.png'),
  },
  {
    id: 6,
    from: 'Bran derin',
    text: 'Lunch Today',
    time: 'Last Week',
    userImage: require('../assets/images/png/u5.png'),
  },
  {
    id: 7,
    from: 'John Shaw',
    text: 'Welcome',
    time: 'Now',
    userImage: require('../assets/images/png/u6.png'),
  },
  {
    id: 8,
    from: 'Britney',
    text: 'Lunch Today',
    time: 'Last Week',
    userImage: require('../assets/images/png/u5.png'),
  },
  {
    id: 9,
    from: 'Andrew',
    text: 'Welcome',
    time: 'Now',
    userImage: require('../assets/images/png/u6.png'),
  },
];

const SearchListModal = ({
  visible,
  setVisible,
  navigation,
  clear,
  filtered,
}) => {
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [searchText, setSearchText] = useState('');

  const searchItem = (elem, i) => {
    const {name, last_name, address, organization, image, id, blocked_by} =
      elem.item;
    if (blocked_by) {
      return null;
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ViewUser', {id: id});
            setVisible(false);
            clear();
          }}
          style={styles.card}>
          <View style={[styles.dp, {borderColor: getColor(organization)}]}>
            <Image
              source={{uri: image ? image : dummyImage}}
              style={styles.dp1}
              resizeMode={'cover'}
            />
          </View>
          <View style={styles.details}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ViewUser', {id: id});
                setVisible(false);
                clear();
              }}>
              <Text style={[styles.name, styles.nameBold, {color: textColor}]}>
                {name} {last_name}
              </Text>
              <Text
                style={[styles.textRegular, styles.nameBold, {color: 'grey'}]}>
                {address}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={[styles.modalView, {backgroundColor: color}]}>
      {filtered?.length == 0 ? (
        <View style={styles.empty}>
          <Text
            style={[
              styles.name,
              styles.nameBold,
              {
                color: textColor,
                textAlign: 'center',
                marginVertical: moderateScale(40, 0.1),
              },
            ]}>
            No Users Found
          </Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={filtered}
            renderItem={searchItem}
            keyExtractor={(item, index) => String(index)}
            scrollEnabled={true}
          />
        </View>
      )}
    </View>
  );
};

export default SearchListModal;

const styles = StyleSheet.create({
  empty: {
    marginHorizontal: moderateScale(10, 0.1),
  },
  modalView: {
    width: '100%',
    paddingHorizontal: moderateScale(20, 0.1),
  },

  card: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: moderateScale(10, 0.1),
    marginBottom: moderateScale(10, 0.1),
    borderBottomColor: 'grey',
    alignItems: 'center',
  },
  name: {
    fontSize: moderateScale(15, 0.1),
    fontWeight: 'bold',
    lineHeight: moderateScale(22, 0.1),
  },
  textRegular: {
    fontSize: moderateScale(11, 0.1),
    lineHeight: moderateScale(14, 0.1),
    marginVertical: moderateScale(5, 0.1),
  },
  textSmall: {
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(12, 0.1),
    marginVertical: moderateScale(5, 0.1),
    color: '#787878',
  },
  dp1: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(53 / 2, 0.1),
  },
  img: {
    width: '100%',
  },
  dp: {
    width: moderateScale(55, 0.1),
    height: moderateScale(55, 0.1),
    borderRadius: moderateScale(55 / 2, 0.1),
    marginRight: moderateScale(20, 0.1),
    borderWidth: 2,
  },
});

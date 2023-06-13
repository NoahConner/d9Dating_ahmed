import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import axiosconfig from '../../../../Providers/axios';
import s from './style';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header, Loader} from '../../../../Components/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {dummyImage, getColor} from '../../../../Constants/Index';
import {theme} from '../../../../Constants/Index';

const userList = [
  {
    about_me: null,
    created_at: '2023-06-06T15:00:12.000000Z',
    date: '6/06/2005',
    date_login: '2023-06-06 16:27:20',
    device_token:
      'cydbRyXrTIac1T9wDKRogG:APA91bHyxSBNXeF7BxouxNc4vAij97kttA3T59YU-P2a7OYLKz8qUQ86hhfAeZfTpnnZgnZqh4NF-2c0paAALe56Sifx7oHDfdjU3h_E_aQokQyVojmPRzsvYDX_8nKs-w-I02bfuRHc',
    email: 'aina@designprosuk.com',
    email_verified_at: null,
    gender: 'Female',
    group: 'Alpha Phi Alpha Fraternity, Inc.',
    id: 4,
    image: null,
    last_name: 'James',
    location: 'C P West Manhattan',
    month: null,
    name: 'Aina',
    notify: '0',
    otp: '3117',
    phone_number: '+1',
    post_privacy: '1',
    privacy_option: '1',
    status: '1',
    story_privacy: '00000000001',
    theme_mode: null,
    updated_at: '2023-06-06T16:27:20.000000Z',
    year: null,
  },
  {
    about_me: null,
    created_at: '2023-06-06T13:27:38.000000Z',
    date: '6/06/1992',
    date_login: '2023-06-06 15:17:51',
    device_token:
      'eHTkJdeDSb6FLKT_p7zLif:APA91bGcmu4pjgLJ4kNHDQ-50aaz0g42T1tuZQgFamW0K9yDuyczmxdkaQIu-xs2uyO0hhVUtZPzlCFZvrbR8SKsm18Ww_BsrVjziQzaMhCstjKjD6LFUOeHb475GJDonqNj1GOeQ3mN',
    email: 'e.stone@designprosusa.com',
    email_verified_at: null,
    gender: 'Male',
    group: 'Omega Psi Phi Fraternity, Inc.',
    id: 3,
    image: null,
    last_name: 'Me',
    location: 'London Greater London',
    month: null,
    name: 'Tester',
    notify: '0',
    otp: '2360',
    phone_number: '+1',
    post_privacy: '1',
    privacy_option: '1',
    status: '1',
    story_privacy: '00000000001',
    theme_mode: null,
    updated_at: '2023-06-06T15:17:51.000000Z',
    year: null,
  },
  {
    about_me: null,
    created_at: '2023-06-06T12:21:34.000000Z',
    date: '6/06/2005',
    date_login: '2023-06-07 07:33:48',
    device_token:
      'cjpfF71SSfek0x-BdoI8w3:APA91bHe5BAFrEZ5_hpNF9Cz0z49kkXDoIeUiOcz5o87DP2Y-QtLaPk0XPpQGjBNgs2bM6fdiQZQJkOF3vmzJIRgbp5GPz6Ra0EqFu0p9kCUcPvyI_OfAKsXT3qUVK28tWM0Es1an1Sr',
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
    updated_at: '2023-06-07T07:33:48.000000Z',
    year: null,
  },
  {
    about_me: null,
    created_at: '2023-06-02T15:57:20.000000Z',
    date: '6/02/2005',
    date_login: '2023-06-02 15:57:53',
    device_token:
      'eRZHt3GHSpuMFYGrp_fjr-:APA91bHQq4L1AsH0l1TLjxNoEMVvtr2Z_HzvwrKNcP96E5RFncOKyL7-HQlY1S_jGj9lxR-IpMzIH1-y1r2TnxlW1kKlINIRIC1s_pbiI3KOD-U6fuk8dVW48z1VvBxP8FjDaMz8X6O4',
    email: 'dominicxavier143@gmail.com',
    email_verified_at: null,
    gender: 'Male',
    group: 'Zeta Phi Beta Sorority Inc.',
    id: 1,
    image: null,
    last_name: 'Xavier',
    location: 'London Greater London',
    month: null,
    name: 'Dominic',
    notify: '0',
    otp: '5347',
    phone_number: '+1',
    post_privacy: '1',
    privacy_option: '1',
    status: '1',
    story_privacy: '00000000001',
    theme_mode: null,
    updated_at: '2023-06-02T15:57:53.000000Z',
    year: null,
  },
];
const Likes = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const {token} = useAppContext(AppContext);
  const [data, setData] = useState(route?.params?.data);
  const isFocused = useIsFocused();
  const [userID, setUserID] = useState('');

  const [friends, setFriends] = useState([]);
  const [userData, setUserData] = useState('');

  useEffect(() => {
    getID();
    getAllUsers();
  }, []);

  const getID = async () => {
    const id = await AsyncStorage.getItem('id');
    setUserID(id);
  };

  const getAllUsers = async () => {
    setFriends(userList);
  };

  const renderItem = (elem, i) => {
    return (
      <View style={s.card}>
        <View style={[s.dp, {borderColor: getColor(elem?.item?.group)}]}>
          <Image
            source={{
              uri: elem?.item?.users?.image
                ? elem?.item?.users?.image
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
              post: {id: elem?.item?.users?.id},
            });
          }}
          style={{alignSelf: 'center'}}>
          <View>
            <View
              style={{flexDirection: 'column', width: moderateScale(200, 0.1)}}>
              <Text style={[s.name, s.nameBold, {color: textColor}]}>
                {elem?.item?.users?.name} {elem?.item?.users?.last_name}
              </Text>
              {/* <Text style={[s.textSmall, {color: 'grey'}]}>
                {elem?.item?.users?.location}
              </Text> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: color}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.4}}>
          <Header navigation={navigation} />
        </View>
        <View style={{flex: 0.6, justifyContent: 'center'}}>
          <Text style={[s.HeadingText, {color: textColor}]}>Likes</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={[s.container, {backgroundColor: color}]}>
        {data.length > 0 ? (
          <>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => String(index)}
              scrollEnabled={true}
            />
          </>
        ) : (
          <>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{fontSize: moderateScale(16, 0.1), color: textColor}}>
                No blocked Users
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Likes;

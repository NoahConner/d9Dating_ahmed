import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import {Menu, Pressable} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosconfig from '../../../../provider/axios';
import {useIsFocused} from '@react-navigation/native';
import {Header, Loader} from '../../../../Components/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {dummyImage, getColor} from '../../../../Constants/Index';
import moment from 'moment';
import {theme} from '../../../../Constants/Index';

const hiddenPostDummy = [
  {
    action: '0',
    caption: 'public post',
    created_at: '2023-06-07T06:59:09.000000Z',
    id: 4,
    image:
      'https://designprosusa.com/the_night/storage/app/1686121149base64_image.png',
    location: 'Dufferin St London',
    post_comments: [[Object], [Object], [Object]],
    post_likes: [[Object]],
    privacy_option: '1',
    status: '1',
    updated_at: '2023-06-07T06:59:09.000000Z',
    user: {
      about_me: null,
      created_at: '2023-06-06T12:21:34.000000Z',
      date: '6/06/2005',
      date_login: '2023-06-07 07:27:08',
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
      updated_at: '2023-06-07T07:29:02.000000Z',
      year: null,
    },
    user_id: '2',
  },
  {
    action: '0',
    caption: 'first post',
    created_at: '2023-06-07T06:12:34.000000Z',
    id: 3,
    image:
      'https://designprosusa.com/the_night/storage/app/1686118354base64_image.png',
    location: '14 Red Lion Square',
    post_comments: [],
    post_likes: [],
    privacy_option: '1',
    status: '1',
    updated_at: '2023-06-07T06:12:34.000000Z',
    user: {
      about_me: null,
      created_at: '2023-06-06T12:21:34.000000Z',
      date: '6/06/2005',
      date_login: '2023-06-07 07:27:08',
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
      updated_at: '2023-06-07T07:29:02.000000Z',
      year: null,
    },
    user_id: '2',
  },
];
const Likes = [
  {
    created_at: '2023-06-07T07:01:22.000000Z',
    group: 'Omega Psi Phi Fraternity, Inc.',
    id: 3,
    image: null,
    location: '2020 Amphitheatre Pkwy, Mountain View, CA 94043, USA',
    post_id: '4',
    status: '1',
    updated_at: '2023-06-07T07:01:22.000000Z',
    user_id: '2',
    user_name: 'Emily',
    users: {
      about_me: 'my about info',
      created_at: '2023-06-06T12:21:34.000000Z',
      date: '6/06/2005',
      date_login: '2023-06-07 10:57:12',
      device_token:
        'fZYK_18WRRCK7bRQlIS0KC:APA91bEzzPVuCC0Jx-GbQA81cX8nfRgGQrhVDvpaphQxSBMLX2DSZj618DzwnKyAk9srilIQ4L6RtdpAYFGzuCMHfC2Y3g2gBbVESvPODUFG-7NzdJVmQA5pNS4ttkRZiKY7KQB_76B1',
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
      updated_at: '2023-06-07T10:57:12.000000Z',
      year: null,
    },
  },
];

const HiddenPosts = ({navigation, route}) => {
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const isFocused = useIsFocused();
  const {token} = useAppContext(AppContext);
  const [hiddenPosts, setHiddenPosts] = useState();
  const [loader, setLoader] = useState(false);
  const [userID, setUserID] = useState('');
  const [userData, setUserData] = useState('');

  useEffect(() => {
    getID();
    getPosts();
  }, []);

  const getID = async () => {
    const id = await AsyncStorage.getItem('id');
    setUserID(id);
  };

  const getPosts = async () => {
    setHiddenPosts(hiddenPostDummy);
  };

  const unhide = async id => {
    getPosts();
  };

  const renderItem = elem => {
    if (elem?.item?.privacy_option == '3' && elem?.item?.user?.id != userID) {
      return;
    }
    let liked = false;
    elem?.item?.post_likes?.forEach(t => {
      if (t?.user_id == userID) {
        liked = true;
      }
    });
    return (
      <View style={s.col}>
        <View style={s.header}>
          <View
            style={[s.dp, {borderColor: getColor(elem?.item?.user?.group)}]}>
            <Image
              source={{
                uri: elem?.item?.user?.image
                  ? elem?.item?.user?.image
                  : dummyImage,
              }}
              style={s.dp1}
              resizeMode={'cover'}
            />
          </View>
          <View style={[s.col, {flex: 0.9, marginTop: moderateScale(5, 0.1)}]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ViewUser', {post: elem.item})
              }>
              <Text style={[s.name, s.nameBold, {color: textColor}]}>
                {elem?.item?.user?.name} {elem?.item?.user?.last_name}
              </Text>
            </TouchableOpacity>
            {elem?.item?.location ? (
              <>
                <Text style={[s.textRegular, {color: textColor}]}>
                  {elem?.item?.location}
                </Text>
              </>
            ) : null}
          </View>
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
                    accessibilityLabel="More options menu"
                    {...triggerProps}
                    style={{
                      flexDirection: 'row',
                      right: moderateScale(8, 0.1),
                    }}>
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
                  unhide(elem?.item?.id);
                }}>
                <View style={s.optionView}>
                  <Icon
                    name={'eye'}
                    color={textColor}
                    size={moderateScale(13, 0.1)}
                    style={{flex: 0.3}}
                  />
                  <Text style={[s.optionBtns, {color: textColor}]}>unhide</Text>
                </View>
              </Menu.Item>
            </Menu>
          </View>
        </View>
        <View style={s.img}>
          <View style={s.img}>
            <Image
              source={{uri: elem?.item?.image}}
              resizeMode={'cover'}
              style={s.galleryImage}></Image>
          </View>
        </View>
        <View style={s.footer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Likes', {data: Likes});
            }}
            style={{marginBottom: moderateScale(5, 0.1)}}>
            {elem?.item?.post_likes?.length ? (
              <Text style={[s.name, {color: textColor}]}>
                {`Liked by Ava Simmon`}
                {elem?.item?.post_likes?.length - 1
                  ? `and ${elem?.item?.post_likes?.length - 1} other`
                  : null}
              </Text>
            ) : null}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: moderateScale(5, 0.1),
            }}>
            <Text style={[s.name, {color: textColor}]}>
              {elem?.item?.user?.name} {elem?.item?.user?.last_name}{' '}
              <Text style={[s.textRegular, {color: textColor}]}>
                {elem?.item?.caption}
              </Text>
            </Text>
          </View>

          <View>
            <Text style={[s.textRegular, {color: 'grey', marginVertical: 0}]}>
              {`${moment(elem?.item?.created_at).fromNow()}`}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: color}}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.1,
          }}>
          <Header navigation={navigation} />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.8,
          }}>
          <Text style={[s.HeadingText, {color: textColor}]}>Hidden Posts</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={[s.container, {backgroundColor: color}]}>
        {hiddenPosts?.length > 0 ? (
          <>
            <FlatList
              data={hiddenPosts}
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
                No Hidden Posts
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default HiddenPosts;

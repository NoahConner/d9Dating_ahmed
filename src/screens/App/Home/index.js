import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  Platform,
  Alert,
  RefreshControl,
  Dimensions,
} from 'react-native';
import PhotoEditor from 'react-native-photo-editor';
import React, {useState, useRef, useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import {Input, Button, Stack, Menu, Pressable} from 'native-base';
import socket from '../../../utils/socket';
import Stories from '../../../Stories/App';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native';
import Fun from '../../../assets/images/svg/fun.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Antdesign from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import RNFS from 'react-native-fs';
import Loader from '../../../Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosconfig from '../../../provider/axios';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CustomAlert from '../../../Components/AlertModal';
import {AppContext, useAppContext} from '../../../Context/AppContext';
import {
  dummyImage,
  getColor,
  theme,
  socketLike,
  captureImage,
  chooseFile,
} from '../../../Constants/Index';
import moment from 'moment';
const dummyToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ODk1ZTI5Ni00NGE0LTQ3NGQtODk3Zi1mZTMxNDI4ZjM5Y2UiLCJqdGkiOiJmNGY1Y2RmMTUwOWQ4Y2EyZDYwZjYzNWJmZjEyOWMzNDUwYWFjMjZjMDgyYjk5YzE2ZjgyZGFmMjVlYzQ5MTk5ZjZiNThlMDE0MTI3ZTM0ZiIsImlhdCI6MTY4NjU1MTgyNi43NDI0NTQsIm5iZiI6MTY4NjU1MTgyNi43NDI0NTcsImV4cCI6MTcxODE3NDIyNi43MjQ1NTYsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.kAdmgrg_7pimuKzi603LVLbCIdBqAz2JpXvsCvgdFcdK3LSRIUcxQBDEWxC2R2X2ChHq5vkSUscroVj3c8047Xlw9knqqcU0FJHCyNgrwnooGIAK9-DaDSNCeQiR3EbR8Nw0lYW6K845U4i8zBlXc1LO8cJ8tFPX0tVh7Vu51uYHSiNhCkQ-hL2fkfaCURiJBp7souV2MqbtVbZdK9OQzXmp171aXdeq_XyQIBI5O8gLHJLCgpklcTI9ZnhCyxwHwFSmznNi5uq7ItJ41Wx6_PIUUrUh2mclfY072uzH2q-b2JwBrcBvQTULjmnLi4gs1-YSpyBvoSS-ae2F_-pkuLL-83RwASr8F6f7f6KY6SdDjqt3C0nfql1ac7hV6bA35wOaII7SjiZnFuzd3-EKsD1k1ATpxp6PoG09gJn-Y95C7eeaia5xe5Um_8K9vf7wm0ODXrwnEJJzsXXRsN6F0VMYHXJoL0QDUMpTGK-VL_g9b-xeNhV5RWFRyWfIzDijEpfhxbtTWiJs9aVL32CDxvWlXKYdcQytkyBH0PxKGwcbgysOpVybzjJyZJip_MVeAQZogQw25iGtT-kCUu1DLYWqegRx1oOI7jXK4cWaIatWQoLghqh8EwDD-JNFgukd9pF6uW28x9qcU5DwVoLSBTPaHLrZ9ePK-nowLzcRfDo';

const mystory = {
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
  user_stories: [],
  year: null,
};
const allposts = [
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
const funPostsdummy = [
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
  {
    action: '0',
    caption: 'Hii',
    created_at: '2023-06-06T15:24:16.000000Z',
    id: 2,
    image:
      'https://designprosusa.com/the_night/storage/app/1686065056base64_image.png',
    location: 'C P West Manhattan',
    post_comments: [],
    post_likes: [],
    privacy_option: '1',
    status: '1',
    updated_at: '2023-06-06T15:24:16.000000Z',
    user: {
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
    user_id: '4',
  },
];
const otherStoriesDummy = [
  {
    organization: undefined,
    profile: dummyImage,
    stories: [
      {
        created: '2023-06-06T12:21:34.000000Z',
        duration: 10,
        id: '20',
        isReadMore: true,
        type: 'image',
        url: 'https://designprosusa.com/the_night/storage/app/1686552891base64_image.png',
        url_readmore: 'https://github.com/iguilhermeluis',
      },
      {
        created: '2023-06-06T12:21:34.000000Z',
        duration: 10,
        id: '21',
        isReadMore: true,
        type: 'image',
        url: 'https://designprosusa.com/the_night/storage/app/1686552997base64_image.png',
        url_readmore: 'https://github.com/iguilhermeluis',
      },
    ],
    title: 'Noah Conner',
    user_id: 3,
    username: 'Noah Conner',
  },
  {
    organization: undefined,
    profile:
      'https://designprosusa.com/the_night/storage/app/1686122942base64_image.png',
    stories: [
      {
        created: '2023-06-06T12:21:34.000000Z',
        duration: 10,
        id: '23',
        isReadMore: true,
        type: 'image',
        url: 'https://designprosusa.com/the_night/storage/app/1686552891base64_image.png',
        url_readmore: 'https://github.com/iguilhermeluis',
      },
      {
        created: '2023-06-06T12:21:34.000000Z',
        duration: 10,
        id: '24',
        isReadMore: true,
        type: 'image',
        url: 'https://designprosusa.com/the_night/storage/app/1686552997base64_image.png',
        url_readmore: 'https://github.com/iguilhermeluis',
      },
    ],
    title: 'Andy Jones',
    user_id: 4,
    username: 'Andy Jones',
  },
];
const dummyUser = {
  about_me: null,
  block_status: 0,
  connected: 0,
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
};
const userslist = [
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

const Home = ({navigation, route}) => {
  const {setLiked} = useAppContext(AppContext);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const flatListRef = useRef(null);
  const isFocused = useIsFocused();
  const userToken = dummyToken;
  const [storiesData, setStoriesData] = useState([]);
  let userList = userslist;
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [refresh, setRefresh] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [myStories, setMyStories] = useState([]);
  const [storyCircle, setStoryCircle] = useState('green');
  const [loader, setLoader] = useState(false);
  const [posts, setPosts] = useState(allposts);
  const [userID, setUserID] = useState(dummyUser?.id);
  const [comment, setComment] = useState('');
  const [current, setCurrent] = useState('');
  const [otherStories, setOtherStories] = useState(otherStoriesDummy);
  const [postId, setPostId] = useState(null);
  const [userData, setUserData] = useState(dummyUser);
  const [text, setText] = useState(null);
  const [funPostsData, setFunPostsData] = useState(funPostsdummy);
  const [dummyImage, setDummyImage] = useState(
    'https://designprosusa.com/the_night/storage/app/1678168286base64_image.png',
  );
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    getStories();
    getData();
  }, [isFocused]);

  const getData = async id => {
    const data = JSON.stringify(dummyUser);
    AsyncStorage.setItem('userData', data);
  };

  const getItemLayout = (data, index) => ({
    length: 500,
    offset: 500 * index,
    index,
  });

  const report = async repText => {
    console.log('report');
  };
  const hide = async id => {
    console.log('hide');
  };

  const hitLike = async (id, index, data) => {
    console.log('like');
  };

  useEffect(() => {
    const handleLike = ({postId, postUserId, myId}) => {
      setPosts(prevPosts => {
        return prevPosts.map(post => {
          if (post.id === postId) {
            const updatedPost = {...post};
            const likesIndex = updatedPost.post_likes.findIndex(
              like => like.user_id === myId,
            );
            if (likesIndex !== -1) {
              updatedPost.post_likes.splice(likesIndex, 1);
            } else {
              const myLikesIndex = updatedPost.post_likes.findIndex(
                like => like.user_id === myId,
              );
              if (myLikesIndex !== -1) {
                updatedPost.post_likes.splice(myLikesIndex, 1);
              }
              if (userList) {
                userList?.map(user => {
                  if (user?.id == myId) {
                    setLiked(true);
                    updatedPost.post_likes.push({
                      user_id: myId,
                      users: {
                        name: user?.name,
                        last_name: user?.last_name,
                      },
                    });
                  }
                });
              }
            }
            return updatedPost;
          }
          return post;
        });
      });
    };

    socket.on('like', handleLike);

    return () => {
      socket.off('like', handleLike);
    };
  }, [socket]);

  useEffect(() => {
    const handleComment = ({postId, postUserId, myId}) => {
      setPosts(prevPosts => {
        return prevPosts.map(post => {
          if (post.id === postId) {
            const updatedPost = {...post};
            updatedPost.post_comments.push(myId);
            return updatedPost;
          }
          return post;
        });
      });
    };

    socket.on('comment', handleComment);

    return () => {
      socket.off('comment', handleComment);
    };
  }, [socket]);

  useEffect(() => {
    const handleRequest = ({from, to, type}) => {
      if (to == userData?.id && (type == 'connect' || type == 'disconnect')) {
        // getPosts(null, false);
      }
    };

    const handleSocketRequest = ({from, to, type}) => {
      handleRequest({from, to, type});
    };
    socket.on('request', handleSocketRequest);

    return () => {
      socket.off('request', handleSocketRequest);
    };
  }, [socket, userData]);
  var lastTap = null;

  const handleDoubleTap = (id, index, data) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      hitLike(id, index, data);
    } else {
      lastTap = now;
    }
  };

  useEffect(() => {
    setStoryCircle('green');
    console.log(storiesData);
  }, [storiesData]);

  const handleRefresh = () => {};

  const getStories = async token => {
    await axiosconfig
      .get('story_index', {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        createStoryData(res.data?.user, token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const createStoryData = (data, token) => {
    let temp = {
      user_id: data.id,
      profile: data.image ? data.image : dummyImage,
      organization: data.organization,
      username: data.name + ' ' + data.last_name,
      title: data.name + ' ' + data.last_name,
      stories: [],
    };
    setStoriesData([temp]);
  };

  const deleteStory = async id => {
    Alert.alert('Story Deleted');
  };

  const deletePost = async id => {
    console.log('deletePost');
  };

  const deleteAlert = (title, text, id) => {
    Alert.alert(
      title,

      text,
      [
        {
          text: 'Yes',
          onPress: () =>
            title == 'Delete Post' ? deletePost(id) : deleteStory(id),
        },
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      {cancelable: false},
    );
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
                  // hide(elem?.item?.id);
                }}>
                <View style={s.optionView}>
                  <Icon
                    name={'eye-slash'}
                    color={textColor}
                    size={moderateScale(13, 0.1)}
                    style={{flex: 0.3}}
                  />
                  <Text style={[s.optionBtns, {color: textColor}]}>Hide</Text>
                </View>
              </Menu.Item>

              {userID == elem?.item?.user?.id ? (
                <>
                  <Menu.Item
                    onPress={() =>
                      navigation.navigate('createPost', {
                        elem: elem?.item,
                        from: 'Home',
                      })
                    }>
                    <View style={s.optionView}>
                      <MaterialIcons
                        name={'edit'}
                        color={textColor}
                        size={moderateScale(13, 0.1)}
                        style={{flex: 0.3}}
                      />
                      <Text style={[s.optionBtns, {color: textColor}]}>
                        Edit
                      </Text>
                    </View>
                  </Menu.Item>
                </>
              ) : null}
              {userID == elem?.item?.user?.id ? (
                <>
                  <Menu.Item onPress={() => {}}>
                    <View style={s.optionView}>
                      <Antdesign
                        name={'delete'}
                        color={textColor}
                        size={moderateScale(13, 0.1)}
                        style={{flex: 0.3}}
                      />
                      <Text style={[s.optionBtns, {color: textColor}]}>
                        Delete
                      </Text>
                    </View>
                  </Menu.Item>
                </>
              ) : null}
              {userID != elem?.item?.user?.id ? (
                <Menu.Item
                  onPress={() => {
                    refRBSheet1.current.open();
                    setPostId(elem?.item?.id);
                  }}>
                  <View style={s.optionView}>
                    <MaterialIcons
                      name={'report'}
                      color="red"
                      size={moderateScale(13, 0.1)}
                      style={{flex: 0.3}}
                    />
                    <Text style={[s.optionBtns]}>Report</Text>
                  </View>
                </Menu.Item>
              ) : null}
            </Menu>
          </View>
        </View>
        <View style={s.img}>
          <TouchableWithoutFeedback
            onPress={() => {
              handleDoubleTap(elem?.item?.id, elem?.index, elem?.item?.user);
              socketLike(elem?.item?.id, elem?.item?.user_id, userID);
            }}>
            <View style={s.img}>
              <Image
                source={{uri: elem?.item?.image}}
                resizeMode={'cover'}
                style={s.galleryImage}></Image>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            onPress={() => {
              // setLoadingStates(prevState => ({
              //   ...prevState,
              //   [elem?.item?.id]: true,
              // }));
              hitLike(elem?.item?.id, elem?.index, elem?.item?.user);
              socketLike(elem?.item?.id, elem?.item?.user_id, userID);
            }}
            style={s.likes}>
            {loadingStates[elem?.item?.id] ? (
              <ActivityIndicator size="small" color={'yellow'} />
            ) : (
              <Text style={s.likesCount}>
                {' '}
                {elem?.item?.post_likes?.length}
              </Text>
            )}

            <Icon
              name="heart"
              size={moderateScale(12, 0.1)}
              solid
              color={liked === true ? 'yellow' : '#fff'}
            />
          </TouchableOpacity>
        </View>
        <View style={s.footer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Likes', {data: Likes});
            }}
            style={{marginBottom: moderateScale(5, 0.1)}}>
            {elem?.item?.post_likes?.length ? (
              <Text style={[s.name, {color: textColor}]}>
                {`Liked by Ava Simmon `}
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
              {elem?.item?.user?.name}
              {elem?.item?.user?.last_name}{' '}
              <Text style={[s.textRegular, {color: textColor}]}>
                {elem?.item?.caption}
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Comments', {data: elem?.item, from: 'home'});
            }}>
            <Text style={[s.textRegular, {color: 'grey', marginVertical: 0}]}>
              View all {elem?.item?.post_comments?.length} Comments
            </Text>
          </TouchableOpacity>
          <View style={s.input}>
            <Input
              w="100%"
              variant="unstyled"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              InputLeftElement={
                <View
                  style={[
                    s.smallDp,
                    {
                      borderColor: getColor(elem?.item?.user?.group),
                    },
                  ]}>
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
              }
              InputRightElement={
                <TouchableOpacity
                  disabled={comment == ''}
                  onPress={() => {
                    setComment('');
                    // addComment(elem?.item?.id, elem?.index);
                    // socketComment(elem?.item?.id, elem?.item?.user_id, userID);
                  }}
                  style={{marginRight: moderateScale(15, 0.1)}}>
                  <Feather
                    name={'send'}
                    size={moderateScale(20, 0.1)}
                    color={'grey'}
                  />
                </TouchableOpacity>
              }
              onEndEditing={() => {}}
              placeholder="Add Comment ..."
              placeholderTextColor={'grey'}
              value={current == elem.index ? comment : ''}
              onChangeText={text => {
                setCurrent(elem.index);
                setComment(text);
              }}
            />
          </View>
          <View>
            <Text
              style={[
                s.textRegular,
                {color: 'grey', marginVertical: 0, textTransform: 'capitalize'},
              ]}>
              {`${moment(elem?.item?.created_at).fromNow()}`}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: color}}>
      {loader ? <Loader /> : null}

      <View style={[s.container, s.col, {backgroundColor: color}]}>
        <ScrollView
          scrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            // alignItems: 'center',
            height: moderateScale(120, 0.1),
            marginVertical: moderateScale(20, 0.1),
            flexDirection: 'row',
          }}>
          {storiesData[0]?.stories?.length ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.open();
                }}
                style={[
                  s.addBtn,
                  {borderColor: color, top: moderateScale(50, 0.1)},
                ]}>
                <Icon
                  name={'plus'}
                  size={moderateScale(14, 0.1)}
                  solid
                  color={'blue'}
                />
              </TouchableOpacity>
              <Stories
                data={storiesData}
                theme={theme}
                deleteFunc={func =>
                  deleteAlert(
                    'Delete Story',
                    'Are you sure you want to delete this story?',
                    func,
                  )
                }
                color={storyCircle}
                setColorFun={setStoryCircle}
                navigation={navigation}
              />
              {/* <InstaStory
                data={Stories}
                duration={10}
                onStart={item => {
                  setStoryCircle('grey');
                  // setStoryID(13);
                  // // console.log(item, 'storyryy');
                }}
                customStoryCircleListItem={item => {
                  // console.log('hi');
                }}
                onClose={item => // console.log('close: ', item)}
                showAvatarText={true}
                avatarTextStyle={{
                  color: textColor,
                  marginBottom: moderateScale(34, 0.1),
                }}
                customSwipeUpComponent={
                  <View
                    style={{
                      backgroundColor: '#000',
                      borderRadius: moderateScale(25, 0.1),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      variant={'link'}
                      onPressIn={() => {
                        deleteAlert(
                          'Delete Story',
                          'Are you sure you want to delete this story?',
                          '15',
                        );
                      }}
                    >
                      <Antdesign
                        name={'delete'}
                        size={moderateScale(20, 0.1)}
                        color={textColor}
                      />
                    </Button>
                  </View>
                }
                style={{
                  marginTop: moderateScale(5, 0.1),
                  marginRight: moderateScale(-15, 0.1),
                }}
                pressedBorderColor={storyCircle}
                unPressedBorderColor={'green'}
              /> */}
            </View>
          ) : (
            <>
              <View style={s.myStory}>
                <Image
                  source={{
                    uri: userData?.image ? userData?.image : dummyImage,
                  }}
                  width={undefined}
                  height={undefined}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: moderateScale(65, 0.1),
                  }}
                  resizeMode={'cover'}
                />
                <Text style={[s.userName, {color: textColor}]}>
                  {userData?.name} {userData?.last_name}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    refRBSheet.current.open();
                  }}
                  style={[s.addBtn, {borderColor: color}]}>
                  <Icon
                    name={'plus'}
                    size={moderateScale(14, 0.1)}
                    solid
                    color={'blue'}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
          {otherStories?.length > 0 ? (
            <Stories
              data={otherStories}
              theme={theme}
              deleteFunc={() =>
                deleteAlert(
                  'Delete Story',
                  'Are you sure you want to delete this story?',
                )
              }
              navigation={navigation}
            />
          ) : // <InstaStory
          //   data={otherStories}
          //   duration={10}
          //   onStart={item => // console.log(item)}
          //   onClose={item => // console.log('close: ', item)}
          //   showAvatarText={true}
          //   avatarTextStyle={{
          //     color: textColor,
          //     marginBottom: moderateScale(34, 0.1),
          //   }}
          //   pressedBorderColor={'grey'}
          //   unPressedBorderColor={'green'}
          //   customSwipeUpComponent={
          //     <View>
          //       <Text>Swipe</Text>
          //     </View>
          //   }
          //   style={{
          //     marginTop: moderateScale(5, 0.1),
          //   }}
          // />
          null}
        </ScrollView>

        <TouchableOpacity
          style={s.funView}
          onPress={() => {
            // // console.log('aaa');
            navigation.navigate('FunInteraction');
          }}>
          <View style={[s.yellow, s.round]}>
            <Fun
              width={moderateScale(12, 0.1)}
              height={moderateScale(12, 0.1)}
            />
          </View>
          <View
            style={[
              s.yellow,
              s.round2,
              {
                elevation: 30,
                shadowColor: 'black',
              },
            ]}>
            {funPostsData ? (
              <Text style={s.count}>{funPostsData?.length}</Text>
            ) : null}
          </View>
          <Text style={[s.funText, {color: textColor}]}>Fun Interaction</Text>
        </TouchableOpacity>
        <View style={{height: moderateScale(40, 0.1)}}></View>
        {!posts?.length ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginBottom: moderateScale(120, 0.1),
            }}>
            <Text style={[s.textCreate, {color: textColor}]}>
              {`What's on your mind`}{' '}
              {userData?.name ? `${userData?.name}?` : null}
            </Text>
            <TouchableOpacity
              style={s.btn}
              onPress={() => navigation.navigate('createPost')}>
              <View style={s.connected}>
                <Text style={[s.btnTxt]}>Create Post</Text>
                <Icon
                  name={'plus'}
                  size={moderateScale(15, 0.1)}
                  solid
                  color={'#000'}
                />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={posts}
            renderItem={(elem, index) => renderItem(elem)}
            keyExtractor={(elem, index) => {
              index.toString();
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            extraData={refresh}
            getItemLayout={getItemLayout}
          />
        )}
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        height={300}
        openDuration={250}
        customStyles={{
          container: {
            alignItems: 'center',
            height: moderateScale(220),
            borderRadius: moderateScale(20, 0.1),
          },
        }}>
        <View
          style={{
            marginVertical: moderateScale(30, 0.1),
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Stack
            direction={{
              base: 'column',
              md: 'row',
            }}
            space={4}>
            <Button
              transparent
              style={s.capturebtn}
              onPressIn={() => {
                captureImage('image', refRBSheet, setStoriesData);
                // captureImage('image', refRBSheet, storiesData, setStoriesData);
              }}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="camera" style={s.capturebtnicon} />
                <Text style={s.capturebtntxt}>Open Camera</Text>
              </View>
            </Button>
            <Button
              transparent
              style={s.capturebtn}
              onPressIn={() => {
                chooseFile('image', refRBSheet, setStoriesData);
              }}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="md-image-outline" style={s.capturebtnicon} />
                <Text style={s.capturebtntxt}>Open Gallery</Text>
              </View>
            </Button>
          </Stack>
        </View>
      </RBSheet>
      <RBSheet
        ref={refRBSheet1}
        closeOnDragDown={true}
        openDuration={250}
        customStyles={{
          container: {
            alignItems: 'center',
            height: moderateScale(480),
            borderRadius: moderateScale(20, 0.1),
            backgroundColor: color,
          },
        }}>
        {loader ? <Loader /> : null}
        <View
          style={{
            alignSelf: 'center',
            marginBottom: moderateScale(10, 0.1),
          }}>
          {/* {loader ? <Loader /> : null} */}
          <Text style={[s.rb, {color: textColor}]}>Report</Text>
        </View>
        <View
          style={{
            paddingHorizontal: moderateScale(13, 0.1),
          }}>
          <View style={[s.hv]}>
            <Text style={[s.hv, {color: textColor}]}>
              Why are you reporting this post?
            </Text>
          </View>
          <View>
            <Text style={[s.txt]}>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before final copy is available
            </Text>
          </View>
          <View style={{display: 'flex'}}>
            <TouchableOpacity style={s.list}>
              <View>
                <Text style={[s.listTxt, {color: textColor}]}></Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setText('i just dont like it');
                report('i just dont like it');
              }}
              style={s.list}>
              <View>
                <Text style={[s.listTxt, {color: textColor}]}>
                  i just don't like it
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setText('its spam');
                report('its spam');
              }}
              style={s.list}>
              <View>
                <Text style={[s.listTxt, {color: textColor}]}>it's spam</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setText('Nudity or sexual activity');
                report('Nudity or sexual activity');
              }}
              style={s.list}>
              <View>
                <Text style={[s.listTxt, {color: textColor}]}>
                  Nudity or sexual activity
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setText('Hate speech or symbols');
                report('Hate speech or symbols');
              }}
              style={s.list}>
              <View>
                <Text style={[s.listTxt, {color: textColor}]}>
                  Hate speech or symbols
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setText('Violence or dangerous orgnisations');
                report('Violence or dangerous orgnisations');
              }}
              style={s.list}>
              <View>
                <Text style={[s.listTxt, {color: textColor}]}>
                  Violence or dangerous orgnisations
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setText('Bullying or harrasment');
                report('Bullying or harrasment');
              }}
              style={s.list}>
              <View>
                <Text style={[s.listTxt, {color: textColor}]}>
                  Bullying or harrasment
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default Home;

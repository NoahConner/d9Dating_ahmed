import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  Image,
  Alert,
  FlatList,
  RefreshControl,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import {Input, Menu, Pressable} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import RBSheet from 'react-native-raw-bottom-sheet';
import axiosconfig from '../../../../Providers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import {useIsFocused} from '@react-navigation/native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import io from 'socket.io-client';
import socket from '../../../../utils/socket';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Loader} from '../../../../Components/Index';
import {
  dummyImage,
  getColor,
  socketComment,
  socketLike,
} from '../../../../Constants/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import moment from 'moment';
import {theme} from '../../../../Constants/Index';

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
      date_login: '2023-06-07 07:33:14',
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
      updated_at: '2023-06-07T07:33:14.000000Z',
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
      date_login: '2023-06-07 07:33:14',
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
      updated_at: '2023-06-07T07:33:14.000000Z',
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
const sourceDatadummy = [
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
const FunInteraction = ({}) => {
  const refRBSheet1 = useRef();
  const isFocused = useIsFocused();
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [postId, setPostId] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [loader, setLoader] = useState(false);
  const [publicPost, setPublicPost] = useState([]);
  const [text, setText] = useState(null);
  const [userID, setUserID] = useState('');
  const [current, setCurrent] = useState('');
  const [comment, setComment] = useState('');
  const [itemHeights, setItemHeights] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  let userList = [];
  const [filtered, setFiltered] = useState(dataSource);
  const [searching, setSearching] = useState(false);
  const {token} = useAppContext(AppContext);
  const navigation = useNavigation();
  const route = useRoute();
  const flatListRef = useRef(null);
  const [loadingStates, setLoadingStates] = useState({});
  const postID = route?.params?.data?.id;
  useEffect(() => {
    getID();
  }, [isFocused]);
  const getAllUsers = async loader => {
    try {
      const sourceData = sourceDatadummy;
      userList = sourceData;
      setDataSource(sourceData);
      getPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const getPosts = async loader => {
    try {
      const postData = await funPostsdummy;
      await setPublicPost(postData);

      await matchId(postData);
      // await setTimeout(async () => {
      //   await // setLoader(false);
      // }, 0);
    } catch (err) {
      console.log(err);
      // // setLoader(false);
    }
  };

  const getID = async () => {
    const id = await AsyncStorage.getItem('id');
    setUserID(id);
    getAllUsers();
  };

  const hitLike = async (id, userid, index) => {
    toggleLike(index);
    setLoadingStates(prevState => ({
      ...prevState,
      [id]: false,
    }));
  };

  useEffect(() => {
    const handleLike = ({postId, postUserId, myId}) => {
      setPublicPost(prevPosts => {
        return prevPosts?.map(post => {
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
      setPublicPost(prevPosts => {
        return prevPosts?.map(post => {
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

  var lastTap = null;
  const handleDoubleTap = (id, index) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      hitLike(id, index);
    } else {
      lastTap = now;
    }
  };

  const toggleLike = index => {
    setRefresh(!refresh);
  };

  const matchId = postId => {
    postId?.map((post, index) => {
      if (post.id == postID) {
        const matchedId = post.id;
        if (index !== -1 && flatListRef.current) {
          flatListRef.current.scrollToIndex({index, animated: true});
        }
      } else {
      }
    });
  };
  const getItemLayout = (data, index) => ({
    length: 500,
    offset: 500 * index,
    index,
  });

  const report = async reptext => {
    // // setLoader(true);
    // const data = {
    //   post_id: postId,
    //   text: reptext,
    // };
    // await axiosconfig
    //   .post('post-report', data, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       Accept: 'application/json',
    //     },
    //   })
    //   .then(res => {
    Alert.alert('post reported successfully');
    // getPosts(true);
    refRBSheet1.current.close();
    //   // setLoader(false);
    // })
    // .catch(err => {
    //   // setLoader(false);
    //   console.log(err);
    // });
  };
  const hide = async id => {
    // setLoader(true);
    await axiosconfig
      .get(`post_action/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log(res, 'hello hide res');
        getPosts(true);
        // setLoader(false);
      })
      .catch(err => {
        // setLoader(false);
        console.log(err, 'hello hide res');
      });
  };

  const addComment = async (id, index) => {
    if (comment) {
      // setLoader(true);
      const data = {
        text: comment,
        post_id: id,
      };
      await axiosconfig
        .post(`comment_add`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
        .then(res => {
          setComment('');
          getPosts(true);
          setRefresh(!refresh);
          // setLoader(false);
        })
        .catch(err => {
          // setLoader(false);
          setComment('');
          console.log(err);
        });
    }
  };

  const deletePost = async id => {
    // setLoader(true);
    await axiosconfig
      .get(`post_delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        Alert.alert(res?.data?.message);
        getPosts(token);
        // setLoader(false);
      })
      .catch(err => {
        // setLoader(false);
      });
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

  const handleRefresh = () => {
    getID();
    getPosts(true);
  };

  const renderItem = elem => {
    if (elem?.item?.privacy_option == '3') {
      return;
    }
    let liked = false;
    elem?.item?.post_likes?.forEach(t => {
      if (t?.user_id == userID) {
        liked = true;
      }
    });
    return (
      <View
        style={s.col}
        onLayout={e => setItemHeights(e.nativeEvent.layout.height, 'heightyu')}>
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
            <Text style={[s.textRegular, {color: textColor}]}>
              {elem?.item?.location}
            </Text>
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
                <>
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
                </>
              ) : null}
            </Menu>
          </View>
        </View>
        <View style={s.img}>
          <TouchableWithoutFeedback
            onPress={() => {
              handleDoubleTap(elem?.item?.id, elem?.index);
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
              setLoadingStates(prevState => ({
                ...prevState,
                [elem?.item?.id]: true,
              }));
              hitLike(elem?.item?.id, elem?.item?.user_id, elem?.index);
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
              {elem?.item?.user?.name}
              {elem?.item?.user?.last_name}{' '}
              <Text style={[s.textRegular, {color: textColor}]}>
                {elem?.item?.caption}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Comments', {
                data: elem?.item,
                from: 'funInteraction',
              });
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

  const searchItem = (elem, i) => {
    return (
      <TouchableOpacity style={s.card}>
        <View style={[s.dp, {borderColor: getColor(elem?.item?.group)}]}>
          <Image
            source={{uri: elem?.item?.image ? elem?.item?.image : dummyImage}}
            style={s.dp1}
            resizeMode={'cover'}
          />
        </View>
        <View style={s.details}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ViewUser', {
                post: elem?.item,
                screen: 'search',
              });
              clear();
            }}>
            <Text style={[s.name, s.nameBold, {color: textColor}]}>
              {elem?.item?.name}
            </Text>
            <Text style={[s.textRegular, s.nameBold, {color: 'grey'}]}>
              {elem?.item?.location}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  const onSearch = text => {
    setSearchText(text);
    if (text) {
      setSearching(true);
      const temp = text.toLowerCase();

      const tempList = dataSource.filter(item => {
        let name = item?.name?.toLowerCase();
        if (name?.match(temp)) return item;
      });

      setFiltered(tempList);
    } else {
      setSearchText('');
      setSearching(false);
    }
  };

  const clear = () => {
    setSearchText('');
    setFiltered([]);
    setSearching(false);
  };
  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: color}}>
      <View style={[s.container, s.col, {backgroundColor: color}]}>
        <View style={s.searchContainer}>
          <Input
            placeholder="Search Here"
            placeholderTextColor={'#B9B9B9'}
            onChangeText={onSearch}
            value={searchText}
            marginTop={moderateScale(10, 0.1)}
            w={'95%'}
            h={moderateScale(37, 0.1)}
            variant="rounded"
            InputLeftElement={
              <View style={{paddingLeft: 10}}>
                <Icon
                  name="search"
                  size={moderateScale(25, 0.1)}
                  color={'#B9B9B9'}
                />
              </View>
            }
            InputRightElement={
              <TouchableOpacity
                onPress={() => clear()}
                style={{paddingRight: 10}}>
                {searchText ? (
                  <Entypo
                    name={'cross'}
                    size={moderateScale(20, 0.1)}
                    color={'#B9B9B9'}
                  />
                ) : null}
              </TouchableOpacity>
            }
            color={'#fff'}
            backgroundColor={'#595757'}
          />
        </View>
        {searching && (
          <View
            style={{
              marginHorizontal: moderateScale(10, 0.1),
              marginBottom: moderateScale(60, 0.1),
            }}>
            <FlatList
              data={filtered}
              renderItem={searchItem}
              keyExtractor={(item, index) => String(index)}
              scrollEnabled={true}
              extraData={refresh}
            />
          </View>
        )}
        <View
          style={{
            position: 'absolute',
            backgroundColor: color,
            width: '95%',
            top: moderateScale(60, 0.1),
            zIndex: 10000,
            marginHorizontal: moderateScale(10, 0.1),
          }}>
          {searching && filtered?.length == 0 && (
            <Text
              style={[
                s.name,
                s.nameBold,
                {
                  color: textColor,
                  textAlign: 'center',
                  marginVertical: moderateScale(40, 0.1),
                },
              ]}>
              No Users Found
            </Text>
          )}
        </View>

        <View style={s.funView}></View>

        <FlatList
          ref={flatListRef}
          data={publicPost}
          renderItem={elem => renderItem(elem)}
          keyExtractor={(item, index) => String(index)}
          scrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          getItemLayout={getItemLayout}
          extraData={refresh}
        />
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
            <Text style={[s.rb, {color: textColor}]}>Report</Text>
          </View>
          <View
            style={{
              paddingHorizontal: moderateScale(15, 0.1),
            }}>
            <View style={[s.hv]}>
              <Text style={[s.hv, {color: textColor}]}>
                Why are you reporting this post?
              </Text>
            </View>
            <View>
              <Text style={[s.txt]}>
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without relying on meaningful content. Lorem ipsum
                may be used as a placeholder before final copy is available
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
                  report('its spam');
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
      </View>
    </SafeAreaView>
  );
};

export default FunInteraction;

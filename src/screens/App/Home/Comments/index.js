import {TouchableOpacity, Text, SafeAreaView, View, Image} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import {FlatList} from 'react-native';
import {ScrollView} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosconfig from '../../../../provider/axios';
import Feather from 'react-native-vector-icons/Feather';
import {Input} from 'native-base';
import {Header, Loader} from '../../../../Components/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {dummyImage, getColor} from '../../../../Constants/Index';
import {theme} from '../../../../Constants/Index';

const dummyPost = {
  action: '0',
  caption: 'public post',
  created_at: '2023-06-07T06:59:09.000000Z',
  id: 4,
  image:
    'https://designprosusa.com/the_night/storage/app/1686121149base64_image.png',
  location: 'Dufferin St London',
  post_comments: [
    {
      created_at: '2023-06-07T06:59:41.000000Z',
      group: 'Omega Psi Phi Fraternity, Inc.',
      id: 4,
      image: null,
      post_id: '4',
      status: '1',
      text: 'hello',
      updated_at: '2023-06-07T06:59:41.000000Z',
      user_id: '2',
      user_name: 'Emily',
      users: {
        about_me: 'my about info',
        created_at: '2023-06-06T12:21:34.000000Z',
        date: '6/06/2005',
        date_login: '2023-06-07 08:04:39',
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
        updated_at: '2023-06-07T10:56:56.000000Z',
        year: null,
      },
    },
    {
      created_at: '2023-06-07T07:00:15.000000Z',
      group: 'Omega Psi Phi Fraternity, Inc.',
      id: 5,
      image: null,
      post_id: '4',
      status: '1',
      text: 'beautiful',
      updated_at: '2023-06-07T07:00:15.000000Z',
      user_id: '2',
      user_name: 'Emily',
      users: {
        about_me: 'my about info',
        created_at: '2023-06-06T12:21:34.000000Z',
        date: '6/06/2005',
        date_login: '2023-06-07 08:04:39',
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
        updated_at: '2023-06-07T10:56:56.000000Z',
        year: null,
      },
    },
    {
      created_at: '2023-06-07T07:01:09.000000Z',
      group: 'Omega Psi Phi Fraternity, Inc.',
      id: 6,
      image: null,
      post_id: '4',
      status: '1',
      text: 'oodd',
      updated_at: '2023-06-07T07:01:09.000000Z',
      user_id: '2',
      user_name: 'Emily',
      users: {
        about_me: 'my about info',
        created_at: '2023-06-06T12:21:34.000000Z',
        date: '6/06/2005',
        date_login: '2023-06-07 08:04:39',
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
        updated_at: '2023-06-07T10:56:56.000000Z',
        year: null,
      },
    },
  ],
  post_likes: [
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
  ],
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
};

const userDatadummy = {
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

const Comments = ({navigation, route}) => {
  const flatListRef = useRef(null);
  const {data} = route.params;
  const {token} = useAppContext(AppContext);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [comment, setComment] = useState('');
  const [commentID, setCommentID] = useState('');
  const [comments, setComments] = useState(dummyPost.post_comments);
  const [loader, setLoader] = useState(false);
  const [userID, setUserID] = useState('');
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [userData, setUserData] = useState('');
  const [post, setPost] = useState(null);
  const Cid = route?.params?.data?.id;
  const Pid = route?.params?.data?.Pid;

  useEffect(() => {
    getID();
    getPosts(Pid);
    getPublicPosts(Pid);
  }, []);

  const getUserData = async id => {
    setUserData(userDatadummy);
  };

  const getID = async () => {
    const id = await AsyncStorage.getItem('id');
    setUserID(id);
    getUserData(id);
  };

  const getItemLayout = (data, index) => ({
    length: 57,
    offset: 57 * index,
    index,
  });
  const matchId = comments => {
    comments.map((p, index) => {
      if (p?.id == Cid) {
        if (index !== -1 && flatListRef.current) {
          flatListRef.current.scrollToIndex({index, animated: true});
        }
      } else {
      }
    });
  };

  const addComment = async postid => {
    setLoader(true);
    if (!comment) {
      setLoader(false);
      return;
    }
    let data;
    if (edit) {
      data = {
        comment_id: commentID,
        text: comment,
        post_id: postid,
      };
    } else {
      data = {
        text: comment,
        post_id: postid,
      };
    }

    await axiosconfig
      .post(edit ? 'comment_update' : 'comment_add', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        setComment('');
        setEdit(false);
        setCommentID('');

        if (route?.params?.from == 'funInteraction') {
          getPublicPosts(postid);
        } else {
          getPosts(postid);
        }
      })
      .catch(err => {
        setLoader(false);
        setComment('');
        setEdit(false);
        setCommentID('');
      });
  };

  const onEdit = async (id, commentText) => {
    setComment(commentText);
    setCommentID(id);
    setEdit(true);
  };

  const deleteComment = async commentid => {
    setLoader(true);
    await axiosconfig
      .get(`comment-delete/${commentid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        if (route?.params?.from == 'funInteraction') {
          getPublicPosts(data?.id);
        } else if (route?.params?.from == 'home') {
          getPosts(data?.id);
        } else {
          getPosts(Pid);
        }
      })
      .catch(err => {
        setLoader(false);
      });
  };

  const getPosts = async postid => {
    // getUpdatedComments(dummyPost, postid);
    setPost(dummyPost);
  };

  const getPublicPosts = async postid => {
    setPost(dummyPost);
    // getUpdatedComments(dummyPost, postid);
  };

  const getUpdatedComments = (array, postid) => {
    // let temp = array.filter(elem => elem.id == postid);
    // setPost(temp[0]);
    // setComments(temp[0]?.post_comments);
    // matchId(temp[0]?.post_comments);
    // setLoader(false);
    // setRefresh(!refresh);
  };

  const renderItem = (elem, i) => {
    return (
      <View style={s.card}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={[s.dp, {borderColor: getColor(elem?.item?.users?.group)}]}>
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
          <View style={s.details}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ViewUser', {
                  screen: 'search',
                  post: {id: elem?.item?.users?.id},
                });
              }}>
              <Text style={[s.name, s.nameBold, {color: textColor}]}>
                {elem?.item?.users?.name} {elem?.item?.users?.last_name}
              </Text>
            </TouchableOpacity>
            <View>
              <Text style={[s.textSmall, {color: textColor}]}>
                {elem?.item?.text}
              </Text>
            </View>
            <Text style={[s.textSmall, {color: '#787878'}]}>
              {`${new Date(elem?.item?.created_at).toLocaleString()}`}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          {data?.user?.id == userID || elem?.item?.user_id == userID ? (
            <View style={s.icon}>
              <TouchableOpacity
                onPress={() => {
                  // deleteComment(elem?.item?.id);
                }}>
                <Antdesign
                  name={'delete'}
                  size={moderateScale(15, 0.1)}
                  color={textColor}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          {elem?.item?.user_id == userID ? (
            <View style={s.icon}>
              <TouchableOpacity
                onPress={() => {
                  // onEdit(elem?.item?.id, elem?.item?.text);
                }}>
                <Entypo
                  name={'edit'}
                  size={moderateScale(15, 0.1)}
                  color={textColor}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    );
  };
  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: color}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: moderateScale(20, 0.1),
        }}>
        <View
          style={{
            position: 'absolute',
            left: moderateScale(10, 0.1),
          }}>
          <Header navigation={navigation} />
        </View>
        <View>
          <Text style={[s.HeadingText, {color: textColor}]}>Comments</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[s.container, {backgroundColor: color}]}>
        <View style={s.caption}>
          <View style={[s.dp, {borderColor: getColor(post?.user?.group)}]}>
            <Image
              source={{uri: post?.user?.image ? post?.user?.image : dummyImage}}
              style={s.dp1}
              resizeMode={'cover'}
            />
          </View>
          <TouchableOpacity style={{width: '75%', alignSelf: 'center'}}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[s.name, s.nameBold, {color: textColor}]}>
                  {post?.user?.name} {post?.user?.last_name}
                  <Text style={[s.name1]}> {post?.caption}</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          ref={flatListRef}
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          scrollEnabled={true}
          extraData={refresh}
          getItemLayout={getItemLayout}
        />
        {userData ? (
          <View style={{}}>
            <Input
              w="100%"
              height={moderateScale(50, 0.1)}
              variant="rounded"
              color={textColor}
              placeholder="Add Comment ..."
              placeholderTextColor={'grey'}
              value={comment}
              onChangeText={text => {
                setComment(text);
              }}
              borderColor={textColor}
              marginTop={moderateScale(10, 0.1)}
              fontSize={moderateScale(12, 0.1)}
              InputLeftElement={
                <View
                  style={[
                    s.smallDp,
                    {
                      borderColor: getColor(userData?.group),
                    },
                  ]}>
                  {userData?.image ? (
                    <Image
                      source={{uri: userData?.image}}
                      style={s.dp1}
                      resizeMode={'cover'}
                    />
                  ) : null}
                </View>
              }
              InputRightElement={
                <TouchableOpacity
                  onPress={() => {
                    setComment('');
                    // if (route?.params?.from) {
                    //   addComment(data?.id);
                    // } else {
                    //   addComment(Pid);
                    // }
                  }}
                  style={{marginRight: moderateScale(20, 0.1)}}>
                  <Feather
                    name={'send'}
                    size={moderateScale(20, 0.1)}
                    color={textColor}
                  />
                </TouchableOpacity>
              }
            />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Comments;

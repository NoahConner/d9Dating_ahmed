import {TouchableOpacity, Text, SafeAreaView, View, Image} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import {dummyImage, getColor, socketComment, socketCommentDelte} from '../../../../Constants/Index';
import { socket } from '../../../../Navigation/BottomTabs';

const Comments = ({navigation, route}) => {
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const {data} = route.params;
  const {token} = useAppContext(AppContext);
  const theme = useSelector(state => state.reducer.theme);
  const organizations = useSelector(state => state.reducer.organization);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [comment, setComment] = useState('');
  const [commentID, setCommentID] = useState('');
  const [comments, setComments] = useState(data?.post_comments);
  const [loader, setLoader] = useState(true);
  const [userID, setUserID] = useState('');
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [userData, setUserData] = useState(route?.params?.data?.user_id);
  const [myData, setMyData] = useState('');
  const [post, setPost] = useState(null);
  const Cid = route?.params?.data?.id;
  const Pid = route?.params?.data?.Pid;
  useEffect(() => {
    setUserData(route?.params?.data?.user_id)
    getID();
    notifcaitons()
  }, []);
  const notifcaitons = () => {
    if (route?.params?.from) {
      if (route?.params?.from == 'home') {
        getPosts(data?.id);
      } else {
        getPublicPosts(data?.id);
      }
    } else {
      getPosts(Pid);
      getPublicPosts(Pid);
    }
  }

  const getID = async () => {
    const id = await AsyncStorage.getItem('id');
    setUserID(id);
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
    socketComment(postid, userData, myData?.id)

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
    await axiosconfig
      .get('user_details', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        getUpdatedComments(res.data.post_friends, postid);
      })
      .catch(err => {
        setLoader(false);
        console.error(err);
      });
  };

  const getPublicPosts = async postid => {
    await axiosconfig
      .get('fun-interaction', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        getUpdatedComments(res?.data?.post_public, postid);
      })
      .catch(err => {
        setLoader(false);
        console.error(err);
      });
  };
  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('userData');
      setMyData(JSON.parse(data));
    };
    getData();
    const handleComment = ({postId, postUserId, myId}) => {
      if (postUserId == userData) {
        notifcaitons()
      }
    };

    const handleSocketComment = ({postId, postUserId, myId}) => {
      handleComment({postId, postUserId, myId});
    };
    const handleCommentDelete = ({postId, postUserId, myId}) => {
        notifcaitons()
    };
    const handleSocketCommentDelete = ({postId, postUserId, myId}) => {
      handleCommentDelete({postId, postUserId, myId});
    };
    socket.on('comment', handleSocketComment);
    socket.on('commentDelete', handleSocketCommentDelete);

    return () => {
      socket.off('comment', handleSocketComment);
      socket.off('commentDelete', handleSocketCommentDelete);
    };
  }, [socket, myData]);
  const getUpdatedComments = (array, postid) => {
    let temp = array.filter(elem => elem.id == postid);
    setPost(temp[0]);
    setComments(temp[0]?.post_comments);
    matchId(temp[0]?.post_comments);
    setLoader(false);
    setRefresh(!refresh);
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
                  deleteComment(elem?.item?.id);
                  socketCommentDelte(elem?.item?.post_id, elem?.item?.user_id, myData?.id);
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
                  onEdit(elem?.item?.id, elem?.item?.text);
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
        {myData ? (
          <View style={{marginBottom: 20}}>
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
                      borderColor: getColor(myData?.group),
                    },
                  ]}>
                  {myData?.image ? (
                    <Image
                      source={{uri: myData?.image}}
                      style={s.dp1}
                      resizeMode={'cover'}
                    />
                  ) : null}
                </View>
              }
              InputRightElement={
                <TouchableOpacity
                  onPress={() => {
                    if (route?.params?.from) {
                      addComment(data?.id);
                    } else {
                      addComment(Pid);
                    }
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

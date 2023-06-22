import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  Image,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import {Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import RBSheet from 'react-native-raw-bottom-sheet';
import axiosconfig from '../../../../Providers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import {useIsFocused} from '@react-navigation/native';
import io from 'socket.io-client';
import socket from '../../../../utils/socket';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Loader} from '../../../../Components/Index';
import {
  dummyImage,
  getColor,
  socketComment,
  socketLike,
  handlePostAction,
} from '../../../../Constants/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {theme, getPosts, getAllUsers} from '../../../../Constants/Index';
import SearchList from '../../../../Components/searchList';
import Post from '../../../../Components/Post';
import {Keyboard} from 'react-native';

const FunInteraction = ({navigation}) => {
  const refRBSheet1 = useRef();
  const isFocused = useIsFocused();
  const {token, userData} = useAppContext(AppContext);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [postId, setPostId] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [loader, setLoader] = useState(false);
  const [current, setCurrent] = useState('');
  const [comment, setComment] = useState('');
  const [itemHeights, setItemHeights] = useState([]);
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searching, setSearching] = useState(false);
  const route = useRoute();
  const flatListRef = useRef(null);
  const [loadingStates, setLoadingStates] = useState({});
  const postID = route?.params?.data?.id;
  const reportReasons = [
    "i just don't like it",
    'its spam',
    'Nudity or sexual activity',
    'Hate speech or symbols',
    'Violence or dangerous orgnisations',
    'Bullying or harrasment',
  ];

  useEffect(() => {
    console.log(userData, 'userD');
    getData();
    console.log(users);
  }, [isFocused]);

  const getData = () => {
    getFunPosts();
    getAllUsers(setLoader, setUsers, token);
  };

  const getFunPosts = async () => {
    getPosts(setLoader, setPosts, token, 'fun');
  };

  useEffect(() => {
    const handleLike = ({postId, postUserId, myId}) => {
      setPosts(prevPosts => {
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
      setPosts(prevPosts => {
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

  const handleReport = async (api, data) => {
    handlePostAction(api, data, setLoader, setPosts, token);
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
    getPosts(setLoader, setPosts, token, 'fun');
  };

  const onSearch = text => {
    setSearchText(text);
    if (text) {
      const temp = text.toLowerCase();
      const tempList = users.filter(item => {
        let name = item?.name?.toLowerCase();
        if (name?.match(temp)) return item;
      });

      setFiltered(tempList);
    } else {
      setFiltered([]);
    }
  };

  const clear = () => {
    Keyboard.dismiss();
    setVisible(false);
    setSearchText('');
    setFiltered([]);
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: color}}>
      <View style={[s.container, s.col, {backgroundColor: color}]}>
        <View style={s.searchContainer}>
          <Input
            zIndex={10000}
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
                {visible ? (
                  <Entypo
                    name={'cross'}
                    size={moderateScale(20, 0.1)}
                    color={'#B9B9B9'}
                  />
                ) : null}
              </TouchableOpacity>
            }
            onFocus={() => setVisible(true)}
            color={'#fff'}
            backgroundColor={'#595757'}
          />
        </View>

        <View style={s.funView}></View>

        {visible ? (
          <SearchList
            visible={visible}
            setVisible={setVisible}
            navigation={navigation}
            clear={clear}
            filtered={filtered}
          />
        ) : (
          <FlatList
            ref={flatListRef}
            data={posts}
            renderItem={elem =>
              Post(
                elem,
                current,
                comment,
                setComment,
                setCurrent,
                setLoader,
                setPosts,
                navigation,
                refRBSheet1,
                setPostId,
                token,
                'fun',
                userData,
              )
            }
            keyExtractor={(item, index) => String(index)}
            scrollEnabled={true}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            getItemLayout={getItemLayout}
            extraData={refresh}
          />
        )}

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
          <View style={s.report}>
            <Text style={[s.rb, {color: textColor}]}>Report</Text>
          </View>
          <View style={s.gap}>
            <View style={[s.hv]}>
              <Text style={[s.hv, {color: textColor}]}>
                Why are you reporting this post?
              </Text>
            </View>

            <Text style={[s.txt]}>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before final copy is available
            </Text>

            <View style={{display: 'flex'}}>
              <View style={s.list}>
                <Text style={[s.listTxt, {color: textColor}]}></Text>
              </View>
              {reportReasons.map(reason => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleReport('report-post', {
                        post_id: postId,
                        reason: reason,
                      });
                    }}
                    style={s.list}>
                    <View>
                      <Text style={[s.listTxt, {color: textColor}]}>
                        {reason}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};

export default FunInteraction;

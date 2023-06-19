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
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import {Input, Button, Stack, Menu, Pressable} from 'native-base';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosconfig from '../../../provider/axios';
import {useIsFocused} from '@react-navigation/native';
import {
  setOrganization,
  setStories,
  addSocketUsers,
} from '../../../Redux/actions';
import {
  dummyImage,
  getColor,
  requestCameraPermission,
  requestExternalWritePermission,
  socketComment,
  socketLike,
  width,
} from '../../../Constants/Index';
import {Loader} from '../../../Components/Index';
import {AppContext, useAppContext} from '../../../Context/AppContext';
import moment from 'moment';
import {ActivityIndicator} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {socket} from '../../../Navigation/BottomTabs';

const Organization = [
  {id: 'Alpha Phi Alpha Fraternity, Inc.', color: 'blue'},
  {id: 'Alpha Kappa Alpha Sorority Inc.', color: 'green'},
  {id: 'Omega Psi Phi Fraternity, Inc.', color: 'red'},
  {id: 'Delta Sigma Theta Sorority Inc.', color: 'yellow'},
  {id: 'Kappa Alpha Psi Fraternity, Inc.', color: 'orange'},
  {id: 'Sigma Gamma Rho Sorority Inc.', color: 'brown'},
  {id: 'Phi Beta Sigma Fraternity, Inc.', color: 'pink'},
  {id: 'Zeta Phi Beta Sorority Inc.', color: 'purple'},
  {id: 'Iota Phi Theta Fraternity, Inc.', color: 'blue'},
];

const Home = ({navigation, route}) => {
  const dispatch = useDispatch();

  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const flatListRef = useRef(null);
  const isFocused = useIsFocused();
  const theme = useSelector(state => state.reducer.theme);
  const {token, storyLoader} = useAppContext(AppContext);
  const storyID = useSelector(state => state.reducer.storyID);
  const storiesData = useSelector(state => state.reducer.stories);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [refresh, setRefresh] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [myStories, setMyStories] = useState([]);
  const [storyCircle, setStoryCircle] = useState('green');
  const [loader, setLoader] = useState(true);
  const [posts, setPosts] = useState([]);
  const [userID, setUserID] = useState('');
  const [comment, setComment] = useState('');
  const [current, setCurrent] = useState('');
  const [otherStories, setOtherStories] = useState([]);
  const [postId, setPostId] = useState(null);
  const [userData, setUserData] = useState('');
  const [text, setText] = useState(null);
  const [funPostsData, setFunPostsData] = useState('');
  let userList = [];
  const {setLiked} = useAppContext(AppContext);
  const socketUsers = useSelector(state => state.reducer.socketUsers);
  const postID = route?.params?.data?.id;
  const [myData, setMyData] = useState('');
  const [loadingStates, setLoadingStates] = useState({});
  const toast = useToast();
  useEffect(() => {
    dispatch(setOrganization(Organization));
    getAllUsers();
    getPosts(null, true);
    if (postID) {
      getPosts(postID, true);
    } else {
      getPosts(null, true);
    }
    getStories();
    getID();
    funPosts();
  }, [isFocused]);

  const getAllUsers = async () => {
    setLoader(true);
    await axiosconfig
      .get('users-connect', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        const sourceData = [...res?.data?.friends, ...res?.data?.public];
        userList = sourceData;
      })
      .catch(err => {
        console.error(err);
      });
  };
  useEffect(() => {
    socket.on('users', users => {
      users.forEach(user => {
        user.self = user.userID === socket.id;
      });
      dispatch(addSocketUsers(users));
    });
  }, [socket]);

  useEffect(() => {
    getID();
  }, []);

  const getID = async () => {
    const id = await AsyncStorage.getItem('id');
    setUserID(id);
    getData(id);
  };

  const getData = async id => {
    setLoader(true);
    axiosconfig
      .get(`user_view/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setUserData(res?.data?.user_details);
        const data = JSON.stringify(res?.data?.user_details);
        AsyncStorage.setItem('userData', data);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
      });
  };
  const matchId = (postId, id) => {
    postId.map((post, index) => {
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

  const getPosts = async (pid, loaderCondition) => {
    if (loaderCondition) {
      setLoader(true);
    }

    try {
      const response = await axiosconfig.get('user_details', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      console.log(response, 'hello');
      setPosts(response?.data?.post_friends);
      if (pid) {
        matchId(response?.data?.post_friends, pid);
      } else {
      }

      setOtherStoriesData(response?.data?.stories);
      myStoryData(response?.data?.myStories);
    } catch (error) {
      console.error(error);
    } finally {
      if (loaderCondition) {
        setLoader(false);
      }
    }
  };

  const funPosts = async () => {
    setLoader(true);
    await axiosconfig
      .get('fun-interaction', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        setFunPostsData(res?.data?.post_public);
        console.log(res?.data);
        setLoader(false);
      })
      .catch(err => {
        console.log(err);
        setLoader(false);
      });
  };
  const report = async repText => {
    setLoader(true);
    const data = {
      post_id: postId,
      text: repText,
    };
    await axiosconfig
      .post('post-report', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        getPosts(null, true);
        refRBSheet1.current.close();
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
      });
  };
  const hide = async id => {
    setLoader(true);
    await axiosconfig
      .get(`post_action/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        getPosts(null, true);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.error(err, 'hide error');
      });
  };

  const setOtherStoriesData = data => {
    let temp = [];

    data?.forEach(elem => {
      let tempelem = {
        user_id: elem.id,
        profile: elem.image ? elem?.image : dummyImage,
        group: elem.organization,
        username: elem.name + ' ' + elem.last_name,
        title: elem.name + ' ' + elem.last_name,
        stories: elem.stories.map(item => {
          return {
            id: item.story_id,
            url: item.story_image,
            type: 'image',
            duration: 10,
            isReadMore: true,
            url_readmore: 'https://github.com/iguilhermeluis',
            created: elem.created_at,
          };
        }),
      };
      temp.push(tempelem);
    });
    setOtherStories(temp);
    setLoader(false);
  };

  const hitLike = async (id, index, data) => {
    await axiosconfig
      .get(`like/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        setLoadingStates(prevState => ({
          ...prevState,
          [id]: false,
        }));
      })
      .catch(err => {
        setLoader(false);
      });
  };
  useEffect(() => {
    const handleLike = ({postId, postUserId, myId}) => {
      console.log('dummy socket');
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
  
    const handleComment = ({ postId, postUserId, myId }) => {
      setPosts(prevPosts => {
        return prevPosts.map(post => {
          if (post.id == postId) {
            const updatedPost = { ...post };
            updatedPost.post_comments.push(myId);
            return updatedPost;
          }
          return post;
        });
      });
    };
  
    const handleCommentDelete = ({ postId, postUserId, myId }) => {
      setPosts(prevPosts => {
        return prevPosts.map(post => {
          if (post.id == postId) {
            const updatedPost = { ...post };
            const index = updatedPost.post_comments.indexOf(myId);
            if (index > -1) {
              updatedPost.post_comments.splice(index, 1);
            } else {
              var removeIndex = updatedPost.post_comments.map(item => item?.user_id).indexOf(myId);
              updatedPost.post_comments.splice(removeIndex, 1);}
            return updatedPost;
          }
          return post;
        });
      });
    };
  
    const handleRequest = ({ from, to, type }) => {
      if (to == myData?.id && (type == 'connect' || type == 'disconnect')) {
        getPosts(null, false);
      }
    };
  
    const getData = async () => {
      const data = await AsyncStorage.getItem('userData');
      setMyData(JSON.parse(data));
    };
  
    const handleSocketComment = handleComment;
    const handleSocketCommentDelete = handleCommentDelete;
    const handleSocketRequest = handleRequest;
  
    socket.on('comment', handleSocketComment);
    socket.on('commentDelete', handleSocketCommentDelete);
    socket.on('request', handleSocketRequest);
  
    getData();
  
    return () => {
      socket.off('comment', handleSocketComment);
      socket.off('commentDelete', handleSocketCommentDelete);
      socket.off('request', handleSocketRequest);
    };
  }, [socket, myData]);
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
  const requestExternalReadPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      quality: 0.5,
      maxWidth: 1000,
      maxHeight: 1000,
      videoQuality: 'low',
      durationLimit: 30,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    let isReadStoragePermitted = await requestExternalReadPermission();

    if (isCameraPermitted || isStoragePermitted || isReadStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        let source = response;
        refRBSheet.current.close();
        convert(source);
      });
    }
  };

  const chooseFile = async type => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
      } else if (res.error) {
      } else if (res.customButton) {
        alert(res.customButton);
      } else {
        let source = res;
        refRBSheet.current.close();
        convert(source);
      }
    });
  };

  const _onPress = async imageToeEdit => {
    setTimeout(() => {
      try {
        PhotoEditor.Edit({
          path:
            Platform.OS == 'ios'
              ? imageToeEdit
              : RNFS.DocumentDirectoryPath + '/photo.jpg',
          hiddenControls: ['save'],
          colors: undefined,
          onDone: res => {
            convertToBase64(`file://${res}`);
            let temp = storiesData?.[0]?.stories
              ? storiesData[0].stories
              : storiesData;
            temp.push({
              id: storiesData[0]?.stories?.length + 1,
              url: `file://${res}`,
              type: 'image',
              duration: 30,
              isReadMore: true,
              url_readmore: 'https://github.com/iguilhermeluis',
              created: new Date(),
            });
            // setMyStories(temp);
            dispatch(setStories([{...storiesData[0], stories: temp}]));
          },
          onCancel: () => {},
        });
      } catch (err) {
        console.error(err);
      }
    }, 1000);
  };
  const convert = source => {
    if (Platform.OS == 'ios') {
      _onPress(source.assets[0].uri);
    } else {
      let photoPath = RNFS.DocumentDirectoryPath + '/photo.jpg';
      RNFS.moveFile(source.assets[0].uri, photoPath)
        .then(() => {
          _onPress();
        })
        .catch(err => {});
    }
  };

  const convertToBase64 = async image => {
    await RNFS.readFile(image, 'base64')
      .then(res => {
        let base64 = `data:image/png;base64,${res}`;
        createStory(base64);
      })
      .catch(err => {});
  };

  const createStory = async base64 => {
    setLoader(true);
    if (!base64) {
      s;
      setLoader(false);
      return;
    }
    const data = {
      story_id: storiesData[0]?.stories?.length + 1,
      image: base64,
      swipe_text: 'Custom swipe text for this story',
      privacy_option: '1',
    };
    await axiosconfig
      .post(`story_store`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        setStoryCircle('green');
        getStories();
        dispatch(set);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        getStories();
      });
  };

  const handleRefresh = () => {
    getID();
    funPosts();
  };

  const addComment = async (id, index) => {
    if (comment) {
      setLoader(true);
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
          // getPosts(null,true);
          setRefresh(!refresh);
          setLoader(false);
        })
        .catch(err => {
          setLoader(false);
          setComment('');
        });
    }
  };

  const getStories = async token => {
    setLoader(true);
    await axiosconfig
      .get('story_index', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        createStoryData(res.data?.user, token);
      })
      .catch(err => {
        setLoader(false);
      });
  };

  const createStoryData = (data, token) => {
    let temp = {
      user_id: data.id,
      profile: data.image ? data.image : dummyImage,
      organization: data.organization,
      username: data.name + ' ' + data.last_name,
      title: data.name + ' ' + data.last_name,
      stories: data.stories.map(elem => {
        return {
          id: elem.story_id,
          url: elem.story_image,
          type: 'image',
          duration: 10,
          isReadMore: true,
          url_readmore: 'https://github.com/iguilhermeluis',
          created: data.created_at,
        };
      }),
    };
    dispatch(setStories([temp]));
    setLoader(false);
  };

  const deleteStory = async id => {
    setLoader(true);
    await axiosconfig
      .get(`story_delete/${storyID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        toast.show(res?.data?.message, {
          type: 'success',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'zoom-in',
        });
        getStories(token);
        id(false);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
      });
  };

  const deletePost = async id => {
    setLoader(true);
    await axiosconfig
      .get(`post_delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(async res => {
        toast.show(res?.data?.message, {
          type: 'success',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'zoom-in',
        });
        await getPosts(token, true);
        setTimeout(() => {
          setLoader(false);
        }, 0);
      })
      .catch(err => {
        setLoader(false);
      });
  };
  const myStoryData = elem => {
    let temp = [
      {
        user_id: elem.id,
        profile: elem.image ? elem?.image : dummyImage,
        group: elem.organization,
        username: elem.name + ' ' + elem.last_name,
        title: elem.name + ' ' + elem.last_name,
        stories: elem.user_stories.map(item => {
          return {
            id: item.id,
            url: item.image,
            type: 'image',
            duration: 10,
            isReadMore: true,
            url_readmore: 'https://github.com/iguilhermeluis',
            created: elem.created_at,
          };
        }),
      },
    ];
    setMyStories(temp);
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
                  hide(elem?.item?.id);
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
                  <Menu.Item
                    onPress={() =>
                      deleteAlert(
                        'Delete Post',
                        'Are you sure you want to delete this post?',
                        elem?.item?.id,
                      )
                    }>
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
            onPress={() =>
              handleDoubleTap(elem?.item?.id, elem?.index, elem?.item?.user)
            }>
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
              hitLike(elem?.item?.id, elem?.index, elem?.item?.user);
              socketLike(
                elem?.item?.id,
                elem?.item?.user_id,
                userID,
                !liked ? 'like' : 'dislike',
              );
            }}
            disabled={loadingStates[elem?.item?.id]}
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
              navigation.navigate('Likes', {data: elem?.item?.post_likes});
            }}
            style={{marginBottom: moderateScale(5, 0.1)}}>
            {elem?.item?.post_likes?.length ? (
              <Text style={[s.name, {color: textColor}]}>
                {`Liked by ${elem?.item?.post_likes[0]?.users?.name} ${elem?.item?.post_likes[0]?.users?.last_name} `}
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
                    addComment(elem?.item?.id, elem?.index);
                    socketComment(elem?.item?.id, elem?.item?.user_id, userID);
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

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: color}}>
      <View style={[s.container, s.col, {backgroundColor: color}]}>
        <ScrollView
          scrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            height: moderateScale(120, 0.1),
            marginVertical: moderateScale(20, 0.1),
            flexDirection: 'row',
          }}>
          {myStories?.[0]?.stories?.length > 0 ? (
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
                data={myStories}
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
          ) : null}
        </ScrollView>

        <TouchableOpacity
          style={s.funView}
          onPress={() => {
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
        <View style={{height: moderateScale(22, 0.1)}}></View>
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
            keyExtractor={(item, index) => String(index)}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            scrollEnabled={true}
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
              onPressIn={() => captureImage('photo')}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="camera" style={s.capturebtnicon} />
                <Text style={s.capturebtntxt}>Open Camera</Text>
              </View>
            </Button>
            <Button
              transparent
              style={s.capturebtn}
              onPressIn={() => chooseFile('photo')}>
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

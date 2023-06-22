import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import socket from '../../../utils/socket';
import Stories from '../../../Stories/App';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native';
import Fun from '../../../assets/images/svg/fun.svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import Loader from '../../../Components/Loader';
import axiosconfig from '../../../provider/axios';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CustomAlert from '../../../Components/AlertModal';
import {AppContext, useAppContext} from '../../../Context/AppContext';
import {
  dummyImage,
  theme,
  socketLike,
  handlePostAction,
  getPosts,
  getAllUsers,
} from '../../../Constants/Index';
import {postApi} from '../../../APIs';
import Post from '../../../Components/Post';
import RBSheetCam from '../../../Components/RBSheetCam';
import RBSheetReport from '../../../Components/RBSheetReport';

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
const Home = ({navigation, route}) => {
  const {token, setUserData, userData} = useAppContext(AppContext);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const flatListRef = useRef(null);
  const isFocused = useIsFocused();
  const userToken = token;
  const [storiesData, setStoriesData] = useState([]);
  const [users, setUsers] = useState([]);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [refresh, setRefresh] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [storyCircle, setStoryCircle] = useState('green');
  const [loader, setLoader] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');
  const [current, setCurrent] = useState('');
  const [otherStories, setOtherStories] = useState(otherStoriesDummy);
  const [postId, setPostId] = useState(null);
  const [funPostsData, setFunPostsData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});

  const reportReasons = [
    "i just don't like it",
    'its spam',
    'Nudity or sexual activity',
    'Hate speech or symbols',
    'Violence or dangerous orgnisations',
    'Bullying or harrasment',
  ];

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    getHomePosts();
    // getStories();
    getMyData();
    getAllUsers(setLoader, setUsers, token);
    getFunPosts();
  };

  const getHomePosts = async () => {
    getPosts(setLoader, setPosts, token, 'home');
  };

  const getFunPosts = async () => {
    getPosts(setLoader, setFunPostsData, token, 'fun');
  };

  const getMyData = async () => {
    setLoader(true);
    const res = await postApi('profile', {}, token);
    if (res?.success) {
      console.log(res?.data, 'userData');
      setUserData(res?.data);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const getItemLayout = (data, index) => ({
    length: 500,
    offset: 500 * index,
    index,
  });

  const handleReport = async (api, data) => {
    handlePostAction(api, data, setLoader, setPosts, token);
  };

  useEffect(() => {
    const handleLike = ({postId, postUserId, myId}) => {
      console.log('here');
      setPosts(prevPosts => {
        return prevPosts.map(post => {
          if (post.id === postId) {
            const updatedPost = {...post};
            const likesIndex = updatedPost.likes.findIndex(
              like => like.user_id === myId,
            );
            if (likesIndex !== -1) {
              updatedPost.likes.splice(likesIndex, 1);
            } else {
              const myLikesIndex = updatedPost.likes.findIndex(
                like => like.user_id === myId,
              );
              if (myLikesIndex !== -1) {
                updatedPost.likes.splice(myLikesIndex, 1);
              }
              if (users) {
                users?.map(user => {
                  if (user?.id == myId) {
                    updatedPost = {...updatedPost, liked_by_me: 'true'};
                    updatedPost.likes.push({
                      user_id: myId,
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

  useEffect(() => {
    setStoryCircle('green');
    // console.log(storiesData);
  }, [storiesData]);

  const handleRefresh = () => {
    getHomePosts();
    // getStories();
    getMyData();
  };

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

  return (
    <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: color}}>
      {loader ? <Loader /> : null}

      <View style={[s.container, s.col, {backgroundColor: color}]}>
        <ScrollView
          scrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.hscroll}>
          {storiesData[0]?.stories?.length ? (
            <View key={storiesData?.length}>
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
            </View>
          ) : (
            <View key={storiesData?.length} style={s.myStory}>
              <Image
                source={{
                  uri: userData?.image ? userData?.image : dummyImage,
                }}
                style={s.storyImg}
                resizeMode={'cover'}
              />
              <Text style={[s.userName, {color: textColor}]}>
                {userData?.name?.substring(0, 1).toUpperCase()}
                {userData?.name?.substring(1, userData?.name?.length)}
                {/* {userData?.last_name} */}
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
        <View style={{height: moderateScale(40, 0.1)}}></View>
        {!posts?.length ? (
          <View style={s.empty}>
            <Text style={[s.textCreate, {color: textColor}]}>
              {`What's on your mind`}{' '}
              {userData?.name?.substring(0, 1).toUpperCase()}
              {userData?.name?.substring(1, userData?.name?.length)}
              {'?'}
            </Text>
            <TouchableOpacity
              style={s.btn}
              onPress={() =>
                navigation.navigate('CreatePostStack', {screen: 'CreatePost'})
              }>
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
            renderItem={(elem, index) =>
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
                'home',
                userData,
              )
            }
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

      <RBSheetCam refRBSheet={refRBSheet} setData={setStoriesData} />
      <RBSheetReport
        refRBSheet={refRBSheet1}
        reportReasons={reportReasons}
        handleReport={() => {
          handleReport('report-post', {
            post_id: postId,
            reason: reason,
          });
        }}
        loader={loader}
      />
    </SafeAreaView>
  );
};

export default Home;

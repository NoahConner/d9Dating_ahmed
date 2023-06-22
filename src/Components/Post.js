import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  getColor,
  theme,
  handlePostAction,
  dummyImage,
  handleDoubleTap,
} from '../Constants/Index';
import {moderateScale} from 'react-native-size-matters';
import {Menu, Pressable, Input} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Antdesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const loadingStates = {};

const Post = (
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
  screen,
  userData,
) => {
  const {
    caption,
    user,
    post_img,
    address,
    id,
    likes,
    comments,
    created_at,
    hided_by_me,
    liked_by_me,
    reported_by_me,
    type,
    blocked,
  } = elem?.item;

  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';

  if (hided_by_me == 'true' || reported_by_me == 'true' || blocked == 'true') {
    null;
  } else {
    return (
      <View style={s.col} key={elem?.index}>
        <View style={s.header}>
          <View style={[s.dp, {borderColor: getColor(user?.organization)}]}>
            <Image
              source={{
                uri: user?.image ? user?.image : dummyImage,
              }}
              style={s.dp1}
              resizeMode={'cover'}
            />
          </View>
          <View style={[s.col, s.userName]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ViewUser', {id: user?.id})}>
              <Text style={[s.name, s.nameBold, {color: textColor}]}>
                {user?.name} {user?.last_name}
              </Text>
            </TouchableOpacity>

            <Text style={[s.textRegular, {color: textColor}]}>{address}</Text>
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
              {hided_by_me == 'false' ? (
                <Menu.Item
                  onPress={() => {
                    handlePostAction(
                      'hide-post',
                      {
                        post_id: id,
                      },
                      setLoader,
                      setPosts,
                      token,
                      screen,
                    );
                  }}>
                  <View style={[s.optionView]}>
                    <Icon
                      name={'eye-slash'}
                      color={textColor}
                      size={moderateScale(13, 0.1)}
                      style={{flex: 0.3}}
                    />
                    <Text style={[s.optionBtns, {color: textColor}]}>Hide</Text>
                  </View>
                </Menu.Item>
              ) : null}
              {user?.id == userData?.id ? (
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
              {reported_by_me == 'false' && user?.id != userData.id ? (
                <Menu.Item
                  onPress={() => {
                    refRBSheet1.current.open();
                    setPostId(id);
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
              handleDoubleTap(
                'add-like',
                {
                  post_id: id,
                },
                setLoader,
                setPosts,
                token,
                screen,
              );
              //   socketLike(id, user?.id, userData?.id);
            }}>
            <View style={s.img}>
              <Image
                source={{uri: post_img}}
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
              //   hitLike(id, elem?.index, user);
              //   socketLike(id, user.id, userData?.id);
              handlePostAction(
                'add-like',
                {
                  post_id: id,
                },
                setLoader,
                setPosts,
                token,
                screen,
              );
            }}
            style={s.likes}>
            {loadingStates[id] ? (
              <ActivityIndicator size="small" color={'yellow'} />
            ) : (
              <Text style={s.likesCount}>{likes?.length}</Text>
            )}
            <Icon
              name="heart"
              size={moderateScale(12, 0.1)}
              solid
              color={liked_by_me == 'true' ? 'yellow' : '#fff'}
            />
          </TouchableOpacity>
        </View>
        <View style={s.footer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Likes', {data: likes});
            }}
            style={{marginBottom: moderateScale(5, 0.1)}}>
            {likes?.length ? (
              <Text style={[s.name, {color: textColor}]}>
                {`Liked by Ava Simmon `}
                {likes?.length - 1 ? `and ${likes?.length - 1} other` : null}
              </Text>
            ) : null}
          </TouchableOpacity>
          <View style={s.name}>
            <Text style={[s.name, {color: textColor}]}>
              {user?.name}
              {user?.last_name}{' '}
              <Text style={[s.textRegular, {color: textColor}]}>{caption}</Text>
            </Text>
          </View>

          {comments.length ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Comments', {post_id: id});
              }}>
              <Text style={[s.textRegular, {color: 'grey', marginVertical: 0}]}>
                View all {comments?.length} Comments
              </Text>
            </TouchableOpacity>
          ) : null}
          <View style={s.input}>
            <Input
              w="100%"
              selectionColor={textColor}
              cursorColor={textColor}
              variant="unstyled"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              InputLeftElement={
                <View
                  style={[
                    s.smallDp,
                    {
                      borderColor: getColor(user?.organization),
                    },
                  ]}>
                  <Image
                    source={{
                      uri: user?.image ? user?.image : dummyImage,
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
                    handlePostAction(
                      'add-comment',
                      {
                        post_id: id,
                        comment: comment,
                      },
                      setLoader,
                      setPosts,
                      token,
                      screen,
                    );
                    // socketComment(id, user?.id, userData.id);
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

          <Text style={[s.textRegular, s.greyText]}>
            {`${moment(created_at).fromNow()}`}
          </Text>
        </View>
      </View>
    );
  }
};

export default Post;

const s = StyleSheet.create({
  dp: {
    width: moderateScale(50, 0.1),
    height: moderateScale(50, 0.1),
    borderRadius: moderateScale(50 / 2, 0.1),
    borderWidth: moderateScale(2, 0.1),
    marginHorizontal: moderateScale(15, 0.1),
  },

  smallDp: {
    width: moderateScale(25, 0.1),
    height: moderateScale(25, 0.1),
    borderRadius: moderateScale(40 / 2, 0.1),
    borderWidth: moderateScale(2, 0.1),
  },

  name: {
    fontWeight: 700,
    fontSize: moderateScale(13, 0.1),
    lineHeight: moderateScale(15, 0.1),
  },

  img: {
    marginTop: moderateScale(5, 0.1),
    alignSelf: 'center',
    width: moderateScale(360, 0.1),
    height: moderateScale(350, 0.1),
    backgroundColor: '#302D2D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(12, 0.1),
  },

  optionView: {
    flexDirection: 'row',
    borderBottomWidth: moderateScale(1, 0.1),
    borderBottomColor: 'grey',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: moderateScale(5, 0.1),
  },
  optionBtns: {
    fontSize: moderateScale(12, 0.1),
    color: 'red',
    flex: 0.7,
  },
  userName: {
    marginBottom: moderateScale(25, 0.1),
    marginTop: moderateScale(5, 0.1),
    fontSize: moderateScale(11, 0.1),
    width: moderateScale(100, 0.1),
  },

  header: {
    flexDirection: 'row',
    marginBottom: moderateScale(5, 0.1),
  },

  textRegular: {
    fontSize: moderateScale(11, 0.1),
    lineHeight: moderateScale(15, 0.1),
    marginVertical: moderateScale(5, 0.1),
  },
  option: {
    fontSize: moderateScale(14, 0.1),
    marginRight: moderateScale(10, 0.1),
  },
  options: {
    flex: 0.1,
    justifyContent: 'flex-start',
    marginTop: moderateScale(5, 0.1),
    marginRight: moderateScale(-12, 0.1),
  },
  likes: {
    backgroundColor: 'rgba(195, 195, 195, 0.6)',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    width: moderateScale(62, 0.1),
    height: moderateScale(25, 0.1),
    borderRadius: moderateScale(20, 0.1),
    top: moderateScale(20, 0.1),
    right: moderateScale(30, 0.1),
  },
  btn: {
    marginBottom: moderateScale(10, 0.1),
    alignSelf: 'center',
    width: moderateScale(155, 0.1),
    height: moderateScale(40, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    borderRadius: moderateScale(25, 0.1),
  },
  btnTxt: {
    fontSize: moderateScale(15, 0.1),
    lineHeight: moderateScale(19, 0.1),
    color: '#222222',
    marginRight: moderateScale(10, 0.1),
  },
  textCreate: {
    fontSize: moderateScale(15, 0.1),
    marginBottom: moderateScale(15, 0.1),
  },
  line: {
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(80, 0.1),
    borderWidth: moderateScale(2.5, 0.1),
    borderColor: 'rgba(255, 255, 255, 0.44)',
    borderRadius: moderateScale(4, 0.1),
    alignSelf: 'center',
    marginTop: moderateScale(25, 0.1),
  },
  connected: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  likesCount: {
    fontSize: moderateScale(10, 0.1),
    color: '#fff',
  },
  dp1: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(50 / 2, 0.1),
  },
  funView: {
    position: 'absolute',
    zIndex: 1000,
    right: moderateScale(10, 0.1),
    top: moderateScale(120, 0.1),

    flexDirection: 'row',
    alignItems: 'center',
    marginRight: moderateScale(10, 0.1),
  },
  yellow: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
  },
  round: {
    width: moderateScale(25, 0.1),
    height: moderateScale(25, 0.1),
    borderRadius: moderateScale(25 / 2, 0.1),
  },
  round2: {
    marginBottom: moderateScale(25, 0.1),
    marginLeft: moderateScale(-10, 0.1),
    width: moderateScale(14, 0.1),
    height: moderateScale(14, 0.1),
    borderRadius: moderateScale(14 / 2, 0.1),
  },

  count: {
    fontSize: moderateScale(7, 0.1),
    color: '#000',
  },
  funText: {
    fontSize: moderateScale(11, 0.1),
  },
  footer: {
    marginHorizontal: moderateScale(15, 0.1),
    marginVertical: moderateScale(10, 0.1),
  },
  capturebtntxt: {
    fontSize: moderateScale(13, 0.1),
    alignSelf: 'center',
    color: '#fff',
    paddingHorizontal: moderateScale(7, 0.1),
  },
  capturebtnicon: {
    color: '#fff',
    fontSize: moderateScale(25),
  },
  capturebtn: {
    borderColor: '#302D2D',
    flexDirection: 'row',
    borderRadius: moderateScale(10, 0.1),
    width: moderateScale(180, 0.1),
    backgroundColor: '#302D2D',
  },
  report: {
    alignSelf: 'center',
    marginVertical: moderateScale(10, 0.1),
  },
  rbs: {
    alignItems: 'center',
    height: moderateScale(480),
    borderRadius: moderateScale(20, 0.1),
  },
  storyImg: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(65, 0.1),
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    marginBottom: moderateScale(120, 0.1),
  },
  imgOptions: {
    marginVertical: moderateScale(30, 0.1),
    justifyContent: 'center',
    alignContent: 'center',
  },
  gap: {
    paddingHorizontal: moderateScale(13, 0.1),
  },

  greyText: {
    color: 'grey',
    marginVertical: 0,
    textTransform: 'capitalize',
  },
});

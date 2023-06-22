import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import {FlatList} from 'react-native';
import {ScrollView} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {Input} from 'native-base';
import {Header, Loader} from '../../../../Components/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {dummyImage, getColor} from '../../../../Constants/Index';
import {theme} from '../../../../Constants/Index';
import {getApi, postApi} from '../../../../APIs';
import moment from 'moment';

const Comments = ({navigation, route}) => {
  const flatListRef = useRef(null);
  const {data, post_id} = route.params;
  const {token, userData} = useAppContext(AppContext);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [comment, setComment] = useState('');
  const [commentID, setCommentID] = useState('');
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const Cid = route?.params?.data?.id;
  const Pid = route?.params?.data?.Pid;

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    setLoader(true);
    console.log(post_id, 'hadsd');
    const res = await getApi(`my-posts/${post_id}`, token);
    console.log(res, 'return');
    if (res?.success) {
      setComments(res?.data?.comments);
      setPost(res?.data);
    } else {
      Alert.alert(res?.data?.messsage);
    }
    setLoader(false);
  };

  const hanldeCommentAction = async (api, data) => {
    setLoader(true);
    console.log(data, 'datsa');
    const res = await postApi(api, data, token);
    console.log(res, 'return');
    if (res?.success) {
      Alert.alert(res?.messsage);
      setCommentID('');
      setComment('');
      getComments();
    } else {
      Alert.alert(res?.data?.messsage);
    }
    setLoader(false);
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

  const renderItem = (elem, i) => {
    const {comment, created_at, user_id, id} = elem?.item;
    const {image, organization, name, last_name} = elem?.item?.user;
    return (
      <View style={s.card}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={[s.dp, {borderColor: getColor(organization)}]}>
            <Image
              source={{
                uri: image ? image : dummyImage,
              }}
              style={s.dp1}
              resizeMode={'cover'}
            />
          </View>
          <View style={s.details}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ViewUser', {id: user_id});
              }}>
              <Text style={[s.name, s.nameBold, {color: textColor}]}>
                {name} {last_name}
              </Text>
            </TouchableOpacity>
            <View>
              <Text style={[s.textSmall, {color: textColor}]}>{comment}</Text>
            </View>
            <Text style={[s.textSmall, {color: '#787878'}]}>
              {`${moment(created_at).fromNow()}`}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          {post?.user_id == userData?.id || user_id == userData?.id ? (
            <View style={s.icon}>
              <TouchableOpacity
                onPress={() => {
                  let data = {
                    post_id: post_id,
                    comment: comment,
                    id: id,
                    active_status: 0,
                  };
                  console.log('hreert', data);
                  hanldeCommentAction('add-comment', data);
                }}>
                <Antdesign
                  name={'delete'}
                  size={moderateScale(15, 0.1)}
                  color={textColor}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          {user_id == userData?.id ? (
            <View style={s.icon}>
              <TouchableOpacity
                onPress={() => {
                  setCommentID(id);
                  setComment(comment);
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
      <View style={s.maincontainer}>
        <View style={s.header}>
          <Header navigation={navigation} />
        </View>
        <Text style={[s.HeadingText, {color: textColor}]}>Comments</Text>
      </View>

      <ScrollView
        contentContainerStyle={[s.container, {backgroundColor: color}]}>
        <View style={s.caption}>
          <View
            style={[s.dp, {borderColor: getColor(post?.user?.organization)}]}>
            <Image
              source={{uri: post?.user?.image ? post?.user?.image : dummyImage}}
              style={s.dp1}
              resizeMode={'cover'}
            />
          </View>
          <TouchableOpacity style={s.user}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[s.name, s.nameBold, {color: textColor}]}>
                {post?.user?.name} {post?.user?.last_name}
                <Text style={[s.name1]}> {`${post?.caption}`}</Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          ref={flatListRef}
          data={comments}
          contentContainerStyle={{flexDirection: 'column-reverse'}}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          scrollEnabled={true}
          extraData={refresh}
          // inverted
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
                      borderColor: getColor(userData?.organization),
                    },
                  ]}>
                  <Image
                    source={{
                      uri: userData?.image ? userData?.image : dummyImage,
                    }}
                    style={s.dp1}
                    resizeMode={'cover'}
                  />
                </View>
              }
              InputRightElement={
                <TouchableOpacity
                  onPress={() => {
                    let data;
                    if (commentID) {
                      data = {
                        post_id: post_id,
                        comment: comment,
                        id: commentID,
                      };
                    } else {
                      data = {
                        post_id: post_id,
                        comment: comment,
                      };
                    }
                    hanldeCommentAction('add-comment', data);
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

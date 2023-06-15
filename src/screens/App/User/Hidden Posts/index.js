import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
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

const HiddenPosts = ({navigation, route}) => {
  const organizations = useSelector(state => state.reducer.organization);
  const theme = useSelector(state => state.reducer.theme);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const isFocused = useIsFocused();
  const {token} = useAppContext(AppContext);
  const [hiddenPosts, setHiddenPosts] = useState();
  const [loader, setLoader] = useState(true);
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
    setLoader(true);
    await axiosconfig
      .get('hide-post-list', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        setHiddenPosts(res?.data);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.error(err,"hello hide res");
      });
  };

  const unhide = async id => {
    setLoader(true);
    let connected;
    await axiosconfig
      .get(`post_action/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        getPosts();
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.error(err);
      });
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
              navigation.navigate('Likes', {data: elem?.item?.post_likes});
            }}
            style={{marginBottom: moderateScale(5, 0.1)}}>
            {elem?.item?.post_likes?.length ? (
              <Text style={[s.name, {color: textColor}]}>
                {`Liked by ${elem?.item?.post_likes[0]?.user_name} ${elem?.item?.post_likes[0]?.last_name} `}
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
              {`${new Date(elem?.item?.created_at)}`}
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

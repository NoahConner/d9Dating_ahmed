import {Text, SafeAreaView, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import Inicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Input, Menu, Pressable} from 'native-base';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axiosconfig from '../../../../Providers/axios';
import {Header, Loader} from '../../../../Components/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {theme} from '../../../../Constants/Index';

const Privacy = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const [story, setStory] = useState('Public');
  const [post, setPost] = useState('Public');
  const [connect, setConnect] = useState('Public');
  const {token} = useAppContext(AppContext);

  const userPrivacy = async () => {
    // setLoader(true);
    const data = {
      privacy_option: connect == '1' ? 'Everyone' : 'Friends of Friends',
    };
    await axiosconfig
      .post('user-privacy', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        // setLoader(false);
      })
      .catch(err => {
        // setLoader(false);
        console.log(err);
      });
  };
  const postprivacy = async () => {
    // setLoader(true);
    const data = {
      privacy_option: post == 'Public' ? '1' : post == 'Friends' ? '2' : '3',
    };
    await axiosconfig
      .post('post-privacy', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        // setLoader(false);
      })
      .catch(err => {
        // setLoader(false);
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: color}}>
      {loader ? <Loader /> : null}
      <Header navigation={navigation} />
      <ScrollView
        contentContainerStyle={[s.container, {backgroundColor: color}]}>
        <View style={{flexDirection: 'row'}}>
          <View style={s.username}>
            <Text style={[s.textBold, {color: textColor}]}>Privacy</Text>
          </View>
        </View>
        <View style={s.inputSection}>
          <View style={s.input}>
            <Input
              w="100%"
              isReadOnly
              variant="underlined"
              color={textColor}
              fontSize={moderateScale(14, 0.1)}
              InputLeftElement={
                <View style={s.icon}>
                  <Inicon
                    name={'images-outline'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={textColor}
                  />
                  <Text style={[s.smallText]}>Who can view my Stories</Text>
                </View>
              }
              style={{marginBottom: moderateScale(40, 0.1)}}
              InputRightElement={
                <Menu
                  w="200"
                  borderWidth={moderateScale(1, 0.1)}
                  borderBottomColor={'grey'}
                  backgroundColor={color}
                  marginRight={moderateScale(20, 0.1)}
                  trigger={triggerProps => {
                    return (
                      <Pressable
                        accessibilityLabel="More options menu"
                        {...triggerProps}
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text style={[s.option, {color: textColor}]}>
                          {story}
                        </Text>

                        <Entypo
                          name={'chevron-down'}
                          size={moderateScale(25, 0.1)}
                          color={textColor}
                        />
                      </Pressable>
                    );
                  }}>
                  <Menu.Item onPress={() => setStory('Public')}>
                    <View style={s.optionView}>
                      <Entypo
                        name={'globe'}
                        color={textColor}
                        size={moderateScale(15, 0.1)}
                        style={{marginRight: moderateScale(10, 0.1)}}
                      />
                      <Text style={[s.optionBtns, {color: textColor}]}>
                        Public
                      </Text>
                    </View>
                  </Menu.Item>
                  <Menu.Item onPress={() => setStory('Friends')}>
                    <View style={s.optionView}>
                      <Icon
                        name={'user-friends'}
                        color={textColor}
                        size={moderateScale(15, 0.1)}
                        style={{marginRight: moderateScale(10, 0.1)}}
                      />
                      <Text style={[s.optionBtns, {color: textColor}]}>
                        Friends
                      </Text>
                    </View>
                  </Menu.Item>
                  <Menu.Item onPress={() => setStory('Only Me')}>
                    <View style={s.optionView}>
                      <Entypo
                        name={'lock'}
                        color={textColor}
                        size={moderateScale(15, 0.1)}
                        style={{marginRight: moderateScale(10, 0.1)}}
                      />
                      <Text style={[s.optionBtns, {color: textColor}]}>
                        Only Me
                      </Text>
                    </View>
                  </Menu.Item>
                </Menu>
              }
              placeholder="My Stories"
              placeholderTextColor={textColor}
            />
          </View>

          <View style={s.input}>
            <Input
              w="100%"
              isReadOnly
              variant="underlined"
              color={textColor}
              fontSize={moderateScale(14, 0.1)}
              InputLeftElement={
                <View style={s.icon}>
                  <Icon1
                    name={'post'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={textColor}
                  />
                  <Text style={[s.smallText]}>Who can view my Posts</Text>
                </View>
              }
              style={{marginBottom: moderateScale(40, 0.1)}}
              InputRightElement={
                <Menu
                  w="200"
                  borderWidth={moderateScale(1, 0.1)}
                  borderBottomColor={'grey'}
                  backgroundColor={color}
                  marginRight={moderateScale(20, 0.1)}
                  trigger={triggerProps => {
                    return (
                      <Pressable
                        accessibilityLabel="More options menu"
                        {...triggerProps}
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text style={[s.option, {color: textColor}]}>
                          {post}
                        </Text>

                        <Entypo
                          name={'chevron-down'}
                          size={moderateScale(25, 0.1)}
                          color={textColor}
                        />
                      </Pressable>
                    );
                  }}>
                  <Menu.Item
                    onPress={() => {
                      setPost('Public');
                      // postprivacy();
                    }}>
                    <View style={s.optionView}>
                      <Entypo
                        name={'globe'}
                        color={textColor}
                        size={moderateScale(15, 0.1)}
                        style={{marginRight: moderateScale(10, 0.1)}}
                      />
                      <Text style={[s.optionBtns, {color: textColor}]}>
                        Public
                      </Text>
                    </View>
                  </Menu.Item>
                  <Menu.Item
                    onPress={() => {
                      setPost('Friends');
                      // postprivacy();
                    }}>
                    <View style={s.optionView}>
                      <Icon
                        name={'user-friends'}
                        color={textColor}
                        size={moderateScale(15, 0.1)}
                        style={{marginRight: moderateScale(10, 0.1)}}
                      />
                      <Text style={[s.optionBtns, {color: textColor}]}>
                        Friends
                      </Text>
                    </View>
                  </Menu.Item>
                  <Menu.Item
                    onPress={() => {
                      setPost('Only Me');
                      // postprivacy();
                    }}>
                    <View style={s.optionView}>
                      <Entypo
                        name={'lock'}
                        color={textColor}
                        size={moderateScale(15, 0.1)}
                        style={{marginRight: moderateScale(10, 0.1)}}
                      />
                      <Text style={[s.optionBtns, {color: textColor}]}>
                        Only Me
                      </Text>
                    </View>
                  </Menu.Item>
                </Menu>
              }
              placeholder="Posts"
              placeholderTextColor={textColor}
            />
          </View>

          <View style={s.input}>
            <Input
              w="100%"
              isReadOnly
              variant="underlined"
              color={textColor}
              fontSize={moderateScale(14, 0.1)}
              InputLeftElement={
                <View style={s.icon}>
                  <MaterialIcons
                    name={'supervised-user-circle'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={textColor}
                  />
                  <Text style={[s.smallText]}>Who can connect me</Text>
                </View>
              }
              style={{marginBottom: moderateScale(40, 0.1)}}
              InputRightElement={
                <Menu
                  w="200"
                  borderWidth={moderateScale(1, 0.1)}
                  borderBottomColor={'grey'}
                  backgroundColor={color}
                  marginRight={moderateScale(20, 0.1)}
                  trigger={triggerProps => {
                    return (
                      <Pressable
                        accessibilityLabel="More options menu"
                        {...triggerProps}
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text style={[s.option, {color: textColor}]}>
                          {connect == '1' ? 'Everyone' : 'Friends of Friends'}
                        </Text>

                        <Entypo
                          name={'chevron-down'}
                          size={moderateScale(25, 0.1)}
                          color={textColor}
                        />
                      </Pressable>
                    );
                  }}>
                  <Menu.Item
                    onPress={() => {
                      setConnect('1');
                      // userPrivacy();
                    }}>
                    <View style={s.optionView}>
                      <Entypo
                        name={'globe'}
                        color={textColor}
                        size={moderateScale(15, 0.1)}
                        style={{marginRight: moderateScale(10, 0.1)}}
                      />
                      <Text style={[s.optionBtns, {color: textColor}]}>
                        Everyone
                      </Text>
                    </View>
                  </Menu.Item>
                  <Menu.Item
                    onPress={() => {
                      setConnect('2');
                      // userPrivacy();
                    }}>
                    <View style={s.optionView}>
                      <Icon
                        name={'users'}
                        color={textColor}
                        size={moderateScale(15, 0.1)}
                        style={{marginRight: moderateScale(10, 0.1)}}
                      />
                      <Text style={[s.optionBtns, {color: textColor}]}>
                        Friends of Friends
                      </Text>
                    </View>
                  </Menu.Item>
                </Menu>
              }
              placeholder="Connect"
              placeholderTextColor={textColor}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Privacy;

import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button, Stack, Menu, Pressable, Input, ScrollView} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import axiosconfig from '../../../provider/axios';
import {Header, Loader} from '../../../Components/Index';
import {
  captureImage,
  chooseFile,
  dummyImage,
  getColor,
} from '../../../Constants/Index';
import {AppContext, useAppContext} from '../../../Context/AppContext';
import {theme} from '../../../Constants/Index';

const dummyData = {
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

const CreatePost = ({navigation, route}) => {
  const privacy = route?.params?.elem?.privacy_option;

  const [address, setaddress] = useState('');

  useEffect(() => {
    if (privacy == '1') {
      setStory('Public');
    } else if (privacy == '2') {
      setStory('Friends');
    } else {
      s;
      setStory('Only Me');
    }
  }, []);

  const [filePath, setFilePath] = useState(
    route?.params?.from == 'Home' || route?.params?.from == 'funInteraction'
      ? route?.params?.elem?.image
      : null,
  );

  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState('globe');
  const [caption, setCaption] = useState(
    route?.params?.from == 'Home' || route?.params?.from == 'funInteraction'
      ? route?.params?.elem?.caption
      : null,
  );

  const [loader, setLoader] = useState(false);
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState([]);

  const [value, setValue] = useState([
    {
      label: 'Public',
      value: '1',
      icon: () => (
        <Entypo
          name={'globe'}
          color={Textcolor}
          size={moderateScale(15, 0.1)}
        />
      ),
    },
    {
      label: 'Freinds',
      value: '2',
      icon: () => (
        <Icon
          name={'user-friends'}
          color={Textcolor}
          size={moderateScale(15, 0.1)}
        />
      ),
    },
    {
      label: 'Only me',
      value: '3',
      icon: () => (
        <Entypo name={'lock'} color={Textcolor} size={moderateScale(15, 0.1)} />
      ),
    },
  ]);
  const Textcolor = theme === 'dark' ? '#fff' : '#222222';
  const color = theme === 'dark' ? '#222222' : '#fff';
  const {token} = useAppContext(AppContext);
  const refRBSheet = useRef();
  const [location, setLocation] = useState('');
  const [story, setStory] = useState(
    route?.params?.from == 'Home' || route?.params?.from == 'funInteraction'
      ? route?.params?.elem?.privacy_option
      : 'Public',
  );

  const onsubmit = () => {
    Alert.alert('Post uploaded');
    navigation.navigate('Home');
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setUserData(dummyData);
  };

  return loader ? (
    <Loader />
  ) : (
    <ScrollView
      style={{flex: 1, backgroundColor: theme == 'dark' ? '#222222' : '#fff'}}>
      <View>
        <View style={[s.container]}>
          <View>
            <Header navigation={navigation} />
          </View>
          <View style={s.row}>
            <View
              style={{
                borderWidth: moderateScale(2, 0.1),
                borderColor: getColor(userData?.group),
                width: moderateScale(58, 0.1),
                height: moderateScale(58, 0.1),
                borderRadius: moderateScale(58 / 2, 0.1),
                marginHorizontal: moderateScale(10, 0.1),
              }}>
              <Image
                style={s.headerImage}
                source={{uri: userData?.image ? userData?.image : dummyImage}}
              />
            </View>
            <View style={{flex: 0.8, alignSelf: 'center'}}>
              <View>
                <Text style={[s.HeadingTxt, {color: Textcolor}]}>
                  {userData?.name} {userData?.last_name}
                </Text>
              </View>
              <View style={[s.btn]}>
                <Menu
                  w="180"
                  borderWidth={moderateScale(1, 0.1)}
                  borderBottomColor={'grey'}
                  backgroundColor={color}
                  // top={moderateScale(24, 0.1)}
                  borderColor={Textcolor}
                  trigger={triggerProps => {
                    return (
                      <Pressable
                        accessibilityLabel="More options menu"
                        {...triggerProps}
                        style={{
                          flexDirection: 'row',
                          borderColor: Textcolor,
                          borderWidth: 1,
                          marginVertical: moderateScale(7),
                          borderRadius: moderateScale(8, 0.1),
                          paddingLeft: moderateScale(10, 0.1),
                          width: moderateScale(180, 0.1),
                          height: moderateScale(33, 0.1),
                          alignItems: 'center',
                        }}>
                        <Entypo
                          name={icon}
                          color={Textcolor}
                          size={moderateScale(15, 0.1)}
                          style={{flex: 0.2}}
                        />
                        <Text style={[s.option, {color: Textcolor, flex: 0.6}]}>
                          {story}
                        </Text>

                        <Entypo
                          style={{flex: 0.2}}
                          name={'chevron-down'}
                          size={moderateScale(25, 0.1)}
                          color={Textcolor}
                        />
                      </Pressable>
                    );
                  }}>
                  <Menu.Item
                    onPress={() => {
                      setStory('Public');
                      setIcon('globe');
                    }}>
                    <View style={s.optionView}>
                      <Entypo
                        name={'globe'}
                        color={Textcolor}
                        size={moderateScale(15, 0.1)}
                        style={{marginRight: moderateScale(10, 0.1)}}
                      />
                      <Text style={[s.optionBtns, {color: Textcolor}]}>
                        Public
                      </Text>
                    </View>
                  </Menu.Item>
                  <Menu.Item
                    onPress={() => {
                      setStory('Friends');
                      setIcon('users');
                    }}>
                    <View style={s.optionView}>
                      <Entypo
                        name={'users'}
                        color={Textcolor}
                        size={moderateScale(15, 0.1)}
                        style={{marginRight: moderateScale(10, 0.1)}}
                      />
                      <Text style={[s.optionBtns, {color: Textcolor}]}>
                        Friends
                      </Text>
                    </View>
                  </Menu.Item>
                  <Menu.Item
                    onPress={() => {
                      setStory('Only Me');
                      setIcon('lock');
                    }}>
                    <View style={s.optionView}>
                      <Entypo
                        name={'lock'}
                        color={Textcolor}
                        size={moderateScale(15, 0.1)}
                        style={{marginRight: moderateScale(10, 0.1)}}
                      />
                      <Text style={[s.optionBtns, {color: Textcolor}]}>
                        Only Me
                      </Text>
                    </View>
                  </Menu.Item>
                </Menu>
              </View>
            </View>
          </View>
          <View style={[s.mText]}>
            <Input
              cursorColor={Textcolor}
              selectionColor={Textcolor}
              variant="unstyled"
              placeholder={'Write a caption....'}
              placeholderTextColor={Textcolor}
              value={caption}
              onChangeText={text => {
                setCaption(text);
              }}
              backgroundColor={color}
              color={Textcolor}
              fontSize={moderateScale(14, 0.1)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Map', {
                address: address,
                location: location,
                setLocation: setLocation,
                setaddress: setaddress,
              });
            }}>
            <View style={[s.mText]}>
              <Text
                style={{
                  backgroundColor: color,
                  marginLeft: moderateScale(10, 0.1),
                  color: Textcolor,
                  fontSize: moderateScale(14, 0.1),
                }}>
                {address ? address : 'Enter location...'}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[s.imgView]}>
            {filePath != null ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    if (route?.params?.from == 'Home') {
                      return;
                    } else {
                      refRBSheet.current.open();
                    }
                  }}>
                  <View style={s.img}>
                    <Image
                      source={{uri: filePath}}
                      resizeMode={'cover'}
                      style={s.galleryImage}></Image>
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                  <View style={s.img}>
                    <Image
                      style={{
                        width: moderateScale(153, 0.1),
                        height: moderateScale(136, 0.1),
                      }}
                      source={require('../../../assets/images/png/Vector.png')}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        top: moderateScale(120, 0.1),
                      }}>
                      <Ionicons
                        name="add-circle-sharp"
                        size={45}
                        color="#302D2D"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            )}

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
                  <Button transparent style={s.capturebtn} onPress={() => {}}>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="camera" style={s.capturebtnicon} />
                      <Text style={s.capturebtntxt}>Open Camera</Text>
                    </View>
                  </Button>
                  <Button transparent style={s.capturebtn} onPress={() => {}}>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons
                        name="md-image-outline"
                        style={s.capturebtnicon}
                      />
                      <Text style={s.capturebtntxt}>Open Gallery</Text>
                    </View>
                  </Button>
                </Stack>
              </View>
            </RBSheet>
          </View>

          <TouchableOpacity onPress={() => onsubmit()}>
            <View style={[s.postBtn, {borderColor: Textcolor}]}>
              <Text style={[s.postTxt, {color: Textcolor}]}>Post</Text>
            </View>
          </TouchableOpacity>
          {open ? (
            <>
              <View
                style={{
                  height: moderateScale(50, 0.1),
                  width: moderateScale(60, 0.1),
                }}></View>
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default CreatePost;

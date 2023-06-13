import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Input, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosconfig from '../../../provider/axios';
import {Loader} from '../../../Components/Index';
import socket from '../../../utils/socket';
import s from './style';
import {height, width} from '../../../Constants/Index';
import {AppContext, useAppContext} from '../../../Context/AppContext';
import {theme} from '../../../Constants/Index';
let userData = {
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
const Login = ({navigation}) => {
  // const FCMtoken = useSelector(state => state.reducer.fToken);
  const Textcolor = theme === 'dark' ? '#fff' : '#222222';
  const {setToken, setUniqueId} = useAppContext(AppContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {}, []);

  // const fcmToken = useCallback(
  //   token => {
  //     const data = {
  //       device_token: FCMtoken,
  //     };
  //     axiosconfig
  //       .post('device-token', data, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then(res => {
  //         setLoader(false);
  //       })
  //       .catch(err => {
  //         setLoader(false);
  //         console.log(err, 'errors');
  //       });
  //   },
  //   [FCMtoken],
  // );

  const onSignInUser = () => {
    AsyncStorage.setItem('password', '123');
    const id = '2';
    AsyncStorage.setItem('id', id);
    AsyncStorage.setItem('userUniqueId1', JSON.stringify(userData));
    setUniqueId(id);
    AsyncStorage.setItem('userToken', '123');
    setToken('123');
  };
  // const onSignInUser = useCallback(() => {
  //   setSubmitted(false);
  //   if (
  //     email === null ||
  //     email === '' ||
  //     password === null ||
  //     password === ''
  //   ) {
  //     setSubmitted(true);
  //     return;
  //   }

  //   setLoader(true);
  //   const data = {
  //     email: email,
  //     password: password,
  //   };
  //   Keyboard.dismiss();
  //   axiosconfig
  //     .post('login', data)
  //     .then(res => {
  //       AsyncStorage.setItem('password', password);
  //       const id = res?.data?.userInfo.toString();
  //       AsyncStorage.setItem('id', id);
  //       AsyncStorage.setItem(
  //         'userUniqueId1',
  //         JSON.stringify(res?.data?.userInfo),
  //       );
  //       setUniqueId(id);
  //       AsyncStorage.setItem('userToken', res?.data?.access_token);

  //       fcmToken(res?.data?.access_token);
  //       socket.auth = {username: email};
  //       socket.connect();
  //       // dispatch(setUserToken(res?.data?.access_token));
  //       setToken(res?.data?.access_token);
  //       setLoader(false);
  //     })
  //     .catch(err => {
  //       console.log(err.response);
  //       Alert.alert(err.response.data.message);
  //       setLoader(false);
  //     });
  // }, [dispatch, email, password, fcmToken]);

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{flex: 1, height: '100%'}}>
      <View
        style={{
          width: width,
          height: height,
          backgroundColor: theme === 'dark' ? '#222222' : '#fff',
        }}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={s.heading}>
            <Text style={[s.headingText, {color: Textcolor}]}>
              Sign <Text style={[s.headingText1, {color: Textcolor}]}>In</Text>
            </Text>
          </View>
          <View style={s.input}>
            <Input
              w={{
                base: '83%',
                md: '25%',
              }}
              variant="underlined"
              InputLeftElement={
                <View style={s.iconCircle}>
                  <Icon name={'envelope'} color={Textcolor} size={18} />
                </View>
              }
              placeholder="Email"
              placeholderTextColor={Textcolor}
              value={email}
              keyboardType="email-address"
              onChangeText={email => {
                setEmail(email);
              }}
              color={Textcolor}
              fontSize={moderateScale(14, 0.1)}
            />
          </View>
          {submitted && (email == null || email === '') ? (
            <>
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginRight: moderateScale(35, 0.1),
                }}>
                <Text
                  style={{
                    color: 'red',
                  }}>
                  Required
                </Text>
              </View>
            </>
          ) : null}
          <View style={s.input}>
            <Input
              w={{
                base: '83%',
                md: '25%',
              }}
              variant="underlined"
              InputLeftElement={
                <View style={[s.iconCircle, {borderColor: Textcolor}]}>
                  <Icon2 name="locked" color={Textcolor} size={18} />
                </View>
              }
              placeholder="Password"
              placeholderTextColor={Textcolor}
              value={password}
              onChangeText={password => {
                setPassword(password);
              }}
              InputRightElement={
                password ? (
                  <View style={s.eye}>
                    <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                      <Feather
                        name={showPass ? 'eye' : 'eye-off'}
                        color={Textcolor}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )
              }
              color={Textcolor}
              fontSize={moderateScale(14, 0.1)}
              secureTextEntry={showPass}
            />
          </View>
          {submitted && (password == null || password === '') ? (
            <>
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginRight: moderateScale(35, 0.1),
                }}>
                <Text
                  style={{
                    color: 'red',
                  }}>
                  Required
                </Text>
              </View>
            </>
          ) : null}

          <View style={s.button}>
            <Button
              size="sm"
              variant={'solid'}
              _text={{
                color: '#6627EC',
              }}
              backgroundColor={'#FFD700'}
              borderRadius={50}
              w={moderateScale(140, 0.1)}
              h={moderateScale(35, 0.1)}
              alignItems={'center'}
              onPressIn={async () => {
                onSignInUser();
              }}>
              <Text style={s.btnText}>Login</Text>
            </Button>
          </View>

          <View>
            <Button
              size="md"
              variant={'link'}
              onPressIn={() => navigation.navigate('ForgetPassword')}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[s.forgetPass, {color: '#FFD700'}]}>Forgot </Text>
                <Text style={[s.forgetPass, {color: Textcolor}]}>
                  Password?
                </Text>
              </View>
            </Button>
          </View>
        </View>

        <View style={s.bottomLink}>
          <Button
            size="sm"
            variant={'link'}
            _text={{
              color: Textcolor,
            }}
            onPressIn={() => navigation.navigate('Register')}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[s.forgetPass, {color: Textcolor}]}>
                Don’t Have an Account?
              </Text>
              <Text
                style={[s.forgetPass, {fontWeight: '700', color: '#FFD700'}]}>
                Sign up Now!
              </Text>
            </View>
          </Button>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: moderateScale(5),
            }}>
            <TouchableOpacity>
              <Text
                style={[
                  s.forgetPass,
                  {color: Textcolor, textDecorationLine: 'underline'},
                ]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <Text
              style={[
                s.forgetPass,
                {color: Textcolor, textDecorationLine: 'none'},
              ]}></Text>
            <TouchableOpacity>
              <Text
                style={[
                  s.forgetPass,
                  {color: Textcolor, textDecorationLine: 'underline'},
                ]}>
                {', '}
                Terms & conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

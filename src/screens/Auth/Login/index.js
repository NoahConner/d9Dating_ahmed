import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Input, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosconfig from '../../../provider/axios';
import {Loader} from '../../../Components/Index';
import {useDispatch, useSelector} from 'react-redux';
import s from './style';
import {height, width} from '../../../Constants/Index';
import {AppContext, useAppContext} from '../../../Context/AppContext';
import { useToast } from 'react-native-toast-notifications';
import { socket } from '../../../Navigation/BottomTabs';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const FCMtoken = useSelector(state => state.reducer.fToken);
  const theme = useSelector(state => state.reducer.theme);
  const Textcolor = theme === 'dark' ? '#fff' : '#222222';
  const {setToken, setUniqueId} = useAppContext(AppContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [loader, setLoader] = useState(false);
  const toast = useToast();
  const fcmToken = useCallback(
    token => {
      const data = {
        device_token: FCMtoken,
      };
      axiosconfig
        .post('device-token', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setLoader(false);
        })
        .catch(err => {
          setLoader(false);
          console.error(err, 'errors');
        });
    },
    [FCMtoken],
  );

  const onSignInUser = useCallback(() => {
    setSubmitted(false);
    if (
      email === null ||
      email === '' ||
      password === null ||
      password === ''
    ) {
      setSubmitted(true);
      return;
    }

    setLoader(true);
    const data = {
      email: email,
      password: password,
    };
    Keyboard.dismiss();
    axiosconfig
      .post('login', data)
      .then(res => {
        AsyncStorage.setItem('password', password);
        const id = res?.data?.userInfo.toString();
        AsyncStorage.setItem('id', id);
        AsyncStorage.setItem(
          'userUniqueId1',
          JSON.stringify(res?.data?.userInfo),
        );
        setUniqueId(id);
        AsyncStorage.setItem('userToken', res?.data?.access_token);

        fcmToken(res?.data?.access_token);
        // dispatch(setUserToken(res?.data?.access_token));
        setToken(res?.data?.access_token);
        setLoader(false);
      })
      .catch(err => {
        console.error(err.response);
        toast.show(err.response.data.message, {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        });
        setLoader(false);
      });
  }, [dispatch, email, password, fcmToken]);

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
            <TouchableOpacity onPress={()=>navigation.navigate('PrivacyPolicy')}>
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
            <TouchableOpacity onPress={()=>navigation.navigate('Terms')}>
              <Text
                style={[
                  s.forgetPass,
                  {color: Textcolor, textDecorationLine: 'underline'},
                ]}>
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

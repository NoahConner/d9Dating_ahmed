import {
  SafeAreaView,
  Text,
  View,
  ToastAndroid,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import s from './style';
import Feather from 'react-native-vector-icons/Feather';
import {Input, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Icon2 from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Header, Loader} from '../../../Components/Index';
import {theme} from '../../../Constants/Index';
import {postApi} from '../../../APIs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext, useAppContext} from '../../../Context/AppContext';

const ChangePass = ({navigation, route}) => {
  const {token} = useAppContext(AppContext);

  const screen = route?.params?.screen;
  const color = theme === 'dark' ? '#222222' : '#fff';
  const Textcolor = theme === 'dark' ? '#fff' : '#222222';

  const [email, setEmail] = useState(route?.params.email);
  const [otp, setOtp] = useState(route?.params.otp);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showPass, setshowPass] = useState(true);
  const [showConfPass, setShowConfPass] = useState(true);
  const [submitted, setSubmitted] = useState();
  const [loader, setLoader] = useState(false);
  const [storedPassword, setStorePassword] = useState('');

  useEffect(() => {
    getPassword();
  }, []);

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };

  const getPassword = async () => {
    let SP = await AsyncStorage.getItem('password');
    setStorePassword(SP);
  };

  const resetPass = async () => {
    setSubmitted(false);
    if (!password || !confirmPassword) {
      setSubmitted(true);
      return;
    }
    if (password != confirmPassword) {
      setSubmitted(true);
      Alert.alert('Password Mismatch');
      return;
    }
    setLoader(true);
    const data = {
      email: email,
      otp: otp,
      password: password,
      confirm_password: confirmPassword,
    };
    const res = await postApi('forgot-password', data);
    // console.log(res, data, 'return');
    if (res?.message) {
      Alert.alert(res?.message);
      navigation.navigate('Login');
    } else {
      Alert.alert(res?.data?.message);
    }
    setLoader(false);
  };

  const changePass = async () => {
    setSubmitted(false);
    if (!password || !confirmPassword) {
      setSubmitted(true);
      return;
    }
    if (password != confirmPassword) {
      setSubmitted(true);
      Alert.alert('Password Mismatch');
      return;
    }
    setLoader(true);
    const data = {
      old_password: storedPassword,
      new_password: password,
      confirm_password: confirmPassword,
    };
    const res = await postApi('change-pass', data, token);
    console.log(res, data, 'return');
    if (res?.status == true) {
      Alert.alert(res?.message);
      navigation.navigate('Settings');
      await AsyncStorage.setItem('password', password);
    } else {
      Alert.alert(res?.data?.message);
    }
    setLoader(false);
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: color}}>
      <Header navigation={navigation} />
      <View style={[s.container, {backgroundColor: color}]}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={s.heading}>
            <Text style={[s.headingText, {color: Textcolor}]}>
              Reset{' '}
              <Text style={[s.headingText1, {color: Textcolor}]}>Password</Text>
            </Text>
          </View>
          <View style={s.input}>
            <Input
              w={{
                base: '83%',
                md: '25%',
              }}
              variant="unstyled"
              InputLeftElement={
                <View style={[s.iconCircle, {borderColor: Textcolor}]}>
                  <Icon2
                    name="locked"
                    color={Textcolor}
                    size={moderateScale(20, 0.1)}
                  />
                </View>
              }
              style={{
                borderBottomColor:
                  submitted && password == null ? 'red' : Textcolor,
                borderBottomWidth: 1,
              }}
              placeholder="New Password"
              placeholderTextColor={Textcolor}
              value={password}
              onChangeText={password => {
                setPassword(password);
              }}
              InputRightElement={
                password ? (
                  <View style={s.eye}>
                    <TouchableOpacity onPress={() => setshowPass(!showPass)}>
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
          <View style={s.input}>
            <Input
              w={{
                base: '83%',
                md: '25%',
              }}
              variant="unstyled"
              InputLeftElement={
                <View style={[s.iconCircle, {borderColor: Textcolor}]}>
                  <MaterialIcon
                    name={'lock-reset'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={Textcolor}
                  />
                </View>
              }
              style={{
                borderBottomColor:
                  submitted && confirmPassword == null ? 'red' : Textcolor,
                borderBottomWidth: 1,
              }}
              placeholder="Confirm Password"
              placeholderTextColor={Textcolor}
              value={confirmPassword}
              onChangeText={password => {
                setConfirmPassword(password);
              }}
              InputRightElement={
                confirmPassword ? (
                  <View style={s.eye}>
                    <TouchableOpacity
                      onPress={() => setShowConfPass(!showConfPass)}>
                      <Feather
                        name={showConfPass ? 'eye' : 'eye-off'}
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
              secureTextEntry={showConfPass}
            />
          </View>

          <View style={s.button}>
            <Button
              onPressIn={() => {
                if (screen == 'Reset') {
                  changePass();
                } else {
                  resetPass();
                }
              }}
              size="sm"
              variant={'solid'}
              _text={{
                color: '#6627EC',
              }}
              backgroundColor={'#FFD700'}
              borderRadius={50}
              w={moderateScale(140, 0.1)}
              h={moderateScale(35, 0.1)}
              alignItems={'center'}>
              <Text style={s.btnText}>Save</Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ChangePass;

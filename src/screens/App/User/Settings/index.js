import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import Inicon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, Button} from 'native-base';
import SwitchWithIcons from 'react-native-switch-with-icons';
import sun from '../../../../assets/images/png/sun.png';
import moon from '../../../../assets/images/png/moon.png';
import RBSheet from 'react-native-raw-bottom-sheet';
import Feather from 'react-native-vector-icons/Feather';
import axiosconfig from '../../../../Providers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Header, Loader} from '../../../../Components/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {dummyImage} from '../../../../Constants/Index';
import {theme} from '../../../../Constants/Index';

const Settings = ({navigation, route}) => {
  const {token, setToken} = useAppContext(AppContext);
  const isFocused = useIsFocused();
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'dark' ? '#fff' : '#000';
  const refRBSheet = useRef();
  const [darkMode, setDarkMode] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassErr, setConfirmPassErr] = useState('');
  const [showPass, setshowPass] = useState(true);
  const [showConfPass, setshowConfPass] = useState(true);
  const [loader, setLoader] = useState(false);
  const [submitted, setSubmitted] = useState();

  useEffect(() => {}, []);

  const showToast = msg => {
    Alert.alert(msg);
  };

  const deleteAccount = async () => {
    setSubmitted(true);
    Alert.alert('Account Deleted');
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('userData');
    AsyncStorage.setItem('already', 'exist');
    setToken(null);
  };

  const setThemeApi = async theme => {
    console.log(theme, 'theme');
  };

  const LogoutApi = async () => {
    clearToken();
    let exist = await AsyncStorage.getItem('already');
    setToken(null);
  };
  const clearToken = async () => {
    setToken(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('password');
  };

  return (
    <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: color}}>
      {loader ? <Loader /> : null}

      <Header navigation={navigation} />
      <ScrollView
        contentContainerStyle={[s.container, {backgroundColor: color}]}>
        <View style={{flexDirection: 'row'}}>
          <View style={s.dp}>
            <Image
              source={{
                uri: route?.params?.data?.image
                  ? route?.params?.data?.image
                  : dummyImage,
              }}
              style={s.dp1}
              resizeMode={'cover'}
            />
          </View>

          <View style={s.username}>
            <Text style={[s.textBold, {color: textColor}]}>
              {route?.params?.data?.name} {route?.params?.data?.last_name}
            </Text>
          </View>
        </View>
        <View style={s.inputSection}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Privacy');
            }}
            style={s.input}>
            <Input
              w="100%"
              isReadOnly
              variant="underlined"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              InputLeftElement={
                <View style={s.icon}>
                  <Icon2
                    name={'privacy-tip'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={textColor}
                  />
                </View>
              }
              placeholder="Privacy"
              placeholderTextColor={textColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Help');
            }}
            style={[s.input]}>
            <Input
              w="100%"
              isReadOnly
              variant="underlined"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              InputLeftElement={
                <View style={s.icon}>
                  <MaterialIcon
                    name={'help-circle'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={textColor}
                  />
                  <Text style={[s.smallText]}>Help Center, Contact Us</Text>
                </View>
              }
              placeholder="Help"
              placeholderTextColor={textColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={s.input}
            onPress={() => navigation.navigate('ResetPass')}>
            <Input
              w="100%"
              isReadOnly
              variant="underlined"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              InputLeftElement={
                <View style={s.icon}>
                  <MaterialIcon
                    name={'lock-reset'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={textColor}
                  />
                </View>
              }
              placeholder="Reset Password"
              placeholderTextColor={textColor}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={s.input}
            onPress={() => navigation.navigate('Block')}>
            <Input
              w="100%"
              isReadOnly
              variant="underlined"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              InputLeftElement={
                <View style={s.icon}>
                  <MaterialIcon
                    name={'block-helper'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={textColor}
                  />
                </View>
              }
              placeholder="Blocked Users"
              placeholderTextColor={textColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={s.input}
            onPress={() => navigation.navigate('HiddenPosts')}>
            <Input
              w="100%"
              isReadOnly
              variant="underlined"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              InputLeftElement={
                <View style={s.icon}>
                  <MaterialIcon
                    name={'folder-hidden'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={textColor}
                  />
                </View>
              }
              placeholder="Hidden Posts"
              placeholderTextColor={textColor}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={s.input}
            onPress={() => refRBSheet.current.open()}>
            <Input
              w="100%"
              isReadOnly
              variant="underlined"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              InputLeftElement={
                <View style={s.icon}>
                  <Icon3
                    name={'delete'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={textColor}
                  />
                </View>
              }
              placeholder="Delete My Account"
              placeholderTextColor={textColor}
            />
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                container: {
                  backgroundColor: textColor,
                  borderRadius: moderateScale(15, 0.1),
                },
                draggableIcon: {
                  backgroundColor: color,
                },
              }}>
              <View style={s.input1}>
                <Input
                  w={{
                    base: '100%',
                    md: '25%',
                  }}
                  variant="underlined"
                  InputLeftElement={
                    <View style={s.iconCircle}>
                      <Iconn name="locked" color={color} size={18} />
                    </View>
                  }
                  placeholder="Password"
                  placeholderTextColor={color}
                  value={password}
                  color={color}
                  onChangeText={password => {
                    setPassword(password);
                    setPasswordError('');
                  }}
                  InputRightElement={
                    password ? (
                      <View style={s.eye}>
                        <TouchableOpacity
                          onPress={() => setshowPass(!showPass)}>
                          <Feather
                            name={showPass ? 'eye' : 'eye-off'}
                            color={color}
                            size={20}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <></>
                    )
                  }
                  errorMessage={passwordError}
                  fontSize={moderateScale(14, 0.1)}
                  secureTextEntry={showPass}
                />
              </View>

              <View style={s.input1}>
                <Input
                  w={{
                    base: '100%',
                    md: '25%',
                  }}
                  variant="underlined"
                  InputLeftElement={
                    <View style={[s.iconCircle]}>
                      <MaterialIcon
                        name={'lock-reset'}
                        size={moderateScale(20, 0.1)}
                        solid
                        color={color}
                      />
                    </View>
                  }
                  placeholder="Confirm Password"
                  placeholderTextColor={color}
                  color={color}
                  value={confirmPassword}
                  onChangeText={text => {
                    if (password.includes(text)) {
                      setConfirmPassword(text);
                      setConfirmPassErr('');
                    } else {
                      setConfirmPassword(text);
                      setConfirmPassErr('Password Mismatch');
                    }
                  }}
                  InputRightElement={
                    confirmPassword ? (
                      <View style={s.eye}>
                        <TouchableOpacity
                          onPress={() => setshowConfPass(!showConfPass)}>
                          <Feather
                            name={showConfPass ? 'eye' : 'eye-off'}
                            color={color}
                            size={20}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <></>
                    )
                  }
                  errorMessage={confirmPassErr}
                  fontSize={moderateScale(14, 0.1)}
                  secureTextEntry={showConfPass}
                />
              </View>
              <View style={s.button}>
                <Button
                  onPress={() => {
                    deleteAccount();
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
                  <Text style={{color: '#222222'}}>Delete Account</Text>
                </Button>
              </View>
            </RBSheet>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              LogoutApi();
            }}
            style={s.input}>
            <Input
              w="100%"
              isReadOnly
              variant="underlined"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              InputLeftElement={
                <View style={s.icon}>
                  <Inicon
                    name={'log-out-sharp'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={textColor}
                  />
                </View>
              }
              placeholder="Log Out"
              placeholderTextColor={textColor}
            />
          </TouchableOpacity>

          <View style={s.switch}>
            <Text style={[s.text, {color: textColor}]}>Dark & Light Mode</Text>
            <SwitchWithIcons
              icon={{true: moon, false: sun}}
              value={theme === 'dark' ? true : false}
              onValueChange={() => {
                setDarkMode(!darkMode);
                if (theme === 'dark') {
                  setThemeApi('light');
                } else {
                  setThemeApi('dark');
                }
              }}
              iconColor={{true: '#000', false: '#000'}}
              trackColor={{true: '#343434', false: '#343434'}}
              thumbColor={{true: '#FFD700', false: '#fff'}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

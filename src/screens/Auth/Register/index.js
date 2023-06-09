import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import axiosconfig from '../../../provider/axios';
import s from './style';
import Feather from 'react-native-vector-icons/Feather';
import {Input, Button, Menu, Pressable} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import PhoneInput from 'react-native-phone-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButton from '../../../Components/Radio';
import {useDispatch, useSelector} from 'react-redux';
import {setUserToken} from '../../../Redux/actions';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Organization, emailReg} from '../../../Constants/Index';
import {Header, OTPModal, Loader} from '../../../Components/Index';
import {AppContext, useAppContext} from '../../../Context/AppContext';
import { useToast } from 'react-native-toast-notifications';
import { socket } from '../../../Navigation/BottomTabs';

const Register = ({navigation}) => {
  const {setToken} = useAppContext(AppContext);
  const dispatch = useDispatch();
  const FCMtoken = useSelector(state => state.reducer.fToken);
  const phonenum = useRef();
  const [fname, setFname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [disable, setDisable] = useState(false);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showPass, setshowPass] = useState(true);
  const [showConPass, setshowConPass] = useState(true);
  const [loader, setLoader] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [onsubmit, setOnsubmit] = useState(false);
  const [gender, setGender] = useState('Female');
  const [date, setDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState();
  const theme = useSelector(state => state.reducer.theme);
  const [isSelected, setIsSelected] = useState([
    {
      id: 1,
      value: true,
      name: 'Male',
      selected: gender == 'Male' ? true : false,
    },
    {
      id: 2,
      value: false,
      name: 'Female',
      selected: gender == 'Female' ? true : false,
    },
    {
      id: 3,
      value: false,
      name: 'Other',
      selected: gender == 'Other' ? true : false,
    },
  ]);
  const [organization, setOrganization] = useState(null);
  const [d, setD] = useState('');
  const [m, setM] = useState('');
  const [y, setY] = useState('');
  const Textcolor = theme === 'dark' ? '#fff' : '#222222';
  const color = theme === 'dark' ? '#222222' : '#fff';
  const userLocation = useSelector(state => state.reducer.location);
  const [location, setLocation] = useState(userLocation);
  const toast = useToast();
  const onRadioBtnClick = item => {
    let updatedState = isSelected.map(isSelectedItem =>
      isSelectedItem.id === item.id
        ? {...isSelectedItem, selected: true}
        : {...isSelectedItem, selected: false},
    );
    setIsSelected(updatedState);
    setGender(item.name);
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const validateEmail = e => {
    if (emailReg.test(e)) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  };
  const submit = () => {
    setOnsubmit(true);
    let sub = true;

    if (fname == null) {
      sub = false;
      return false;
    }
    if (lastname == null) {
      sub = false;
      return false;
    }
    if (email == null || email == '') {
      sub = false;
      return false;
    }
    if (date == null) {
      sub = false;
      return false;
    }
    if (password == null) {
      sub = false;
      return false;
    }
    if (date == null) {
      sub = false;
      return false;
    }
    if (Organization == null) {
      sub = false;
      return false;
    }
    if (password != confirmPassword) {
      toast.show("Password does not match", {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      });
      sub = false;
      return false;
    }
    if (!phonenum.current.isValidNumber()) {
      toast.show("Please enter a valid phone number", {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      });
      sub = false;
      return false;
    }
    if (sub) {
      onSignupUser();
    }
  };
  const onSignupUser = () => {
    setLoader(true);
    setOnsubmit(false);
    var data = {
      email: email,
    };
    axiosconfig
      .post('otp', data)
      .then(res => {
        if (modalVisible == false) {
          toast.show(res?.data?.message, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in",
          });
          setTimeout(() => {
            setModalVisible(!modalVisible);
          }, 3000);
          setLoader(false);
        } else {
          toast.show('code sent', {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in",
          });
        }
      })
      .catch(err => {
        setLoader(false);
        toast.show(err?.response?.data?.message, {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        });
      });
  };
  const fcmToken = token => {
    setLoader(true);
    var data = {
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
  };
  const handleSubmit = () => {
    setLoader(true);
    setOnsubmit(false);
    var data = {
      name: fname,
      last_name: lastname,
      email: email,
      otp: otp,
      phone_number: phonenum.current.getValue(),
      gender: gender,
      location: userLocation,
      group: organization,
      password: password,
      confirm_password: confirmPassword,
      date: date,
      type: 'user',
    };
    axiosconfig
      .post('register', data)
      .then(res => {
        toast.show(res?.data?.message, {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        });
        AsyncStorage.setItem('password', password);
        AsyncStorage.setItem('userToken', res?.data?.access_token);
        let id = res?.data?.userInfo.toString();
        AsyncStorage.setItem('id', id);
        // dispatch(setUserToken(res?.data?.access_token));
        setToken(res?.data?.access_token);
        fcmToken(res?.data?.access_token);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        toast.show(err.response?.data?.message, {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        });
      });
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  let check;
  let month;
  let dateex;
  let year;

  const handleConfirm = datee => {
    console.warn('A date has been picked: ', datee);
    check = moment(datee, 'YYYY/MM/DD');
    month = check.format('M');
    dateex = check.format('DD');
    year = check.format('YYYY');
    setM(month);
    setY(year);
    setD(dateex);
    setDate(`${month}/${dateex}/${year}`);

    hideDatePicker();
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme === 'dark' ? '#222222' : '#fff'}}>
      <ScrollView>
        <View
          style={[
            s.container,
            {backgroundColor: theme === 'dark' ? '#222222' : '#fff'},
          ]}>
          <View style={s.header}>
            <Header navigation={navigation} />
          </View>
          <View style={s.heading}>
            <Text style={[s.headingText, {color: Textcolor}]}>Sign Up</Text>
          </View>
          <ScrollView
            style={{
              width: '100%',
            }}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: moderateScale(20, 0.1),
              paddingHorizontal: moderateScale(9, 0.1),
            }}>
            <View style={[s.input]}>
              <View style={{flex: 0.4}}>
                <Text style={[s.inputTxt, {color: Textcolor}]}>Name</Text>
              </View>
              <View
                style={{
                  flex: 0.6,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{flex: 0.5}}>
                  <Input
                    w={{
                      base: '90%',
                      md: '25%',
                    }}
                    style={{
                      borderBottomColor:
                        onsubmit && fname == null ? 'red' : Textcolor,
                      borderBottomWidth: 1,
                    }}
                    placeholder="First Name"
                    variant="unstyled"
                    placeholderTextColor={Textcolor}
                    onChangeText={e => setFname(e)}
                    color={Textcolor}
                    fontSize={moderateScale(12, 0.1)}
                  />
                </View>
                <View style={{flex: 0.5}}>
                  <Input
                    w={{
                      base: '90%',
                      md: '15%',
                    }}
                    placeholder="Last Name"
                    style={{
                      borderBottomColor:
                        onsubmit && lastname == null ? 'red' : Textcolor,
                      borderBottomWidth: 1,
                    }}
                    variant="unstyled"
                    placeholderTextColor={Textcolor}
                    color={Textcolor}
                    onChangeText={e => setLastname(e)}
                    fontSize={moderateScale(12, 0.1)}
                  />
                </View>
              </View>
            </View>
            <View style={s.input}>
              <View style={{flex: 0.4}}>
                <Text style={[s.inputTxt, {color: Textcolor}]}>Gender</Text>
              </View>
              <View
                style={{
                  flex: 0.6,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {isSelected.map((item, i) => (
                  <View style={s.radio} key={i}>
                    <RadioButton
                      onPress={() => onRadioBtnClick(item)}
                      selected={item.selected}
                      key={item.id}>
                      {item.name}
                    </RadioButton>
                  </View>
                ))}
              </View>
            </View>
            <View style={s.input}>
              <View style={{flex: 0.4}}>
                <Text style={[s.inputTxt, {color: Textcolor}]}>
                  Date of Birth
                </Text>
              </View>
              <View style={{flex: 0.6}}>
                <TouchableOpacity onPress={() => showDatePicker()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: moderateScale(5, 0.1),
                    }}>
                    <View
                      style={[
                        s.dateView,
                        {
                          borderBottomWidth: 1,
                          borderBottomColor:
                            onsubmit && date == null ? 'red' : Textcolor,
                        },
                      ]}>
                      <Text style={[s.date, {color: Textcolor}]}>
                        {date ? m : 'MM'}
                      </Text>
                    </View>

                    <View
                      style={[
                        s.dateView,
                        {
                          borderBottomWidth: 1,
                          borderBottomColor:
                            onsubmit && date == null ? 'red' : Textcolor,
                        },
                      ]}>
                      <Text style={[s.date, {color: Textcolor}]}>
                        {date ? d : 'DD'}
                      </Text>
                    </View>

                    <View
                      style={[
                        s.dateView,
                        {
                          borderBottomWidth: 1,
                          borderBottomColor:
                            onsubmit && date == null ? 'red' : Textcolor,
                        },
                      ]}>
                      <Text style={[s.date, {color: Textcolor}]}>
                        {date ? y : 'YYY'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  maximumDate={maxDate}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            </View>

            <View style={s.input}>
              <View style={{flex: 0.4}}>
                <Text style={[s.inputTxt, {color: Textcolor}]}>
                  Phone Number
                </Text>
              </View>
              <View
                style={{
                  flex: 0.6,
                  paddingVertical: moderateScale(9, 0.1),

                  borderBottomColor:
                    onsubmit && isPhone == false ? 'red' : Textcolor,
                  borderBottomWidth: 1,
                }}>
                <PhoneInput
                  initialCountry={'us'}
                  textProps={{
                    placeholder: 'Enter Phone Number',
                    placeholderTextColor: Textcolor,
                  }}
                  pickerBackgroundColor={'grey'}
                  pickerButtonColor={'#fff'}
                  isReadOnly={disable}
                  autoFormat={true}
                  textStyle={[s.inputStyle, {color: Textcolor}]}
                  isValidNumber={e => console.log(e, 'here')}
                  ref={phonenum}
                  onChangePhoneNumber={phNumber => {
                    if (phonenum.current.isValidNumber()) {
                      setIsPhone(true);
                    } else {
                      setIsPhone(false);
                    }
                  }}
                />
              </View>
            </View>

            <View style={s.input}>
              <View style={{flex: 0.4}}>
                <Text style={[s.inputTxt, {color: Textcolor}]}>
                  Email Adress
                </Text>
              </View>
              <View style={{flex: 0.6}}>
                <Input
                  w={{
                    base: '100%',
                    md: '25%',
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor:
                      onsubmit && email == null ? 'red' : Textcolor,
                  }}
                  variant="unstyled"
                  placeholderTextColor={Textcolor}
                  color={Textcolor}
                  fontSize={moderateScale(12, 0.1)}
                  onChangeText={e => {
                    validateEmail(e);
                    setEmail(e);
                  }}
                />
                {onsubmit && isEmail === false && email != null ? (
                  <>
                    <View
                      style={{
                        height: 15,
                        justifyContent: 'center',
                        width: '90%',
                        marginBottom: 20,
                      }}>
                      <Text style={{fontSize: 12, color: 'red'}}>
                        please enter valid email
                      </Text>
                    </View>
                  </>
                ) : null}
              </View>
            </View>
            <View style={s.input}>
              <View style={{flex: 0.4}}>
                <Text style={[s.inputTxt, {color: Textcolor}]}>
                  Organization
                </Text>
              </View>
              <View style={{flex: 0.6}}>
                <Menu
                  style={{width: '85%'}}
                  borderWidth={moderateScale(1, 0.1)}
                  borderBottomColor={'grey'}
                  backgroundColor={color}
                  top={moderateScale(24, 0.1)}
                  borderColor={Textcolor}
                  trigger={triggerProps => {
                    return (
                      <Pressable
                        accessibilityLabel="More options menu"
                        {...triggerProps}
                        style={{
                          flexDirection: 'row',
                          borderColor: Textcolor,
                          borderBottomWidth: 1,
                          borderBottomColor:
                            onsubmit && organization == null
                              ? 'red'
                              : Textcolor,
                          paddingLeft: moderateScale(10, 0.1),
                          alignItems: 'center',
                        }}>
                        <Text
                          style={[
                            s.option,
                            {
                              color: Textcolor,
                              flex: 0.8,
                              paddingBottom: moderateScale(5, 0.1),
                            },
                          ]}>
                          {organization}
                        </Text>

                        <Entypo
                          style={{
                            flex: 0.2,
                            left: moderateScale(10, 0.1),
                            bottom: moderateScale(10, 0.1),
                          }}
                          name={'chevron-down'}
                          size={moderateScale(25, 0.1)}
                          color={Textcolor}
                        />
                      </Pressable>
                    );
                  }}>
                  {Organization.map((v, i) => {
                    return (
                      <Menu.Item
                        key={i}
                        style={{width: 400}}
                        onPress={() => {
                          setOrganization(v.id);
                        }}>
                        <View style={s.optionView}>
                          <Text style={[s.optionBtns, {color: Textcolor}]}>
                            {v.id}
                          </Text>
                        </View>
                      </Menu.Item>
                    );
                  })}
                </Menu>
              </View>
            </View>
            <View style={s.input}>
              <View style={{flex: 0.4}}>
                <Text style={[s.inputTxt, {color: Textcolor}]}>Location</Text>
              </View>
              <View style={{flex: 0.6}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Map', {from: 'register'})
                  }>
                  <Input
                    w={{
                      base: '100%',
                      md: '25%',
                    }}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor:
                        onsubmit && location == null ? 'red' : Textcolor,
                    }}
                    variant="unstyled"
                    editable={false}
                    placeholder={userLocation ? userLocation : 'Enter Location'}
                    onChangeText={() => setLocation(location)}
                    placeholderTextColor={Textcolor}
                    color={Textcolor}
                    fontSize={moderateScale(12, 0.1)}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={s.input}>
              <View style={{flex: 0.4}}>
                <Text style={[s.inputTxt, {color: Textcolor}]}>Password</Text>
              </View>
              <View style={{flex: 0.6}}>
                <Input
                  w={{
                    base: '100%',
                    md: '25%',
                  }}
                  style={{
                    borderBottomColor:
                      onsubmit && password == null ? 'red' : Textcolor,
                    borderBottomWidth: 1,
                  }}
                  variant="unstyled"
                  placeholderTextColor={Textcolor}
                  value={password}
                  onChangeText={password => {
                    setPassword(password);
                  }}
                  InputRightElement={
                    password ? (
                      <View style={s.eye}>
                        <TouchableOpacity
                          onPress={() => setshowPass(!showPass)}>
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
                  fontSize={moderateScale(12, 0.1)}
                  secureTextEntry={showPass}
                />
              </View>
            </View>
            <View style={s.input}>
              <View style={{flex: 0.4}}>
                <Text style={[s.inputTxt, {color: Textcolor}]}>
                  Confirm Password
                </Text>
              </View>
              <View style={{flex: 0.6}}>
                <Input
                  w={{
                    base: '100%',
                    md: '25%',
                  }}
                  style={{
                    borderBottomColor:
                      onsubmit && confirmPassword == null ? 'red' : Textcolor,
                    borderBottomWidth: 1,
                  }}
                  variant="unstyled"
                  placeholderTextColor={Textcolor}
                  value={confirmPassword}
                  onChangeText={password => {
                    setConfirmPassword(password);
                  }}
                  InputRightElement={
                    confirmPassword ? (
                      <View style={s.eye}>
                        <TouchableOpacity
                          onPress={() => setshowConPass(!showConPass)}>
                          <Feather
                            name={showConPass ? 'eye' : 'eye-off'}
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
                  fontSize={moderateScale(12, 0.1)}
                  secureTextEntry={showConPass}
                />
              </View>
            </View>
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
                style={s.shadow}
                onPressIn={() => submit()}>
                <Text style={s.btnText}>Register</Text>
              </Button>
            </View>
          </ScrollView>
          <View style={s.bottomLink}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: moderateScale(20, 0.1),
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
                ]}>
                {'  '}&{'  '}
              </Text>
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
        {modalVisible ? (
          <OTPModal
            navigation={navigation}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            submit={submit}
            onSignupUser={onSignupUser}
            setOtp={setOtp}
            handleSubmit={handleSubmit}
            screen={'register'}
          />
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import {setUserData, setLocation} from '../../../Redux/actions';
import s from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import Inicon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput from 'react-native-phone-input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/FontAwesome';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, Stack, Button, Pressable, Menu} from 'native-base';
import RBSheet from 'react-native-raw-bottom-sheet';
import RadioButton from '../../../Components/Radio';
import {launchImageLibrary} from 'react-native-image-picker';
import axiosconfig from '../../../Providers/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {Header, Loader} from '../../../Components/Index';
import {
  captureImage,
  chooseFile,
  dummyImage,
  width,
} from '../../../Constants/Index';
import {AppContext, useAppContext} from '../../../Context/AppContext';
import { useToast } from 'react-native-toast-notifications';

const Profile = ({navigation, route}) => {
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const toast = useToast();
  const phonenum = useRef();
  const isFocused = useIsFocused();
  const {token} = useAppContext(AppContext);
  const theme = useSelector(state => state.reducer.theme);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const color2 = theme === 'dark' ? '#2E2D2D' : '#fff';
  const greyColor = '#D3D3D3';
  const userLocation = useSelector(state => state.reducer.location);
  const organization = useSelector(state => state.reducer.organization);
  const [disable1, setDisable1] = useState(false);
  const [disable2, setDisable2] = useState(false);
  const [disable3, setDisable3] = useState(false);
  const [disable4, setDisable4] = useState(false);
  const [disable5, setDisable5] = useState(false);
  const [disable6, setDisable6] = useState(false);
  const [disable7, setDisable7] = useState(false);
  const [userName, setUserName] = useState('');
  const [loc, setLoc] = useState('');

  const [date, setDate] = useState(null);
  const [id, setId] = useState('');
  const [borderColor, setBorderColor] = useState(greyColor);
  const [filePath, setFilePath] = useState(null);
  let formData = {
    id: '',
    name: '',
    last_name: '',
    about_me: '',
    group: '',
    email: '',
    phone_number: '',
    location: '',
    gender: '',
    month: '',
    date: '',
    image: '',
  };

  const [loader, setLoader] = useState(true);
  const [form, setForm] = useState(formData);
  const [isSelected, setIsSelected] = useState([
    {
      id: 1,
      name: 'Male',
      selected: true,
    },
    {
      id: 2,
      name: 'Female',
      selected: false,
    },
    {
      id: 3,
      name: 'Other',
      selected: false,
    },
  ]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  var check;
  var month;
  var dateex;
  var year;

  useEffect(() => {
    if (route?.params?.data === undefined) {
      getData();
    } else {
    }
  }, [isFocused]);

  const onRadioBtnClick = item => {
    let updatedState = isSelected.map(isSelectedItem =>
      isSelectedItem.name === item.name
        ? {...isSelectedItem, selected: true}
        : {...isSelectedItem, selected: false},
    );
    setIsSelected(updatedState);
    setForm({...form, gender: item.name});
  };


  const getData = async () => {
    let SP = await AsyncStorage.getItem('id');
    setId(SP);
    setLoader(true);
    axiosconfig
      .get(`user_view/${SP}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.data.user_details) {
          setData(res?.data?.user_details);
          setLoc(res?.data?.user_details?.location);
        }
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
      });
  };

  const setData = data => {
    for (let item of Object.keys(formData)) {
      formData[item] = data[item];
      if (item == 'location') {
        dispatch(setLocation(data[item]));
      }
      if (item == 'phone_number') {
        formData[item] = data[item];
      }
      if (item == 'gender') {
        let updatedState = isSelected.map(isSelectedItem =>
          isSelectedItem.name == data[item]
            ? {...isSelectedItem, selected: true}
            : {...isSelectedItem, selected: false},
        );
        setIsSelected(updatedState);
      }
    }
    setForm(formData);
    setUserName(formData.name + ' ' + formData.last_name);
    dispatch(setUserData(formData));
    setLoader(false);
  };

  const save = async base64image => {
    setForm({...form, location: userLocation});
    if (base64image) {
      setForm({...form, image: base64image});
    }
    if (!phonenum.current.isValidNumber()) {
      toast.show('Please enter valid phone number', {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      });
      return;
    }
    setLoader(true);
    await axiosconfig
      .post(
        'user_update',
        base64image
          ? {...form, image: base64image}
          : {...form, location: userLocation},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        let message = res?.data?.message;
        toast.show(message, {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        });
        setUserName(form.name + ' ' + form.last_name);
        dispatch(setUserData(form));
        setDisable4(false);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        getData();
        toast.show(err.message, {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        });
      });
  };

  useEffect(() => {
    setForm({...form, image: filePath});
  }, [filePath]);

  const handleConfirm = datee => {
    check = moment(datee, 'YYYY/MM/DD');
    month = check.format('M');
    dateex = check.format('DD');
    year = check.format('YYYY');
    setDate(`${month}/${dateex}/${year}`);
    setForm({...form, date: `${month}/${dateex}/${year}`});
    hideDatePicker();
  };
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: color}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: moderateScale(20, 0.1),
        }}>
        <View
          style={{
            position: 'absolute',
            left: moderateScale(10, 0.1),
          }}>
          <Header navigation={navigation} />
        </View>
        <View>
          <Text style={[s.HeadingText, {color: textColor}]}>Profile</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[s.container, {backgroundColor: color}]}>
        <View style={s.dp}>
          <Image
            source={{uri: form?.image ? form?.image : dummyImage}}
            style={s.dp1}
            resizeMode={'cover'}
          />
          <View style={s.circle}>
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={s.edit}>
              <Entypo
                name={'edit'}
                size={moderateScale(10, 0.1)}
                color={'#fff'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.username}>
          <Text style={[s.textBold, {color: textColor}]}>{userName}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings', {data: form})}>
            <Inicon
              name={'settings-sharp'}
              size={moderateScale(20, 0.1)}
              solid
              color={textColor}
            />
          </TouchableOpacity>
        </View>
        <View style={[s.inputSection, {backgroundColor: color2}]}>
          <View style={s.input}>
            <Input
              w="100%"
              variant="underlined"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              InputLeftElement={
                <View style={s.icon}>
                  <Icon
                    name={'user'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={textColor}
                  />
                </View>
              }
              InputRightElement={
                <TouchableOpacity
                  onPress={() => {
                    setDisable1(!disable1);
                  }}>
                  <Entypo
                    name={'edit'}
                    size={moderateScale(15, 0.1)}
                    color={textColor}
                  />
                </TouchableOpacity>
              }
              onEndEditing={() => {
                setDisable1(!disable1);
              }}
              isReadOnly={!disable1}
              isFocused={disable1}
              placeholder="Full Name"
              placeholderTextColor={textColor}
              value={form?.name}
              onChangeText={text => {
                setForm({...form, name: text});
              }}
            />
          </View>
          <View style={s.input}>
            <Input
              w="100%"
              variant="underlined"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              InputLeftElement={
                <View style={s.icon}>
                  <Icon1
                    name={'user-circle-o'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={textColor}
                  />
                </View>
              }
              InputRightElement={
                <TouchableOpacity
                  onPress={() => {
                    setDisable7(!disable7);
                  }}>
                  <Entypo
                    name={'edit'}
                    size={moderateScale(15, 0.1)}
                    color={textColor}
                  />
                </TouchableOpacity>
              }
              onEndEditing={() => {
                setDisable7(!disable7);
              }}
              isReadOnly={!disable7}
              isFocused={disable7}
              placeholder="Last Name"
              placeholderTextColor={textColor}
              value={form?.last_name}
              onChangeText={text => {
                setForm({...form, last_name: text});
              }}
            />
          </View>
          <View style={s.input}>
            <Input
              w="100%"
              variant="underlined"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              InputLeftElement={
                <View style={s.icon}>
                  <Inicon
                    name={'information-circle'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={textColor}
                  />
                </View>
              }
              InputRightElement={
                <TouchableOpacity
                  onPress={() => {
                    setDisable2(!disable2);
                  }}>
                  <Entypo
                    name={'edit'}
                    size={moderateScale(15, 0.1)}
                    color={textColor}
                  />
                </TouchableOpacity>
              }
              onEndEditing={() => {
                setDisable2(!disable2);
              }}
              isReadOnly={!disable2}
              isFocused={disable2}
              placeholder="About Me"
              placeholderTextColor={textColor}
              value={form?.about_me}
              onChangeText={text => {
                setForm({...form, about_me: text});
              }}
            />
          </View>
          <View style={s.input}>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <Menu
                borderWidth={moderateScale(1, 0.1)}
                backgroundColor={color}
                borderColor={greyColor}
                trigger={triggerProps => {
                  return (
                    <Pressable
                      accessibilityLabel="More options menu"
                      {...triggerProps}
                      style={{
                        flexDirection: 'row',
                        borderColor: greyColor,
                        borderBottomWidth: 1,
                        paddingBottom: moderateScale(10, 0.1),
                        marginBottom: moderateScale(-10, 0.1),
                        width: '100%',
                        alignItems: 'center',
                      }}>
                      <View style={s.icon}>
                        <Icon1
                          name={'group'}
                          size={moderateScale(20, 0.1)}
                          solid
                          color={textColor}
                        />
                      </View>
                      <Text
                        style={[
                          s.option,
                          {
                            color: textColor,
                            flex: 1,
                            fontSize: moderateScale(12, 0.1),
                          },
                        ]}>
                        {form?.group}
                      </Text>
                      <View>
                        <Entypo
                          style={{
                            flex: 0.2,
                          }}
                          name={'chevron-down'}
                          size={moderateScale(25, 0.1)}
                          color={textColor}
                        />
                      </View>
                    </Pressable>
                  );
                }}>
                {organization.map((v, i) => {
                  return (
                    <Menu.Item
                      key={i}
                      onPress={() => {
                        setForm({...form, group: v.id});
                      }}>
                      <View style={s.optionView}>
                        <Text style={[s.optionBtns, {color: textColor}]}>
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
            <Input
              w="100%"
              variant="underlined"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              InputLeftElement={
                <View style={s.icon}>
                  <MaterialIcon
                    name={'email'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={textColor}
                  />
                </View>
              }
              InputRightElement={
                <TouchableOpacity>
                  <Entypo
                    name={'edit'}
                    size={moderateScale(15, 0.1)}
                    color={textColor}
                  />
                </TouchableOpacity>
              }
              onEndEditing={() => {
                setDisable3(!disable3);
              }}
              isReadOnly={!disable3}
              isFocused={disable3}
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor={textColor}
              value={form?.email}
              onChangeText={text => {
                setForm({...form, email: text});
              }}
            />
          </View>
          {form?.phone_number ? (
            <View
              style={[
                s.input,
                s.inputContainerStyle,
                {
                  borderBottomColor: borderColor,
                  borderBottomWidth: 1,
                },
              ]}>
              <PhoneInput
                initialCountry={'us'}
                initialValue={form?.phone_number}
                textProps={{
                  placeholder: 'Enter Phone Number',
                  placeholderTextColor: textColor,
                }}
                disabled={!disable4}
                autoFormat={true}
                pickerBackgroundColor={greyColor}
                textStyle={[s.inputStyle, {color: textColor}]}
                isValidNumber={e => {}}
                ref={phonenum}
                onChangePhoneNumber={phNumber => {
                  if (phonenum.current.isValidNumber()) {
                    setForm({
                      ...form,
                      phone_number: phonenum?.current?.getValue(),
                    });
                    setBorderColor(greyColor);
                  } else {
                    setBorderColor('red');
                  }
                }}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 0,
                  top: moderateScale(15, 0.1),
                }}
                onPress={() => {
                  setDisable4(!disable4);
                  if (!disable4) {
                    setBorderColor('#33A9C4');
                  } else {
                    setBorderColor(greyColor);
                  }
                }}>
                <Entypo
                  name={'edit'}
                  size={moderateScale(15, 0.1)}
                  color={textColor}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={s.input}>
            <Input
              w="100%"
              variant="underlined"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              InputLeftElement={
                <View style={s.icon}>
                  <Fontisto
                    name={'date'}
                    size={moderateScale(20, 0.1)}
                    solid
                    color={textColor}
                  />
                </View>
              }
              onEndEditing={() => {
                setDisable5(!disable5);
              }}
              InputRightElement={
                <TouchableOpacity
                  onPress={() => {
                    showDatePicker();
                  }}>
                  <Entypo
                    name={'edit'}
                    size={moderateScale(15, 0.1)}
                    color={textColor}
                  />
                </TouchableOpacity>
              }
              isReadOnly={true}
              isFocused={disable5}
              placeholder={'Date of Birth'}
              placeholderTextColor={textColor}
              value={form?.date}
            />
          </View>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={s.input}>
              <Input
                w="100%"
                variant="underlined"
                color={textColor}
                fontSize={moderateScale(12, 0.1)}
                InputLeftElement={
                  <View style={s.icon}>
                    <Inicon
                      name={'location'}
                      size={moderateScale(20, 0.1)}
                      solid
                      color={textColor}
                    />
                  </View>
                }
                onEndEditing={() => {
                  setDisable6(!disable6);
                }}
                InputRightElement={
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Map', {
                        from: 'user',
                      });
                      setDisable6(!disable6);
                    }}>
                    <Entypo
                      name={'edit'}
                      size={moderateScale(15, 0.1)}
                      color={textColor}
                    />
                  </TouchableOpacity>
                }
                isReadOnly={true}
                isFocused={disable6}
                placeholder={'Location'}
                placeholderTextColor={textColor}
                value={userLocation}
              />
            </View>
          </TouchableWithoutFeedback>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            maximumDate={maxDate}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <View style={s.radioInput}>
            <Text style={[s.text, {color: textColor}]}>Gender</Text>
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
          <View style={s.button}>
            <Button
              size="sm"
              onPressIn={() => save()}
              variant={'solid'}
              _text={{
                color: '#6627EC',
              }}
              backgroundColor={'#FFD700'}
              borderRadius={50}
              w={moderateScale(140, 0.1)}
              h={moderateScale(35, 0.1)}
              alignItems={'center'}
              style={s.shadow}>
              <Text style={s.btnText}>Save</Text>
            </Button>
          </View>
        </View>
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
              <Button
                transparent
                style={s.capturebtn}
                onPressIn={() =>
                  captureImage('photo', refRBSheet, setFilePath)
                }>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons name="camera" style={s.capturebtnicon} />
                  <Text style={s.capturebtntxt}>Open Camera</Text>
                </View>
              </Button>
              <Button
                transparent
                style={s.capturebtn}
                onPressIn={() => chooseFile('photo', refRBSheet, setFilePath)}>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons name="md-image-outline" style={s.capturebtnicon} />
                  <Text style={s.capturebtntxt}>Open Gallery</Text>
                </View>
              </Button>
            </Stack>
          </View>
        </RBSheet>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

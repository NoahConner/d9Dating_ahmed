import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import axiosconfig from '../../../../Providers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Button} from 'native-base';
import {Header, Loader} from '../../../../Components/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {theme} from '../../../../Constants/Index';

const userDummy = {
  about_me: 'my about info',
  block_status: 0,
  connected: 0,
  created_at: '2023-06-06T12:21:34.000000Z',
  date: '6/06/2005',
  date_login: '2023-06-07 07:33:48',
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
  updated_at: '2023-06-07T07:47:12.000000Z',
  year: null,
};

const Help = ({navigation}) => {
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'dark' ? '#fff' : '#222222';
  const {token} = useAppContext(AppContext);
  const [loader, setLoader] = useState(false);
  const [fname, setFname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [descreption, setDescreption] = useState(null);
  const [onsubmit, setOnsubmit] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setFname(userDummy?.name);
    setLastname(userDummy?.last_name);
    setEmail(userDummy?.email);
    setPhone(userDummy?.phone_number);
  };

  const help = async () => {
    setOnsubmit(true);
    let sub = true;

    if (descreption == null) {
      sub = false;
      return false;
    }
    if (sub) {
      const data = {
        first_name: fname,
        last_name: lastname,
        email: email,
        phone: phone,
        description: descreption,
      };
      await axiosconfig
        .post('help', data, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
        .then(res => {
          Alert.alert(res?.data?.message);
          // setLoader(false);
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
        })
        .catch(err => {
          // setLoader(false);
          console.log(err);
        });
    }
  };
  return loader ? (
    <Loader />
  ) : (
    <ScrollView style={{backgroundColor: color, flex: 1}}>
      <View style={[s.container]}>
        <Header navigation={navigation} />

        <View style={s.hView}>
          <Text style={[s.hTxt, {color: textColor}]}>Help</Text>
        </View>
        <View style={s.Ctxt}>
          <Text style={[s.txt, {color: textColor}]}>
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before final copy is available.
          </Text>
        </View>

        <View
          style={{
            marginVertical: moderateScale(12, 0.1),
            paddingHorizontal: moderateScale(12, 0.1),
            height: moderateScale(350, 0.1),
            borderWidth: 0.9,
            borderColor: textColor,
          }}>
          <View style={{flex: 0.2, marginTop: moderateScale(5, 0.1)}}>
            <Input
              w={{
                base: '100%',
                md: '25%',
              }}
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              isReadOnly
              variant="unstyled"
              placeholder="Name"
              value={fname}
              size="md"
              style={{
                borderBottomColor:
                  onsubmit && fname == null ? 'red' : textColor,
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View style={{flex: 0.2}}>
            <Input
              w={{
                base: '100%',
                md: '25%',
              }}
              isReadOnly
              variant="unstyled"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              placeholder="Email"
              value={email}
              onChangeText={text => setInput(text)}
              size="md"
              style={{
                borderBottomColor:
                  onsubmit && email == null ? 'red' : textColor,
                borderBottomWidth: 1,
              }}
            />
          </View>

          <View style={{flex: 0.2}}>
            <Input
              w={{
                base: '100%',
                md: '25%',
              }}
              isReadOnly
              variant="unstyled"
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              placeholder="phone"
              value={phone}
              onChangeText={text => setInput(text)}
              size="md"
              style={{
                borderBottomColor:
                  onsubmit && phone == null ? 'red' : textColor,
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View style={{flex: 0.2}}>
            <Input
              w={{
                base: '100%',
                md: '25%',
              }}
              variant="unstyled"
              placeholderTextColor={textColor}
              color={textColor}
              fontSize={moderateScale(12, 0.1)}
              placeholder="Description"
              value={descreption}
              onChangeText={text => setDescreption(text)}
              size="md"
              style={{
                borderBottomColor:
                  onsubmit && descreption == null ? 'red' : textColor,
                borderBottomWidth: 1,
              }}
            />
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
              onPress={() => {
                navigation.goBack();
                console.log('Help');
              }}>
              <Text style={{color: '#222222'}}>Send</Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Help;

const styles = StyleSheet.create({});

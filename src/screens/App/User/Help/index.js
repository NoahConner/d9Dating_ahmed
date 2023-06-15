import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import axiosconfig from '../../../../Providers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Button} from 'native-base';
import {Header, Loader} from '../../../../Components/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import { useToast } from 'react-native-toast-notifications';

const Help = ({navigation}) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.reducer.theme);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'dark' ? '#fff' : '#222222';
  const {token} = useAppContext(AppContext);
  const [loader, setLoader] = useState(true);
  const [fname, setFname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [descreption, setDescreption] = useState(null);
  const [onsubmit, setOnsubmit] = useState(false);
  const [id, setId] = useState('');
  const toast = useToast();

  useEffect(() => {
    getData();
  }, []);

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
          setFname(res?.data?.user_details?.name);
          setLastname(res?.data?.user_details?.last_name);
          setEmail(res?.data?.user_details?.email);
          setPhone(res?.data?.user_details?.phone_number);
        }
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.error(err);
      });
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
          toast.show(res?.data?.message, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in",
          });
          setLoader(false);
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
        })
        .catch(err => {
          setLoader(false);
          console.error(err);
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
              onPress={() => help()}>
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

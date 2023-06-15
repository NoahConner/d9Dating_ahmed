import {SafeAreaView, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import s from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import axiosconfig from '../../../provider/axios';
import {emailReg} from '../../../Constants/Index';
import {Header, OTPModal, Loader} from '../../../Components/Index';
import { useToast } from 'react-native-toast-notifications';

const ForgetPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [validEmail, setValidEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitted, setSubmitted] = useState();
  const [otp, setOtp] = useState();
  const toast = useToast();
  const theme = useSelector(state => state.reducer.theme);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const Textcolor = theme === 'dark' ? '#fff' : '#222222';

  const Reset = () => {
    setSubmitted(true);
    let sub = true;
    if (email == null || email == '') {
      sub = false;
      return false;
    }

    if (sub) {
      var data = {
        email: email,
      };
      setLoader(true);
      axiosconfig
        .post('forgot', data)
        .then(res => {
          setLoader(false);
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
        })
        .catch(err => {
          setLoader(false);
          console.error(err?.response, 'aaa');
          toast.show(err?.response?.data?.message, {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in",
          });
        });
    }
  };
  const OtpSubmit = () => {
    var data = {
      email: email,
      token: otp,
    };
    setLoader(true);
    axiosconfig
      .post('otp_password', data)
      .then(res => {
        setLoader(false);
        toast.show(res?.data, {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        });
        navigation.navigate('ChangePass', {email, otp});
      })
      .catch(err => {
        setLoader(false);
        console.error(err?.response, 'aaa');
        toast.show(err?.response?.data, {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        });
      });
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: color}}>
      <View style={{flex: 0.9}}>
        <View>
          <Header navigation={navigation} />
        </View>
        <View style={[s.container, {backgroundColor: color}]}>
          <View style={s.heading}>
            <Text style={[s.headingText, {color: Textcolor}]}>
              Forgot{' '}
              <Text style={[s.headingText1, {color: Textcolor}]}>Password</Text>
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
                let valid = emailReg.test(email);
                setValidEmail(valid);
              }}
              color={Textcolor}
              fontSize={moderateScale(14, 0.1)}
            />
          </View>

          <View style={s.button}>
            <Button
              onPressIn={() => {
                Reset();
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
              <Text style={s.btnText}>Send</Text>
            </Button>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          flex: 0.1,
        }}
        onPress={() => navigation.navigate('Register')}>
        <Text style={[s.forgetPass, {color: Textcolor}]}>
          Don’t Have an Account?
        </Text>
        <Text style={[s.forgetPass, {fontWeight: '700', color: '#FFD700'}]}>
          {' '}
          Sign up Now!
        </Text>
      </TouchableOpacity>

      {modalVisible ? (
        <OTPModal
          navigation={navigation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          OtpSubmit={OtpSubmit}
          screen={'Forgot'}
          setOtp={setOtp}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default ForgetPassword;

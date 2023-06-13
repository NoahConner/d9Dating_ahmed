import {SafeAreaView, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import s from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import axiosconfig from '../../../provider/axios';
import {emailReg} from '../../../Constants/Index';
import {Header, OTPModal, Loader} from '../../../Components/Index';
import {theme} from '../../../Constants/Index';

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [validEmail, setValidEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitted, setSubmitted] = useState();
  const [otp, setOtp] = useState();
  const color = theme === 'dark' ? '#222222' : '#fff';
  const Textcolor = theme === 'dark' ? '#fff' : '#222222';

  const Reset = () => {
    Alert.alert('check email');
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 3000);
  };
  const OtpSubmit = () => {
    Alert.alert('valid code');
    navigation.navigate('ChangePass', {email, otp});
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

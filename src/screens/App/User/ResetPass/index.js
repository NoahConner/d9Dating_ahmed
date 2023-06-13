import {
  SafeAreaView,
  Text,
  View,
  ToastAndroid,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import s from './style';
import Feather from 'react-native-vector-icons/Feather';
import {Input, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Icon2 from 'react-native-vector-icons/Fontisto';
import axiosconfig from '../../../../provider/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header, Loader} from '../../../../Components/Index';
import {theme} from '../../../../Constants/Index';

const Resetpass = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [showPass, setshowPass] = useState(true);
  const [loader, setLoader] = useState(false);
  const [storedPassword, setStorePassword] = useState('');
  const color = theme === 'dark' ? '#222222' : '#fff';
  const Textcolor = theme === 'dark' ? '#fff' : '#222222';

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

  const validate = () => {
    // if (password == storedPassword) {
    navigation.navigate('ChangePass', {
      screen: 'Reset',
    });
    // } else {
    //   Alert.alert('Password Incorrect');
    // }
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: color}}>
      <Header navigation={navigation} />
      <View style={[s.container, {backgroundColor: color}]}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={s.heading}>
            <Text style={[s.headingText1, {color: Textcolor}]}>
              To set a new password, please enter{' '}
              <Text style={[s.headingText1, {color: Textcolor}]}>
                your current password first.
              </Text>
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
                <View style={[s.iconCircle, {borderColor: Textcolor}]}>
                  <Icon2
                    name="locked"
                    color={Textcolor}
                    size={moderateScale(20, 0.1)}
                  />
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
          {password ? (
            <>
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
                  onPressIn={() => validate()}>
                  <Text style={s.btnText}>Continue</Text>
                </Button>
              </View>
            </>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Resetpass;

import { StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native';
import React from 'react';
import { Input, Button } from 'native-base';
import { moderateScale } from 'react-native-size-matters';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Feather from 'react-native-vector-icons/Feather';

const InterRegular = 'Inter-Medium';
const InterBold = 'Inter-ExtraBold';
const Poppins = 'Poppins-Regular';

const OTPModal = ({ loader, modalVisible,screen,setModalVisible, submit, setOtp, navigation,handleSubmit, OtpSubmit}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={s.centeredView}>
        <View style={s.modalView}>
          <Button
            size="sm"
            onPress={() => setModalVisible(false)}
            variant={'link'}
            style={s.close}
            backgroundColor={'#fff'}
            borderRadius={moderateScale(14, 0.1)}
            padding={moderateScale(7, 0.1)}
            zIndex={1000}
            position="absolute"
            right={moderateScale(15, 0.1)}
            top={moderateScale(10, 0.1)}
          >
            <Feather name="x" size={moderateScale(22, 0.1)} color={'grey'} />
          </Button>
          <Text style={s.verifyHeading}>Verification Code</Text>
          <Text style={s.verifyText}>
            Please enter the verification code sent to email
          </Text>

          <OTPInputView
            style={{ width: '80%', height: 200 }}
            pinCount={4}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={s.underlineStyleBase}
            codeInputHighlightStyle={s.underlineStyleHighLighted}
            onCodeFilled={(code => {
              console.log(`Code is ${code}, you are good to go!`)
            })}
            onCodeChanged={(code)=>{
              setOtp(code)
            }}
          />
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
              onPress={() =>
               { if(screen=="register"){
                 handleSubmit()
                }
                if(screen == "Forgot"){
                  OtpSubmit()
                // navigation.navigate('ChangePass')
              }}
                }
            >
              <Text style={s.btnText}>Send</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OTPModal;

const s = StyleSheet.create({
  heading: {
    marginTop: moderateScale(-90, 0.1),
    marginBottom: moderateScale(60, 0.1),
  },
  backbutton: {
    position: 'absolute',
    left: 20,
    top: 25,
    zIndex: 1000,
  },
  headingText: {
    fontFamily: InterBold,
    color: '#fff',
    fontSize: moderateScale(25, 0.1),
    lineHeight: moderateScale(30, 0.1),
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  button: {
    marginTop: moderateScale(15, 0.1),
    marginBottom: moderateScale(10, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },

  borderStyleHighLighted: {
    borderColor: '#FFD700',
  },
  underlineStyleBase: {
    marginHorizontal: moderateScale(15, 0.1),
    width: moderateScale(40, 0.1),
    height: moderateScale(40, 0.1),
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#000',
    color: '#000',
  },

  underlineStyleHighLighted: {
    borderColor: '#FFD700',
  },
  submit: {
    color: '#000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: moderateScale(15, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  verifyHeading: {
    color: '#000',
    fontSize: moderateScale(22, 0.1),
    marginBottom: moderateScale(10, 0.1),
    lineHeight: moderateScale(26, 0.1),
    fontFamily: InterBold,
  },
  verifyText: {
    color: 'grey',
    fontSize: moderateScale(11, 0.1),
    width: moderateScale(180, 0.1),
    lineHeight: moderateScale(15, 0.1),
    textAlign: 'center',
    fontFamily: InterRegular,
  },
  otpView: {
    height: moderateScale(130, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLink: {
    position: 'absolute',
    bottom:
      Platform.OS == 'ios' ? moderateScale(120, 0.1) : moderateScale(40, 0.1),
  },
});
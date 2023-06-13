import {Dimensions, Platform, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Poppins = '';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: moderateScale(12, 0.1),
  },
  heading: {
    marginBottom: moderateScale(30, 0.1),
  },
  headingText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: moderateScale(32, 0.1),
    lineHeight: moderateScale(35, 0.1),
  },
  iconCircle: {
    borderRadius: moderateScale(20, 0.1),
    borderWidth: moderateScale(1, 0.1),
    borderColor: '#fff',
    padding: moderateScale(7, 0.1),
    marginRight: moderateScale(10, 0.1),
    marginBottom: moderateScale(5, 0.1),
  },
  input: {
    marginVertical: moderateScale(10, 0.1),
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(40, 0.1),
  },
  inputTxt: {
    color: '#fff',
    fontFamily: Poppins,
  },
  radioInput: {
    width: '100%',
    marginTop: moderateScale(10, 0.1),
    marginLeft: moderateScale(60, 0.1),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  radio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.3,
  },

  button: {
    top: moderateScale(20, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(50, 0.1),
    bottom: moderateScale(25, 0.1),
  },
  btnText: {
    lineHeight: moderateScale(15, 0.1),
    fontSize: moderateScale(14, 0.1),
    color: '#222222',
  },
  signInNow: {
    color: '#fff',
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(15, 0.1),
  },
  bottomLink: {
    alignSelf: 'center',
    marginBottom: moderateScale(5, 0.1)
  },
  inputStyle: {
    fontSize: moderateScale(12, 0.1)
  },
  inputContainerStyle: {
    width: '75%',
    paddingVertical: moderateScale(10, 0.1),
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  eye: {
    position: 'absolute',
    top: moderateScale(13),
    right: moderateScale(13),
  },
  error: {
    color: 'red',
    fontSize: moderateScale(12, 0.1),
  },
  date: {
    paddingBottom: moderateScale(10),
    fontSize: moderateScale(12, 0.1),
    textAlign: 'center',
  },
  dateView: {
    borderBottomWidth: moderateScale(1, 0.1),
    flex: 0.2,
    marginTop: moderateScale(5),
  },
  forgetPass: {
    color: '#FFFFFF',
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(15, 0.1)
  },
});

export default styles;

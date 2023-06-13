import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Poppins = '';
const PoppinsBold = ''

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header:{
    paddingHorizontal: moderateScale(10,0.1)
  },
  heading: {
    marginTop: moderateScale(30, 0.1),
    marginBottom: moderateScale(60, 0.1),
  },
  headingText: {
    fontSize: moderateScale(32, 0.1),
    lineHeight: moderateScale(48, 0.1),
    fontWeight : '700'
  },
  headingText1: {
    fontSize: moderateScale(32, 0.1),
    lineHeight: moderateScale(48, 0.1),
    fontWeight: '300'
  },
  eye: {
    position: 'absolute',
    top: moderateScale(13),
    right: moderateScale(13),
  },
  iconCircle: {
    padding: moderateScale(7, 0.1),
    marginRight: moderateScale(15, 0.1),
    marginLeft: moderateScale(5,0.1),
    marginBottom: moderateScale(5, 0.1),
  },
  input: {
    marginVertical: moderateScale(17, 0.1),
  },
  button: {
    marginTop: moderateScale(45, 0.1),
    marginBottom: moderateScale(10, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    lineHeight: moderateScale(20, 0.1),
    fontSize: moderateScale(13, 0.1),
    color: '#222222',
  },
  forgetPass: {
    color: '#FFFFFF',
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(15, 0.1)
  },
  forgetPass1: {
    color: '#FFD700',
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(15, 0.1)
  },
  bottomLink: {
     marginTop: moderateScale(200)
   
  },
  error: {
    color: 'red',
    fontSize: moderateScale(12, 0.1),
  },
});

export default styles;
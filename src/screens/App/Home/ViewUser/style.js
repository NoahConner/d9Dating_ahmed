import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Poppins = '';
const PoppinsBold = '';

const styles = StyleSheet.create({
  View1: {
    flex: 0.45,
    backgroundColor: 'black',
    // alignItems: 'center',
  },

  View2: {
    flex: 0.55,
    backgroundColor: '#222222',
    // position:'absolute',
    borderTopLeftRadius: moderateScale(25, 0.1),
    borderTopRightRadius: moderateScale(25, 0.1),
    //  bottom: moderateScale(100)
    // bottom: moderateScale(50)
  },
  view1Img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    // borderRadius: moderateScale(20, 0.1)
  },
  container: {
    marginTop: moderateScale(25, 0.1),
    paddingHorizontal: moderateScale(18, 0.1),
  },
  headerTxt: {
    //fontFamily: Poppins,
    fontSize: moderateScale(24, 0.1),
    lineHeight: moderateScale(36, 0.1),
    color: '#fff',
    alignSelf: 'center',
  },
  location: {
    //fontFamily: Poppins,
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(15, 0.1),
    color: '#9F9F9F',
    paddingHorizontal: moderateScale(7, 0.1),
    alignSelf: 'center',
  },
  row: {
    // marginVertical: moderateScale(15),
    // paddingHorizontal: moderateScale(12,0.1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: moderateScale(10,0.1)
  },
  row1: {
    marginVertical: moderateScale(10, 0.1),
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  icon: {
    width: moderateScale(37, 0.1),
    height: moderateScale(37, 0.1),
    borderRadius: moderateScale(30, 0.1),
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    //fontFamily: Poppins,
    fontSize: moderateScale(12, 0.1),
    lineHeight: moderateScale(18, 0.1),
    color: '#9F9F9F',
  },
  about: {
    marginTop: moderateScale(20, 0.1),
    marginBottom: moderateScale(7, 0.1),
  },
  aboutTxt: {
    //fontFamily: Poppins,
    fontSize: moderateScale(16, 0.1),
    lineHeight: moderateScale(23, 0.1),
    color: '#fff',
  },
  abTxt: {
    marginVertical: moderateScale(10, 0.1),
  },
  btn: {
    marginBottom: moderateScale(10, 0.1),
    alignSelf: 'center',
    width: moderateScale(155, 0.1),
    height: moderateScale(40, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    borderRadius: moderateScale(25, 0.1),
  },
  btnTxt: {
    //fontFamily: Poppins,
    fontSize: moderateScale(14, 0.1),
    lineHeight: moderateScale(19.5, 0.1),
    color: '#222222',
  },
  line: {
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(80, 0.1),
    borderWidth: moderateScale(2.5, 0.1),
    borderColor: 'rgba(255, 255, 255, 0.44)',
    borderRadius: moderateScale(4, 0.1),
    alignSelf: 'center',
    marginTop: moderateScale(25, 0.1),
  },
  connected: {
    flexDirection: 'column',
  },
});

export default styles;

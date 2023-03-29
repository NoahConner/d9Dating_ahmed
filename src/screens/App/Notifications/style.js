import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Poppins = '';
const PoppinsBold = '';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(12, 0.1),
    // paddingEnd: moderateScale(-20,0.1),
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    paddingBottom: moderateScale(70, 0.1),
  },
  HeadingText: {
    fontSize: moderateScale(20, 0.1),
    //fontFamily: PoppinsBold,
    lineHeight: moderateScale(30, 0.1),
  },
  border: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: moderateScale(10, 0.1),
    borderBottomWidth: moderateScale(2, 0.1),
  },
  btn: {
    flex: 0.5,
  },
  chats: {
    fontSize: moderateScale(13, 0.1),
    lineHeight: moderateScale(18, 0.1),
    //fontFamily: Poppins,
  },
  dp: {
    flex: 0.15,
    width: moderateScale(53, 0.1),
    height: moderateScale(53, 0.1),
    borderRadius: moderateScale(53 / 2, 0.1),
    marginRight: moderateScale(10, 0.1),
  },
  userName: {
    marginBottom: moderateScale(25, 0.1),
    marginTop: moderateScale(2, 0.1),
    fontSize: moderateScale(10, 0.1),
  },
  addBtn: {
    width: moderateScale(11, 0.1),
    height: moderateScale(11, 0.1),
    zIndex: 1000,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: moderateScale(8, 0.1),
    right: moderateScale(5, 0.1),
    borderRadius: moderateScale(11 / 2, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  myStory: {
    width: moderateScale(65, 0.1),
    height: moderateScale(65, 0.1),
    marginTop: moderateScale(10, 0.1),
    marginLeft: moderateScale(12, 0.1),
  },
  dp1: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(53 / 2, 0.1),
  },
  col: {
    flexDirection: 'column',
  },
  card: {
    flexDirection: 'row',
    marginVertical: moderateScale(15, 0.1),
  },
  name: {
    //fontFamily: PoppinsBold,
    fontSize: moderateScale(13, 0.1),
    lineHeight: moderateScale(17, 0.1),
  },
  name1: {
    //fontFamily: Poppins,
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(15, 0.1),
    // paddingLeft: moderateScale(10),
    alignSelf: 'center',
    color: '#7B7A7A',
  },
  fText: {
    // paddingHorizontal: moderateScale(12,0.1),
    alignSelf: 'center',
    fontSize: moderateScale(14, 0.1),
  },
  fView: {
    width: moderateScale(100, 0.1),
    marginRight: moderateScale(50, 0.1),
    height: moderateScale(32, 0.1),
    borderColor: 'green',
    borderWidth: 1,
    justifyContent: 'center',
  },
  textRegular: {
    //fontFamily: Poppins,
    fontSize: moderateScale(11, 0.1),
    lineHeight: moderateScale(14, 0.1),
    marginVertical: moderateScale(5, 0.1),
  },
  textSmall: {
    //fontFamily: Poppins,
    fontSize: moderateScale(8, 0.1),
    lineHeight: moderateScale(12, 0.1),
    marginVertical: moderateScale(5, 0.1),
  },
  img: {
    width: '100%',
  },
  icon: {
    flex: 0.15,
    justifyContent: 'center',
    paddingTop: moderateScale(9, 0.1),
    // alignItems:'center',
    // alignItems: 'flex-end',
    flexDirection: 'row',
    // alignSelf:'center',
    //  marginRight: moderateScale(-20),
  },
  hTxt: {
    color: '#7B7A7A',
    //fontFamily: Poppins,
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(15, 0.1),
  },
  hTxt1: {
    color: '#FFFFFF',
    fontSize: moderateScale(15, 0.1),
    lineHeight: moderateScale(22, 0.1),
    //fontFamily: Poppins,
    fontWeight: '700',
  },
  hView: {
    marginVertical: moderateScale(15, 0.1),
    top: moderateScale(15, 0.1),
  },
});

export default styles;

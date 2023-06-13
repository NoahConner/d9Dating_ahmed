import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Poppins = 'Poppins-Regular';
const PoppinsBold = 'Poppins-Bold';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(20, 0.1),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // paddingBottom: moderateScale(70, 0.1),
    paddingTop: moderateScale(20, 0.1),
  },
  chatContainer: {
    // margin: moderateScale(20, 0.1),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(-20, 0.1),
  },
  HeadingText: {
    fontSize: moderateScale(20, 0.1),
    fontFamily: PoppinsBold,
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
    fontFamily: Poppins,
  },
  dp: {
    width: moderateScale(61, 0.1),
    height: moderateScale(61, 0.1),
    borderRadius: moderateScale(61 / 2, 0.1),
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
    flex: 0.7,
    margin: moderateScale(15, 0.1),
    alignItems: 'center',
  },
  name: {
    fontFamily: PoppinsBold,
    fontSize: moderateScale(13, 0.1),
    lineHeight: moderateScale(17, 0.1),
  },
  userName: {
    fontFamily: PoppinsBold,
    color: '#fff',
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(14, 0.1),
  },
  textRegular: {
    fontFamily: Poppins,
    fontSize: moderateScale(11, 0.1),
    lineHeight: moderateScale(14, 0.1),
    marginVertical: moderateScale(5, 0.1),
  },
  textSmall: {
    fontFamily: Poppins,
    fontSize: moderateScale(8, 0.1),
    lineHeight: moderateScale(12, 0.1),
    marginVertical: moderateScale(5, 0.1),
    color: '#787878',
  },
  img: {
    width: '100%',
  },
  time: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  options: {
    flex: 0.2,

    justifyContent: 'center',
    alignItems: 'flex-end',
    // marginLeft: moderateScale(140, 0.1),
    paddingBottom: moderateScale(15, 0.1),
  },
  messege: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(15, 0.1),
  },
  textSmall1: {
    fontFamily: Poppins,
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(15, 0.1),
    marginVertical: moderateScale(5, 0.1),
    color: '#fff',
  },
  text: {
    flexDirection: 'row',
    padding: moderateScale(15, 0.1),
    backgroundColor: '#4D4D4D',
    borderRadius: moderateScale(5, 0.1),
  },
  row: {
    position: 'absolute',
    padding: moderateScale(10, 0.1),
    bottom: moderateScale(0, 0.1),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {
    flexDirection: 'row',
    flex: 0.9,
    borderRadius: moderateScale(15, 0.1),
    backgroundColor: '#595757',
    padding: moderateScale(5, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtn: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: moderateScale(15, 0.1),
  },
  circle: {
    // flex: 0.2,
    width: moderateScale(37, 0.1),
    height: moderateScale(37, 0.1),
    borderRadius: moderateScale(37 / 2, 0.1),
    borderColor: '#8F8A8A',
    borderWidth: moderateScale(1, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(10, 0.1),
  },
  inputText: {
    flex: 0.8,
    // backgroundColor: 'red',
  },
  attach: {
    flex: 0.2,
    alignItems: 'flex-end',
    paddingRight: moderateScale(10, 0.1),
  },
});

export default styles;

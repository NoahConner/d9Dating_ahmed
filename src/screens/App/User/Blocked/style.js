import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Poppins = '';
const PoppinsBold = '';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(12, 0.1),
    marginTop: moderateScale(10, 0.1),
    paddingBottom: moderateScale(70, 0.1),
  },
  HeadingText: {
    fontSize: moderateScale(20, 0.1),
    lineHeight: moderateScale(30, 0.1),
  },
  border: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: moderateScale(10, 0.1),
    borderBottomWidth: moderateScale(2, 0.1),
  },

  chats: {
    fontSize: moderateScale(13, 0.1),
    lineHeight: moderateScale(18, 0.1),
  },
  dp: {
    flex: 0.18,
    width: moderateScale(55, 0.1),
    height: moderateScale(55, 0.1),
    borderRadius: moderateScale(55 / 2, 0.1),
    borderWidth: moderateScale(2, 0.1),
    marginRight: moderateScale(15, 0.1),
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
    fontSize: moderateScale(13, 0.1),
    lineHeight: moderateScale(17, 0.1),
  },
  name1: {
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(15, 0.1),
    alignSelf: 'center',
    color: '#7B7A7A',
  },
  textRegular: {
    fontSize: moderateScale(11, 0.1),
    lineHeight: moderateScale(14, 0.1),
    marginVertical: moderateScale(5, 0.1),
  },
  textSmall: {
    fontSize: moderateScale(8, 0.1),
    lineHeight: moderateScale(12, 0.1),
    marginVertical: moderateScale(5, 0.1),
  },
  img: {
    width: '100%',
  },
  btn: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    width: moderateScale(144, 0.1),
    height: moderateScale(34, 0.1),
    marginTop: moderateScale(5, 0.1),
    borderRadius: moderateScale(10, 0.1),
  },
  hTxt: {
    color: '#7B7A7A',
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(15, 0.1),
  },
  hTxt1: {
    color: '#FFFFFF',
    fontSize: moderateScale(15, 0.1),
    lineHeight: moderateScale(22, 0.1),
    fontWeight: '700',
  },
  hView: {
    marginVertical: moderateScale(15, 0.1),
    top: moderateScale(15, 0.1),
  },
});

export default styles;

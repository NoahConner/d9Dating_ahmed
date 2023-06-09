import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Poppins = '';
const PoppinsBold = '';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: moderateScale(12, 0.1),
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(22, 0.1),
    justifyContent: 'flex-start',
    marginVertical: moderateScale(12, 0.1),
  },
  option: {
    fontSize: moderateScale(14, 0.1),
    marginRight: moderateScale(10, 0.1),
  },
  optionView: {
    flexDirection: 'row',
    borderBottomWidth: moderateScale(1, 0.1),
    borderBottomColor: 'grey',
    right: moderateScale(7, 0.1),
    width: moderateScale(150, 0.1),
    paddingBottom: moderateScale(5, 0.1),
  },
  optionBtns: {
    fontSize: moderateScale(14, 0.1),
  },
  smallText: {
    fontSize: moderateScale(12, 0.1),
    position: 'absolute',
    left: moderateScale(43, 0.1),
    width: moderateScale(150, 0.1),
    top: moderateScale(10, 0.1),
    color: '#898989',
  },
  btn: {
    justifyContent: 'center',
  },
  HeadingTxt: {
    fontSize: moderateScale(15, 0.1),
    lineHeight: moderateScale(20, 0.1),
  },

  btnView: {
    width: moderateScale(75, 0.1),
    height: moderateScale(25, 0.1),
    borderWidth: moderateScale(1.5, 0.1),
    borderColor: '#fff',
    borderRadius: moderateScale(15, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    width: moderateScale(54, 0.1),
    height: moderateScale(54, 0.1),
    borderRadius: moderateScale(54 / 2, 0.1),
  },
  buttonText: {
    fontSize: moderateScale(13, 0.1),
    alignSelf: 'center',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  mainText: {
    fontSize: moderateScale(15, 0.1),
    lineHeight: moderateScale(19, 0.1),
  },
  mText: {
    paddingHorizontal: moderateScale(28, 0.1),
    marginVertical: moderateScale(8, 0.1),
  },
  location: {
    paddingHorizontal: moderateScale(28, 0.1),
    marginVertical: moderateScale(8, 0.1),
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  imgView: {
    marginVertical: moderateScale(15, 0.1),
    paddingHorizontal: moderateScale(12, 0.1),
  },
  img: {
    alignSelf: 'center',
    width: moderateScale(300, 0.1),
    height: moderateScale(300, 0.1),
    backgroundColor: '#302D2D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(12, 0.1),
  },
  vectorImg: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryImage: {
    width: moderateScale(300, 0.1),
    height: moderateScale(300, 0.1),
    borderRadius: moderateScale(12, 0.1),
  },
  capturebtntxt: {
    fontSize: moderateScale(13, 0.1),
    alignSelf: 'center',
    color: '#fff',
    paddingHorizontal: moderateScale(7, 0.1),
  },
  capturebtnicon: {
    color: '#fff',
    fontSize: moderateScale(25),
  },
  capturebtn: {
    borderColor: '#302D2D',
    flexDirection: 'row',
    borderRadius: moderateScale(10, 0.1),
    width: moderateScale(180, 0.1),
    backgroundColor: '#302D2D',
  },
  postBtn: {
    marginVertical: moderateScale(15, 0.1),
    width: moderateScale(93, 0.1),
    height: moderateScale(25, 0.1),
    borderWidth: moderateScale(1.5, 0.1),
    borderColor: '#fff',
    borderRadius: moderateScale(20, 0.1),
    marginHorizontal: moderateScale(25, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  postTxt: {
    fontSize: moderateScale(13, 0.1),
    lineHeight: moderateScale(19.5, 0.1),
    color: '#fff',
  },
});

export default styles;

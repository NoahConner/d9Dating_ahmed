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

  btn: {
    justifyContent: 'center',
  },
  headingTxt: {
    fontSize: moderateScale(15, 0.1),
    lineHeight: moderateScale(20, 0.1),
  },

  headerImage: {
    width: moderateScale(54, 0.1),
    height: moderateScale(54, 0.1),
    borderRadius: moderateScale(54 / 2, 0.1),
  },

  mText: {
    paddingHorizontal: moderateScale(28, 0.1),
    marginVertical: moderateScale(8, 0.1),
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
    height: moderateScale(30, 0.1),
    borderWidth: moderateScale(1.5, 0.1),
    borderRadius: moderateScale(20, 0.1),
    marginHorizontal: moderateScale(35, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  postTxt: {
    fontSize: moderateScale(13, 0.1),
    lineHeight: moderateScale(19.5, 0.1),
    color: '#fff',
  },
  postImg: {
    width: moderateScale(153, 0.1),
    height: moderateScale(136, 0.1),
  },
  icon: {
    position: 'absolute',
    top: moderateScale(120, 0.1),
  },
  rbs: {
    alignItems: 'center',
    height: moderateScale(220),
    borderRadius: moderateScale(20, 0.1),
  },
  rbsView: {
    marginVertical: moderateScale(30, 0.1),
    justifyContent: 'center',
    alignContent: 'center',
  },
  privacy: {
    flexDirection: 'row',
    borderWidth: 1,
    marginVertical: moderateScale(7),
    borderRadius: moderateScale(8, 0.1),
    paddingLeft: moderateScale(10, 0.1),
    width: moderateScale(180, 0.1),
    height: moderateScale(33, 0.1),
    alignItems: 'center',
  },
  dp: {
    borderWidth: moderateScale(2, 0.1),
    width: moderateScale(58, 0.1),
    height: moderateScale(58, 0.1),
    borderRadius: moderateScale(58 / 2, 0.1),
    marginHorizontal: moderateScale(10, 0.1),
  },
  name: {
    flex: 0.8,
    alignSelf: 'center',
  },
  loc: {
    marginLeft: moderateScale(10, 0.1),
    fontSize: moderateScale(14, 0.1),
  },
});

export default styles;

import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Poppins = '';
const PoppinsBold = '';

const styles = StyleSheet.create({
  container: {
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
  img: {
    marginTop: moderateScale(5, 0.1),
    alignSelf: 'center',
    width: moderateScale(360, 0.1),
    height: moderateScale(350, 0.1),
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
    width: moderateScale(360, 0.1),
    height: moderateScale(350, 0.1),
    borderRadius: moderateScale(12, 0.1),
  },
  dp: {
    width: moderateScale(50, 0.1),
    height: moderateScale(50, 0.1),
    borderRadius: moderateScale(50 / 2, 0.1),
    borderWidth: moderateScale(2, 0.1),
    marginHorizontal: moderateScale(15, 0.1),
    marginVertical: moderateScale(3, 0.1),
  },

  smallDp: {
    width: moderateScale(25, 0.1),
    height: moderateScale(25, 0.1),
    borderRadius: moderateScale(40 / 2, 0.1),
    borderWidth: moderateScale(2, 0.1),
  },
  container1: {
    flex: 1,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  card: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginVertical: moderateScale(10, 0.1),
    paddingBottom: moderateScale(5, 0.1),
    borderBottomColor: 'grey',
    borderBottomWidth: moderateScale(1, 0.1),
  },
  name: {
    fontWeight: 700,
    fontSize: moderateScale(13, 0.1),
    lineHeight: moderateScale(15, 0.1),
  },
  details: {
    width: moderateScale(200, 0.1),
    flexDirection: 'column',
    marginTop: moderateScale(5, 0.1),
  },
  modal: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: moderateScale(22, 0.1),
    right: moderateScale(15, 0.1),
    zIndex: 100000,
    width: moderateScale(110, 0.1),
    borderWidth: moderateScale(2, 0.1),
    borderColor: '#222233',
    flexDirection: 'column',
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },

  img: {
    paddingHorizontal: moderateScale(10, 0.1),
  },
  optionView: {
    flexDirection: 'row',
    borderBottomWidth: moderateScale(1, 0.1),
    borderBottomColor: 'grey',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: moderateScale(5, 0.1),
  },
  optionBtns: {
    fontSize: moderateScale(12, 0.1),
    flex: 0.7,
  },
  userName: {
    marginBottom: moderateScale(25, 0.1),
    marginTop: moderateScale(3, 0.1),
    fontSize: moderateScale(11, 0.1),
    width: moderateScale(100, 0.1),
  },
  addBtn: {
    width: moderateScale(25, 0.1),
    height: moderateScale(25, 0.1),
    zIndex: 1000,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: moderateScale(25 / 2, 0.1),
    borderWidth: moderateScale(3, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  myStory: {
    width: moderateScale(65, 0.1),
    height: moderateScale(65, 0.1),
    marginTop: moderateScale(8, 0.1),
    marginLeft: moderateScale(12, 0.1),
    marginBottom: moderateScale(50, 0.1),
    borderRadius: moderateScale(65 / 2, 0.1),
  },
  col: {
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    marginBottom: moderateScale(5, 0.1),
  },
  name: {
    fontSize: moderateScale(13, 0.1),
    lineHeight: moderateScale(17, 0.1),
  },
  textRegular: {
    fontSize: moderateScale(11, 0.1),
    lineHeight: moderateScale(15, 0.1),
    marginVertical: moderateScale(5, 0.1),
  },
  img: {
    width: '100%',
    alignItems: 'center',
  },
  option: {
    fontSize: moderateScale(14, 0.1),
    marginRight: moderateScale(10, 0.1),
  },
  options: {
    flex: 0.1,
    justifyContent: 'flex-start',
    marginTop: moderateScale(5, 0.1),
    marginRight: moderateScale(-12, 0.1),
  },
  likes: {
    backgroundColor: 'rgba(195, 195, 195, 0.6)',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    width: moderateScale(62, 0.1),
    height: moderateScale(25, 0.1),
    borderRadius: moderateScale(20, 0.1),
    top: moderateScale(20, 0.1),
    right: moderateScale(30, 0.1),
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
    fontSize: moderateScale(15, 0.1),
    lineHeight: moderateScale(19, 0.1),
    color: '#222222',
    marginRight: moderateScale(10, 0.1),
  },
  textCreate: {
    fontSize: moderateScale(15, 0.1),
    marginBottom: moderateScale(15, 0.1),
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  likesCount: {
    fontSize: moderateScale(10, 0.1),
    color: '#fff',
  },
  dp1: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(50 / 2, 0.1),
  },
  funView: {
    position: 'absolute',
    right: 0,
    top: moderateScale(90, 0.1),
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: moderateScale(10, 0.1),
  },
  yellow: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
  },
  round: {
    width: moderateScale(25, 0.1),
    height: moderateScale(25, 0.1),
    borderRadius: moderateScale(25 / 2, 0.1),
  },
  round2: {
    marginBottom: moderateScale(25, 0.1),
    marginLeft: moderateScale(-10, 0.1),
    width: moderateScale(14, 0.1),
    height: moderateScale(14, 0.1),
    borderRadius: moderateScale(14 / 2, 0.1),
  },

  count: {
    fontSize: moderateScale(7, 0.1),
    color: '#000',
  },
  funText: {
    fontSize: moderateScale(11, 0.1),
  },
  footer: {
    marginHorizontal: moderateScale(15, 0.1),
    marginVertical: moderateScale(10, 0.1),
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
});

export default styles;

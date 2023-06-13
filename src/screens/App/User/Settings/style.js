import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Poppins = '';
const PoppinsBold = '';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: moderateScale(25, 0.1),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  dp1: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(76 / 2, 0.1),
  },
  dp: {
    width: moderateScale(76, 0.1),
    height: moderateScale(76, 0.1),
    borderRadius: moderateScale(76 / 2, 0.1),
    marginRight: moderateScale(15, 0.1),
  },
  button: {
    marginTop: moderateScale(15, 0.1),
    marginBottom: moderateScale(10, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  circle: {
    padding: moderateScale(2, 0.1),
    backgroundColor: '#474646',
    width: moderateScale(25, 0.1),
    height: moderateScale(25, 0.1),
    borderRadius: moderateScale(25 / 2, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: moderateScale(10, 0.1),
    right: 0,
  },
  edit: {
    width: moderateScale(18, 0.1),
    height: moderateScale(18, 0.1),
    borderRadius: moderateScale(18 / 2, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: moderateScale(1, 0.1),
  },
  dltbtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    height: moderateScale(32, 0.1),
    width: moderateScale(146, 0.1),
    borderRadius: moderateScale(15, 0.1),
    marginVertical: moderateScale(10, 0.1),
  },
  dltTxt: {
    fontSize: moderateScale(13, 0.1),
    lineHeight: moderateScale(20, 0.1),
    fontWeight: '300',
    color: '#222222',
  },
  username: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBold: {
    fontSize: moderateScale(20, 0.1),
    lineHeight: moderateScale(30, 0.1),
    marginRight: moderateScale(10, 0.1),
  },
  inputSection: {
    marginTop: moderateScale(20, 0.1),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: moderateScale(25, 0.1),
    borderTopRightRadius: moderateScale(25, 0.1),
  },
  icon: {
    marginRight: moderateScale(20, 0.1),
  },
  input: {
    marginVertical: moderateScale(15, 0.1),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  input1: {
    marginVertical: moderateScale(15, 0.1),
    marginHorizontal: moderateScale(25, 0.1),
  },
  radio: {
    marginHorizontal: moderateScale(15, 0.1),
  },
  text: {
    flex: 0.5,
    fontSize: moderateScale(12, 0.1),
  },
  iconCircle: {
    padding: moderateScale(7, 0.1),
    marginRight: moderateScale(15, 0.1),
    marginLeft: moderateScale(5, 0.1),
  },
  switch: {
    width: '100%',
    marginTop: moderateScale(15, 0.1),
    marginBottom: moderateScale(100, 0.1),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  smallText: {
    fontSize: moderateScale(6, 0.1),
    position: 'absolute',
    left: moderateScale(40, 0.1),
    width: moderateScale(100, 0.1),
    top: moderateScale(20, 0.1),
    color: '#898989',
  },
});

export default styles;

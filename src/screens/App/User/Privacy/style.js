import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Poppins = '';
const PoppinsBold = '';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(20, 0.1),
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
    marginBottom: moderateScale(20, 0.1),
  },
  option: {
    fontSize: moderateScale(12, 0.1),
    marginRight: moderateScale(4, 0.1),
    marginTop: moderateScale(4, 0.1),
  },
  input: {
    marginVertical: moderateScale(15, 0.1),
  },
  radio: {
    marginHorizontal: moderateScale(15, 0.1),
  },
  modal: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: moderateScale(44, 0.1),
    zIndex: 100000,
    width: moderateScale(150, 0.1),
    flexDirection: 'column',
    borderWidth: moderateScale(1, 0.1),
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },

  img: {
    width: '100%',
  },
  optionView: {
    flexDirection: 'row',
    borderBottomWidth: moderateScale(1, 0.1),
    borderBottomColor: 'grey',
    justifyContent: 'flex-start',
    width: moderateScale(150, 0.1),
    paddingBottom: moderateScale(5, 0.1),
  },
  optionBtns: {
    fontSize: moderateScale(12, 0.1),
    fontFamily: Poppins,
  },
  smallText: {
    fontSize: moderateScale(12, 0.1),
    position: 'absolute',
    left: moderateScale(40, 0.1),
    width: moderateScale(150, 0.1),
    top: moderateScale(12, 0.1),
    color: '#898989',
  },
  text: {
    flex: 0.5,
    fontSize: moderateScale(12, 0.1),
  },
  switch: {
    width: '100%',
    marginTop: moderateScale(15, 0.1),
    marginBottom: moderateScale(100, 0.1),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default styles;

import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Poppins = '';
const PoppinsBold = '';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: moderateScale(20, 0.1),
    paddingBottom: '10%',
  },

  hView: {
    marginVertical: moderateScale(15, 0.1),
  },
  hTxt: {
    color: '#FFFFFF',
    fontSize: moderateScale(22, 0.1),
    lineHeight: moderateScale(30, 0.1),
    fontWeight: '700',
  },
  txt: {
    fontSize: moderateScale(12, 0.1),
    lineHeight: moderateScale(18, 0.1),
    color: '#7D7D7D',
  },
  Ctxt: {
    marginVertical: moderateScale(20, 0.1),
  },
  button: {
    flex: 0.2,
    top: moderateScale(15, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(20, 0.1),
    bottom: moderateScale(15, 0.1),
  },
  row: {
    top: moderateScale(280, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(5, 0.1),
    borderWidth: 0.9,
    borderColor: 'white',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});

export default styles;

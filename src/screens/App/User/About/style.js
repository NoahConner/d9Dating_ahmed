import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Poppins = '';
const PoppinsBold = '';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(20, 0.1),
    paddingBottom: moderateScale(70, 0.1),
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
    marginVertical: moderateScale(10, 0.1),
  },
});

export default styles;

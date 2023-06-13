import {Platform, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    paddingVertical: moderateScale(5),
    height: moderateScale(65),
    marginLeft: moderateScale(10, 0),
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tf: {
    backgroundColor: 'transparent',
  },
  nameHEader: {
    position: 'absolute',
    left: moderateScale(65),
  },
  nmaeTxt: {
    fontSize: moderateScale(16),
    marginTop: 3,
    color: '#999',
  },
  leftMin: {
    left: moderateScale(20),
  },
  floatable: {
    position: 'absolute',
    zIndex: 9,
    top: Platform.OS == 'ios' ? moderateScale(40, 0.1) : 0,
    width: '100%',
  },
});

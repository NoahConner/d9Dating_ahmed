import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Spinner} from 'native-base';
import { height, width } from '../Constants/Index';

const Loader = () => {
  return (
    <View style={styles.container}>
      <Spinner size="lg" colorScheme={'#F8F8F8'} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: moderateScale(120, 0.1),
    height: moderateScale(128, 0.1),
  },
});

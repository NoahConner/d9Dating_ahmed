import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {height, theme, width} from '../Constants/Index';
import {ActivityIndicator} from 'react-native';

const Loader = () => {
  const backgroundColor = theme === 'dark' ? '#000' : '#fff';
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <ActivityIndicator size="large" color="#FFD700" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
export default Loader;

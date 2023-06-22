import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {captureImage, chooseFile, theme} from '../Constants/Index';
import {moderateScale} from 'react-native-size-matters';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Stack, Button} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RBSheetCam = ({refRBSheet, setData, screen}) => {
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';

  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={300}
      openDuration={250}
      customStyles={{
        container: {
          backgroundColor: textColor,
          alignItems: 'center',
          height: moderateScale(220),
          borderRadius: moderateScale(20, 0.1),
        },
      }}>
      <View style={s.imgOptions}>
        <Stack
          direction={{
            base: 'column',
            md: 'row',
          }}
          space={4}>
          <Button
            transparent
            style={s.capturebtn}
            onPressIn={() => {
              captureImage('image', refRBSheet, setData, screen);
            }}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="camera" style={s.capturebtnicon} />
              <Text style={s.capturebtntxt}>Open Camera</Text>
            </View>
          </Button>
          <Button
            transparent
            style={s.capturebtn}
            onPressIn={() => {
              chooseFile('image', refRBSheet, setData, screen);
            }}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="md-image-outline" style={s.capturebtnicon} />
              <Text style={s.capturebtntxt}>Open Gallery</Text>
            </View>
          </Button>
        </Stack>
      </View>
    </RBSheet>
  );
};

export default RBSheetCam;

const s = StyleSheet.create({
  imgOptions: {
    marginVertical: moderateScale(30, 0.1),
    justifyContent: 'center',
    alignContent: 'center',
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

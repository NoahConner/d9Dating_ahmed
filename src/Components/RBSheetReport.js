import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {theme} from '../Constants/Index';
import {moderateScale} from 'react-native-size-matters';
import RBSheet from 'react-native-raw-bottom-sheet';
import Loader from './Loader';

const RBSheetReport = ({refRBSheet1, reportReasons, handleReport, loader}) => {
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  return (
    <RBSheet
      ref={refRBSheet1}
      closeOnDragDown={true}
      openDuration={250}
      customStyles={{
        container: {
          alignItems: 'center',
          height: moderateScale(480),
          borderRadius: moderateScale(20, 0.1),
          backgroundColor: color,
        },
      }}>
      {loader ? <Loader /> : null}
      <View style={s.report}>
        <Text style={[s.rb, {color: textColor}]}>Report</Text>
      </View>
      <View style={s.gap}>
        <View style={[s.hv]}>
          <Text style={[s.hv, {color: textColor}]}>
            Why are you reporting this post?
          </Text>
        </View>

        <Text style={[s.txt]}>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available
        </Text>

        <View style={{display: 'flex'}}>
          <View style={s.list}>
            <Text style={[s.listTxt, {color: textColor}]}></Text>
          </View>
          {reportReasons.map((reason, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={handleReport}
                style={s.list}>
                <View>
                  <Text style={[s.listTxt, {color: textColor}]}>{reason}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </RBSheet>
  );
};

export default RBSheetReport;

const s = StyleSheet.create({
  rb: {
    fontSize: moderateScale(16, 0.1),
    lineHeight: moderateScale(18, 0.1),
  },
  gap: {
    paddingHorizontal: moderateScale(13, 0.1),
  },
  hv: {
    marginVertical: moderateScale(10, 0.1),
  },
  txt: {
    color: 'gray',
    fontSize: moderateScale(12, 0.1),
  },
  list: {
    marginVertical: moderateScale(9, 0.1),
  },
});

import React, {useState, useContext, useEffect} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Share,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import Inicon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../Constants/Index';

const Header = ({
  navigation,
  backbutton,
  sharebutton,
  logo,
  pagename,
  float,
  ListingK,
}) => {
  const Textcolor = theme === 'dark' ? '#fff' : '#222222';
  const color = theme === 'dark' ? '#222222' : '#fff';

  return (
    <View style={[[s.main, s.container]]}>
      <View>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Inicon
            name="arrow-back-circle-outline"
            size={moderateScale(30)}
            color={Textcolor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

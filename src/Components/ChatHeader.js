import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {Input, Menu, Pressable} from 'native-base';
import {TouchableOpacity, Text, View, Image, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Inicon from 'react-native-vector-icons/Ionicons';
import MaterialCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Poppins, dummyImage, getColor, textColor} from '../Constants/Index';
import {AppContext, useAppContext} from '../Context/AppContext';
import {theme} from '../Constants/Index';
import axiosconfig from '../Providers/axios';

const ChatHeader = ({userData, getMessages, setLoader, navigation}) => {
  const {token} = useAppContext(AppContext);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const chatDlt = async () => {
    setLoader(true);
    await axiosconfig
      .delete(`clear_chat/${userData?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res);
        getMessages();
        setLoader(false);
      })
      .catch(err => {
        console.log(err);
        setLoader(false);
      });
  };
  return (
    <View style={s.header}>
      <TouchableOpacity
        style={{flex: 0.1}}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Message'}],
            }),
          );
        }}>
        <Inicon
          name="arrow-back-circle-outline"
          size={moderateScale(30)}
          color={textColor}
        />
      </TouchableOpacity>
      <View style={s.card}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ViewUser', {
              screen: 'search',
              post: {id: userData?.id},
            });
          }}
          style={[
            s.dp,
            {
              marginHorizontal: moderateScale(10, 0.1),
              borderColor: getColor(userData?.group),
            },
          ]}>
          <Image
            source={{
              uri: userData?.image ? userData?.image : dummyImage,
            }}
            style={s.dp1}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ViewUser', {
              screen: 'search',
              post: {id: userData?.id},
            })
          }>
          <Text style={[s.name, {color: textColor}]}>
            {userData?.name + ' ' + userData?.last_name}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[s.options]}>
        <Menu
          borderWidth={moderateScale(1, 0.1)}
          borderColor={'grey'}
          backgroundColor={color}
          marginLeft={moderateScale(9, 0.1)}
          marginRight={moderateScale(9, 0.1)}
          marginTop={moderateScale(25, 0.1)}
          closeOnSelect={true}
          trigger={triggerProps => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}>
                <Entypo
                  name={'dots-three-vertical'}
                  color={textColor}
                  size={moderateScale(15, 0.1)}
                />
              </Pressable>
            );
          }}>
          <Menu.Item
            onPress={() => {
              chatDlt();
            }}>
            <TouchableOpacity
              onPress={() => {
                chatDlt();
              }}
              style={s.optionView}>
              <MaterialCIcons
                name={'delete-forever'}
                color={textColor}
                size={moderateScale(13, 0.1)}
                style={{flex: 0.4}}
              />
              <Text style={[s.optionBtns, {color: textColor}]}>Clear chat</Text>
            </TouchableOpacity>
          </Menu.Item>
        </Menu>
      </View>
    </View>
  );
};
const s = StyleSheet.create({
  header: {
    paddingHorizontal: moderateScale(10, 0.1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    flex: 1,
    margin: moderateScale(15, 0.1),
    alignItems: 'center',
  },
  dp: {
    width: moderateScale(55, 0.1),
    height: moderateScale(55, 0.1),
    borderWidth: moderateScale(2, 0.1),
    borderRadius: moderateScale(55 / 2, 0.1),
  },
  dp1: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(53 / 2, 0.1),
  },
  name: {
    fontSize: moderateScale(13, 0.1),
    lineHeight: moderateScale(17, 0.1),
  },
  options: {
    width: moderateScale(30, 0.1),
  },
  optionView: {
    flexDirection: 'row',
    width: moderateScale(100, 0.1),
    borderBottomWidth: moderateScale(1, 0.1),
    borderBottomColor: 'grey',
    alignItems: 'center',
    paddingBottom: moderateScale(5, 0.1),
  },
  optionBtns: {
    fontSize: moderateScale(12, 0.1),
    fontFamily: Poppins,
  },
});
export default ChatHeader;

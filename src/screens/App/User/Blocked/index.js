import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import axiosconfig from '../../../../Providers/axios';
import s from './style';
import {useIsFocused} from '@react-navigation/native';
import {Header, Loader} from '../../../../Components/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {dummyImage, getColor} from '../../../../Constants/Index';
import {theme} from '../../../../Constants/Index';

const blocked = [
  {
    about_me: null,
    block_status: 0,
    connected: 0,
    created_at: '2023-06-06T12:21:34.000000Z',
    date: '6/06/2005',
    date_login: '2023-06-07 07:27:08',
    device_token:
      'cjpfF71SSfek0x-BdoI8w3:APA91bHe5BAFrEZ5_hpNF9Cz0z49kkXDoIeUiOcz5o87DP2Y-QtLaPk0XPpQGjBNgs2bM6fdiQZQJkOF3vmzJIRgbp5GPz6Ra0EqFu0p9kCUcPvyI_OfAKsXT3qUVK28tWM0Es1an1Sr',
    email: 'emilymartin9875@gmail.com',
    email_verified_at: null,
    gender: 'Female',
    group: 'Omega Psi Phi Fraternity, Inc.',
    id: 5,
    image: dummyImage,
    last_name: 'Simmon',
    location: null,
    month: null,
    name: 'Ava',
    notify: '0',
    otp: '8405',
    phone_number: '+443334443333',
    post_privacy: '1',
    privacy_option: '1',
    status: '1',
    story_privacy: '00000000001',
    theme_mode: null,
    updated_at: '2023-06-07T07:29:02.000000Z',
    year: null,
  },
  {
    about_me: null,
    block_status: 0,
    connected: 0,
    created_at: '2023-06-06T12:21:34.000000Z',
    date: '6/06/2005',
    date_login: '2023-06-07 07:27:08',
    device_token:
      'cjpfF71SSfek0x-BdoI8w3:APA91bHe5BAFrEZ5_hpNF9Cz0z49kkXDoIeUiOcz5o87DP2Y-QtLaPk0XPpQGjBNgs2bM6fdiQZQJkOF3vmzJIRgbp5GPz6Ra0EqFu0p9kCUcPvyI_OfAKsXT3qUVK28tWM0Es1an1Sr',
    email: 'emilymartin9875@gmail.com',
    email_verified_at: null,
    gender: 'Female',
    group: 'Alpha Phi Alpha Fraternity, Inc.',
    id: 8,
    image:
      'https://designprosusa.com/the_night/storage/app/1686122942base64_image.png',
    last_name: 'Marry',
    location: null,
    month: null,
    name: 'Andy',
    notify: '0',
    otp: '8405',
    phone_number: '+443334443333',
    post_privacy: '1',
    privacy_option: '1',
    status: '1',
    story_privacy: '00000000001',
    theme_mode: null,
    updated_at: '2023-06-07T07:29:02.000000Z',
    year: null,
  },
];

const Block = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const {token} = useAppContext(AppContext);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    block_list();
  }, [isFocused]);

  const unblock = async id => {};

  const block_list = async () => {
    setData(blocked);
  };

  const renderItem = (elem, i) => {
    console.log('dum', elem?.item?.group);
    return (
      <View style={s.card}>
        <View style={[s.dp, {borderColor: getColor(elem?.item?.group)}]}>
          <Image
            source={{
              uri: elem?.item?.image ? elem?.item?.image : dummyImage,
            }}
            style={s.dp1}
            resizeMode={'cover'}
          />
        </View>
        <TouchableOpacity style={{flex: 0.7, alignSelf: 'center'}}>
          <View>
            <View
              style={{flexDirection: 'row', width: moderateScale(200, 0.1)}}>
              <Text style={[s.name, s.nameBold, {color: textColor}]}>
                {elem?.item?.name}
                {elem?.item?.last_name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => unblock(elem?.item?.id)} style={s.btn}>
          <View>
            <Text style={{color: '#222222'}}>Unblock</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: color}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.4}}>
          <Header navigation={navigation} />
        </View>
        <View style={{flex: 0.6, justifyContent: 'center'}}>
          <Text style={[s.HeadingText, {color: textColor}]}>Blocked</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={[s.container, {backgroundColor: color}]}>
        {data.length > 0 ? (
          <>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => String(index)}
              scrollEnabled={true}
            />
          </>
        ) : (
          <>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{fontSize: moderateScale(16, 0.1), color: textColor}}>
                No blocked Users
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Block;

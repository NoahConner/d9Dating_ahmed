import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../Components/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {theme} from '../../../../Constants/Index';

const data = [
  {
    user_id: 1,
    user_image:
      'https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg',
    user_name: 'Ahmet Çağlar Durmuş',
    Designation: 'Fashion Designer',
    location: ' California, USA',
    caption:
      'Julie Watson Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diamnonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    post: {
      image: require('../../../../assets/images/png/dp.png'),

      likes: 233,
    },
  },
];

const ViewUser = ({navigation}) => {
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';

  useEffect(() => {}, []);

  const [scroll, setScroll] = useState(false);
  const [connected, setConnected] = useState(false);
  const [blocked, setBlocked] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: color}}>
      <View style={[s.View1]}>
        <Image
          style={s.view1Img}
          source={require('../../../../assets/images/png/dp.png')}
        />
        <View
          style={{
            position: 'absolute',
            justifyContent: 'flex-start',
            // paddingHorizontal: moderateScale(15),
          }}>
          <Header navigation={navigation} />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={true}
        onScroll={() => {
          setScroll(!scroll), console.log(scroll);
        }}
        style={[
          s.View2,
          {
            backgroundColor: color,
            bottom: scroll ? moderateScale(50) : moderateScale(5),
          },
        ]}
        scrollEnabled={true}>
        <View>
          <View style={s.line}></View>
          {data.map((v, i) => {
            return (
              <View style={s.container}>
                <View style={s.row}>
                  <Text style={[s.headerTxt, {color: textColor}]}>
                    {v.user_name}{' '}
                  </Text>
                  {connected ? (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Chat');
                      }}
                      style={s.icon}>
                      <AntDesign
                        style={{position: 'absolute'}}
                        name="message1"
                        color="#FFD700"
                        solid
                        size={moderateScale(22, 0.1)}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>

                <View>
                  <Text style={s.txt}>{v.Designation} </Text>
                </View>

                <View style={s.row1}>
                  <View>
                    <Ionicon
                      name="location-sharp"
                      color={textColor}
                      solid
                      size={moderateScale(22, 0.1)}
                    />
                  </View>
                  <Text style={s.location}>{v.location} </Text>
                </View>

                <View style={s.about}>
                  <Text style={[s.aboutTxt, {color: textColor}]}>
                    About Us{' '}
                  </Text>
                  <View style={s.abTxt}>
                    <Text style={s.txt}>{v.caption} </Text>
                  </View>
                </View>
              </View>
            );
          })}
          <TouchableOpacity onPress={() => setConnected(!connected)}>
            <View>
              {connected ? (
                <>
                  <View style={s.connected}>
                    <TouchableOpacity onPress={() => setConnected(false)}>
                      <View style={s.btn}>
                        <Text style={[s.btnTxt]}>Disconnect</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View style={s.btn}>
                        <Text style={[s.btnTxt]}>Block</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View style={s.btn}>
                    <Text style={[s.btnTxt]}>Connect</Text>
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewUser;

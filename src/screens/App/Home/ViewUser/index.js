import {StyleSheet, Text, View, Image, ScrollView, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../Components/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getApi, postApi} from '../../../../APIs';
import {theme, dummyImage} from '../../../../Constants/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import ImageView from 'react-native-image-viewing';
import Loader from '../../../../Components/Loader';

const ViewUser = ({navigation, route}) => {
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const {id} = route?.params;
  const {token, userData} = useAppContext(AppContext);
  const [loader, setLoader] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [imgView, setImgView] = useState(false);
  const [scroll, setScroll] = useState(false);

  const [blocked, setBlocked] = useState(false);
  const [data, setData] = useState({});
  const [connection, setConnection] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoader(true);

    const res = await getApi(`user-profile/${id}`, token);
    console.log('return', res);
    if (res?.id) {
      setData(res);
      setConnection(res.connection);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const connect = async (api, to, from) => {
    setLoader(true);
    let apiData = {
      to_id: to,
      from_id: from,
    };
    console.log(apiData, 'accept');
    let res = await postApi(api, apiData, token);
    // console.log(res, 'response');
    if (res?.status == true) {
      getData();
      Alert.alert(res?.message);
    } else {
      Alert.alert(res?.data?.message);
    }
    setLoader(false);
  };

  const Disconnect = async user => {
    setLoader(true);
    let data;
    if (user.connected_by == 'me') {
      console.log('me');
      data = {
        to_id: id,
        from_id: userData?.id,
      };
    } else {
      console.log('other');
      data = {
        to_id: userData?.id,
        from_id: id,
      };
    }

    let res = await postApi('disconnect', data, token);
    console.log(res, 'response');
    if (res?.status == true) {
      getData();
      Alert.alert(res?.message);
    } else {
      Alert.alert(res?.data?.message);
    }
    setLoader(false);
  };

  const handleBlock = async user => {
    setLoader(true);
    let data = {
      to_id: id,
      from_id: userData?.id,
    };
    // if (user.blocked_by == 'me') {
    //   console.log('me');
    //   data = {
    //     to_id: id,
    //     from_id: userData?.id,
    //   };
    // } else {
    //   console.log('other');
    //   data = {
    //     to_id: userData?.id,
    //     from_id: id,
    //   };
    // }

    let res = await postApi('blocked', data, token);
    console.log(res, 'response');
    if (res?.status == true) {
      getData();
      Alert.alert(res?.message);
    } else {
      Alert.alert(res?.data?.message);
    }
    setLoader(false);
  };
  // const accept = async api => {
  //   setLoader(true);
  //   const data = {
  //     to_id: 26,
  //     from_id: 16,
  //   };
  //   let res = await postApi('connect', data, token);
  //   console.log(res, 'response');
  //   if (res?.status == true) {
  //     getData();
  //     Alert.alert(res?.message);
  //   } else {
  //     Alert.alert(res?.data?.message);
  //   }
  //   setLoader(false);
  // };

  return (
    <View style={{flex: 1, backgroundColor: color}}>
      {loader ? <Loader /> : null}
      <View style={[s.View1]}>
        <TouchableOpacity
          onPress={() => {
            setPreviewImage(data?.image ? data?.image : dummyImage);

            setImgView(!imgView);
          }}
          style={{width: '100%', height: moderateScale(260, 0.1)}}>
          <Image
            style={s.view1Img}
            resizeMode={'cover'}
            source={{uri: data?.image ? data?.image : dummyImage}}
          />
        </TouchableOpacity>
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
          setScroll(!scroll); // console.log(scroll)
        }}
        style={[
          s.View2,
          {
            backgroundColor: color,
            bottom: scroll ? moderateScale(50) : moderateScale(5),
          },
        ]}
        scrollEnabled={true}>
        <View style={s.line}></View>
        <View style={s.container}>
          <View style={s.row}>
            <Text style={[s.headerTxt, {color: textColor}]}>
              {data?.name} {data?.last_name}
            </Text>
            {connection == 'connect' ? (
              <TouchableOpacity
                onPress={() => {
                  searchUserOnSocket(data);
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
          <View style={s.row1}>
            <View>
              <Ionicon
                name="location-sharp"
                color={textColor}
                solid
                size={moderateScale(22, 0.1)}
              />
            </View>
            <Text style={s.location}>{data?.address} </Text>
          </View>

          <View style={s.about}>
            <Text style={[s.aboutTxt, {color: textColor}]}>About</Text>
            <View style={s.abTxt}>
              <Text style={s.txt}>{data?.about_me} </Text>
            </View>
          </View>
          <View style={{marginBottom: moderateScale(10, 0.1)}}>
            <Text style={[s.aboutTxt, {color: textColor}]}>Organization</Text>
            <View style={s.abTxt}>
              <Text style={s.txt}>{data?.organization} </Text>
            </View>
          </View>
        </View>
        {userData?.id == id ? null : (
          <View style={s.connected}>
            <TouchableOpacity
              onPress={() => {
                connection == 'connect'
                  ? Disconnect(data)
                  : connection == 'pending' && data.connected_by == 'me'
                  ? console.log('pending')
                  : connection == 'pending' && data.connected_by == 'other'
                  ? connect('connect', id, userData?.id)
                  : data?.blocked_by == 'me'
                  ? handleBlock(data)
                  : connect('connections', id, userData?.id);
              }}>
              <View style={s.btn}>
                <Text style={[s.btnTxt]}>
                  {connection == 'connect'
                    ? 'Disconnect'
                    : connection == 'pending' && data.connected_by == 'me'
                    ? 'Pending'
                    : connection == 'pending' && data.connected_by == 'other'
                    ? 'Accept'
                    : data?.blocked_by == 'me'
                    ? 'Unblock'
                    : 'Connect'}
                </Text>
              </View>
            </TouchableOpacity>
            {!data.blocked_by ? (
              <TouchableOpacity onPress={() => handleBlock(data)}>
                <View style={s.btn}>
                  <Text style={[s.btnTxt]}>{'Block'}</Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </ScrollView>
      <ImageView
        images={[
          {
            uri: previewImage,
          },
        ]}
        imageIndex={0}
        visible={imgView}
        onRequestClose={() => setImgView(!imgView)}
      />
    </View>
  );
};

export default ViewUser;

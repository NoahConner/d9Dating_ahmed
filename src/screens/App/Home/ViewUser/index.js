import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../../../../Redux/actions';
import axiosconfig from '../../../../Providers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ImageView from 'react-native-image-viewing';
import {Header, Loader} from '../../../../Components/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {dummyImage, socketRequest} from '../../../../Constants/Index';
import socket from '../../../../utils/socket';

const ViewUser = ({navigation, route}) => {
  const {post, screen} = route?.params;
  const [Userid, setUserid] = useState(
    screen == 'search'
      ? post?.id
      : route?.params?.data?.screen
      ? route?.params?.data?.id
      : post?.user.id,
  );
  const [loginId, setLoginId] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [imgView, setImgView] = useState(false);
  const theme = useSelector(state => state.reducer.theme);
  const color = theme == 'dark' ? '#222222' : '#fff';
  const textColor = theme == 'light' ? '#000' : '#fff';
  const {token, setRequest} = useAppContext(AppContext);
  const [scroll, setScroll] = useState(false);
  const [loader, setLoader] = useState(true);
  const [userData, setUserData] = useState([]);
  const socketUsers = useSelector(state => state.reducer.socketUsers);
  const navigations = useNavigation();
  const [myData, setMyData] = useState('');

  useEffect(() => {
    getData(true);
    getId();
  }, []);
  useEffect(() => {
    const getMyData = async () => {
      const data = await AsyncStorage.getItem('userData');
      setMyData(JSON.parse(data));
    };
    getMyData();
    const handleRequest = ({from, to, type}) => {
      if (to == myData?.id) {
        getData(false);
      }
    };

    const handleSocketRequest = ({from, to, type}) => {
      handleRequest({from, to, type});
    };
    socket.on('request', handleSocketRequest);

    return () => {
      socket.off('request', handleSocketRequest);
    };
  }, [socket, myData]);
  const getId = async () => {
    const logInId = await AsyncStorage.getItem('id');
    setLoginId(logInId);
  };

  const getData = async loader => {
    if (loader) {
      setLoader(true);
    }
    axiosconfig
      .get(`user_view/${Userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setUserData(res?.data?.user_details);
        if (loader) {
          setLoader(false);
        }
      })
      .catch(err => {
        if (loader) {
          setLoader(false);
        }
      });
  };

  const connect = async () => {
    setLoader(true);
    await axiosconfig
      .get(`connect/${Userid}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async res => {
        const myId = await AsyncStorage.getItem('id');
        await socketRequest(myId, Userid, 'connectRequest');
        await getData(true);
        await setLoader(false);
      })
      .catch(err => {
        console.error(err);
        setLoader(false);
      });
  };
  const Disconnect = async () => {
    setLoader(true);
    await axiosconfig
      .get(`connect-remove/${Userid}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async res => {
        const myId = await AsyncStorage.getItem('id');
        await socketRequest(myId, Userid, 'disconnect');
        await getData(true);
        await setLoader(false);
      })
      .catch(err => {
        console.error(err);
        setLoader(false);
      });
  };
  const block = async () => {
    setLoader(true);
    await axiosconfig
      .get(`block/${Userid}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async res => {
        const myId = await AsyncStorage.getItem('id');
        await socketRequest(myId, Userid, 'block');
        await getData(true);
        await setLoader(false);
      })
      .catch(err => {
        console.error(err);
        setLoader(false);
      });
  };
  const unblock = async () => {
    setLoader(true);
    await axiosconfig
      .get(`block/${Userid}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async res => {
        const myId = await AsyncStorage.getItem('id');
        await socketRequest(myId, Userid, 'unblock');
        await getData(true);
        await setLoader(false);
      })
      .catch(err => {
        console.error(err);
        setLoader(false);
      });
  };
  const connectAccept = async connectId => {
    setLoader(true);
    axiosconfig
      .get(`connect-accept/${connectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        socketRequest(Userid, connectId, 'connect');
        setRequest(false);
        getData(true);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.error(err);
      });
  };
  const connectDecline = async connectId => {
    setLoader(true);
    axiosconfig
      .get(`connect-remove/${connectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        socketRequest(Userid, connectId, 'disconnect');
        setRequest(false);
        getData(true);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.error(err);
      });
  };
  return loader ? (
    <Loader />
  ) : (
    <View style={{flex: 1, backgroundColor: color}}>
      <View style={[s.View1]}>
        <TouchableOpacity
          onPress={() => {
            setPreviewImage(userData?.image ? userData?.image : dummyImage);
            setImgView(!imgView);
          }}
          style={{width: '100%', height: moderateScale(260, 0.1)}}>
          <Image
            style={s.view1Img}
            resizeMode={'cover'}
            source={{uri: userData?.image ? userData?.image : dummyImage}}
          />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            justifyContent: 'flex-start',
          }}>
          <Header navigation={navigation} />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={true}
        onScroll={() => {
          setScroll(!scroll);
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
          <View style={s.container}>
            <View style={s.row}>
              <Text style={[s.headerTxt, {color: textColor}]}>
                {userData?.name} {userData?.last_name}
              </Text>
              {userData?.connected === 1 && (
                <TouchableOpacity
                  onPress={() => {
                    navigations.navigate('MessageStack', {
                      screen: 'InnerChat',
                      params: {userData: userData},
                    });
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
              )}
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
              <Text style={s.location}>{userData?.location} </Text>
            </View>
            <View style={s.about}>
              <Text style={[s.aboutTxt, {color: textColor}]}>About</Text>
              <View style={s.abTxt}>
                <Text style={s.txt}>{userData?.about_me} </Text>
              </View>
            </View>
            <View style={{marginBottom: moderateScale(10, 0.1)}}>
              <Text style={[s.aboutTxt, {color: textColor}]}>Organization</Text>
              <View style={s.abTxt}>
                <Text style={s.txt}>{userData?.group} </Text>
              </View>
            </View>
          </View>
          {userData && myData?.id != Userid && (
            <>
              {userData.block_status === 0 ? (
                userData.connected === 2 && userData.accept === 0 ? (
                  <View>
                  <TouchableOpacity onPress={() => connectAccept(Userid)}>
                    <View style={s.btn}>
                      <Text style={[s.btnTxt]}>Accept</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => connectDecline(Userid)}>
                    <View style={s.btn}>
                      <Text style={[s.btnTxt]}>Decline</Text>
                    </View>
                  </TouchableOpacity>
                  </View>
                ) :
                userData.connected === 2 ? (
                  <TouchableOpacity disabled>
                    <View style={s.btn}>
                      <Text style={[s.btnTxt]}>Pending</Text>
                    </View>
                  </TouchableOpacity>
                ) : userData.connected === 1 ? (
                  <TouchableOpacity onPress={() => Disconnect()}>
                    <View style={s.btn}>
                      <Text style={[s.btnTxt]}>Connected</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => connect()}>
                    <View style={s.btn}>
                      <Text style={[s.btnTxt]}>Connect</Text>
                    </View>
                  </TouchableOpacity>
                )
              ) : null}
              {userData.block_status === 1 && userData?.block_id == myData?.id ? (
                <TouchableOpacity onPress={() => unblock()}>
                  <View style={s.btn}>
                    <Text style={[s.btnTxt]}>Unblock</Text>
                  </View>
                </TouchableOpacity>
              ) : userData.connected === 1 ? (
                <TouchableOpacity onPress={() => block()}>
                  <View style={s.btn}>
                    <Text style={[s.btnTxt]}>Block</Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </>
          )}
        </View>
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

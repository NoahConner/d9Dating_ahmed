import {
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Menu, Pressable, Input, ScrollView} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {Header, Loader} from '../../../Components/Index';
import {dummyImage, getColor} from '../../../Constants/Index';
import {AppContext, useAppContext} from '../../../Context/AppContext';
import {theme} from '../../../Constants/Index';
import {postApi} from '../../../APIs';
import RBSheetCam from '../../../Components/RBSheetCam';

const formData = {
  address: '',
  type: '',
  caption: '',
  post_img: '',
};

const CreatePost = ({navigation, route}) => {
  const {token, userData} = useAppContext(AppContext);
  const refRBSheet = useRef();
  const Textcolor = theme === 'dark' ? '#fff' : '#222222';
  const color = theme === 'dark' ? '#222222' : '#fff';
  const [address, setaddress] = useState('');
  const [loader, setLoader] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [icon, setIcon] = useState('globe');
  const [menu, setMenu] = useState([
    {
      label: 'Public',
      value: '1',
      icon: 'globe',
    },
    {
      label: 'Friends',
      value: '2',
      icon: 'users',
    },
    {
      label: 'Only me',
      value: '3',
      icon: 'lock',
    },
  ]);
  const [location, setLocation] = useState('');
  const [story, setStory] = useState('Only Me');
  const [form, setForm] = useState(formData);

  //backHandler
  useEffect(() => {
    const backAction = () => {
      discardAlert();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [form]);

  const discardAlert = () => {
    let discard = false;
    for (let item of Object.keys(form)) {
      if (form[item]) {
        discard = true;
        break;
      }
    }
    if (discard) {
      Alert.alert('Hold on!', 'Are you sure you want to discard this Post?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            handleBackPress();
          },
        },
      ]);
    } else {
      navigation.goBack();
    }
  };

  const handleBackPress = () => {
    setForm(formData);
    navigation.goBack();
  };

  useEffect(() => {
    if (filePath) {
      imageUpload(filePath);
    }
  }, [filePath]);

  useEffect(() => {
    if (address) {
      setForm({...form, address: address});
    }
  }, [address]);

  const imageUpload = async base64 => {
    let data = {
      image: base64,
    };
    const res = await postApi('image-upload-64', data, token);
    const dp = res?.data?.image_url;
    // console.log(res, data, 'errrrere');
    if (dp) {
      setForm({...form, post_img: dp});
      setFilePath(null);
    } else {
      Alert.alert(res?.data?.message);
    }
    setLoader(false);
  };

  const validate = () => {
    let submit = true;
    for (let item of Object.keys(form)) {
      if (!form[item]) {
        submit = false;
        Alert.alert('Please fill all fields');
        break;
      }
    }
    if (submit) {
      post();
    }
  };

  const post = async () => {
    setLoader(true);
    const res = await postApi('add-posts', form, token);
    if (res?.success) {
      Alert.alert(res?.messsage);
      navigation.navigate('Home');
    } else {
      Alert.alert(res?.data?.message);
    }
    setLoader(false);
  };

  return loader ? (
    <Loader />
  ) : (
    <ScrollView style={{flex: 1, backgroundColor: color}}>
      <View style={[s.container]}>
        <Header navigation={navigation} backbutton={discardAlert} />
        <View style={s.row}>
          <View style={[s.dp, {borderColor: getColor(userData?.organization)}]}>
            <Image
              style={s.headerImage}
              source={{uri: userData?.image ? userData?.image : dummyImage}}
            />
          </View>
          <View style={s.name}>
            <Text style={[s.headingTxt, {color: Textcolor}]}>
              {userData?.name} {userData?.last_name}
            </Text>

            <View style={[s.btn]}>
              <Menu
                w="180"
                borderWidth={moderateScale(1, 0.1)}
                borderBottomColor={'grey'}
                backgroundColor={color}
                // top={moderateScale(24, 0.1)}
                borderColor={Textcolor}
                trigger={triggerProps => {
                  return (
                    <Pressable
                      accessibilityLabel="More options menu"
                      {...triggerProps}
                      style={[
                        s.privacy,
                        {
                          borderColor: Textcolor,
                        },
                      ]}>
                      <Entypo
                        name={icon}
                        color={Textcolor}
                        size={moderateScale(15, 0.1)}
                        style={{flex: 0.2}}
                      />
                      <Text style={[s.option, {color: Textcolor, flex: 0.6}]}>
                        {form.type ? form.type : story}
                      </Text>

                      <Entypo
                        style={{flex: 0.2}}
                        name={'chevron-down'}
                        size={moderateScale(25, 0.1)}
                        color={Textcolor}
                      />
                    </Pressable>
                  );
                }}>
                {menu.map(elem => {
                  return (
                    <Menu.Item
                      onPress={() => {
                        setForm({...form, type: elem?.label});
                        setStory(elem?.label);
                        setIcon(elem.icon);
                      }}>
                      <View style={s.optionView}>
                        <Entypo
                          name={elem?.icon}
                          color={Textcolor}
                          size={moderateScale(15, 0.1)}
                          style={{marginRight: moderateScale(10, 0.1)}}
                        />
                        <Text style={[s.optionBtns, {color: Textcolor}]}>
                          {elem?.label}
                        </Text>
                      </View>
                    </Menu.Item>
                  );
                })}
              </Menu>
            </View>
          </View>
        </View>
        <View style={[s.mText]}>
          <Input
            cursorColor={Textcolor}
            selectionColor={Textcolor}
            variant="unstyled"
            placeholder={'Write a caption....'}
            placeholderTextColor={Textcolor}
            value={form.caption}
            onChangeText={text => {
              setForm({...form, caption: text});
            }}
            backgroundColor={color}
            color={Textcolor}
            fontSize={moderateScale(14, 0.1)}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Map', {
              address: form.address,
              location: location,
              setLocation: setLocation,
              setaddress: setaddress,
            });
          }}
          style={[s.mText]}>
          <Text style={[s.loc, {color: Textcolor}]}>
            {form.address ? form.address : 'Enter location...'}
          </Text>
        </TouchableOpacity>
        <View style={[s.imgView]}>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <View style={s.img}>
              <Image
                style={form?.post_img ? s.galleryImage : s.postImg}
                source={
                  form?.post_img
                    ? {uri: form?.post_img}
                    : require('../../../assets/images/png/Vector.png')
                }
              />
              {form?.post_img ? null : (
                <View style={s.icon}>
                  <Ionicons name="add-circle-sharp" size={45} color="#302D2D" />
                </View>
              )}
            </View>
          </TouchableOpacity>
          <RBSheetCam
            refRBSheet={refRBSheet}
            setData={setFilePath}
            screen={'profile'}
          />
        </View>

        <TouchableOpacity
          style={[s.postBtn, {borderColor: Textcolor}]}
          onPress={() => validate()}>
          <Text style={[s.postTxt, {color: Textcolor}]}>Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreatePost;

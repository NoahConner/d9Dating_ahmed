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
import {useSelector} from 'react-redux';
import axiosconfig from '../../../../Providers/axios';
import s from './style';
import {useIsFocused} from '@react-navigation/native';
import {Header, Loader} from '../../../../Components/Index';
import {AppContext, useAppContext} from '../../../../Context/AppContext';
import {dummyImage, getColor} from '../../../../Constants/Index';

const Block = ({navigation}) => {
  const [loader, setLoader] = useState(true);
  const theme = useSelector(state => state.reducer.theme);
  const color = theme === 'dark' ? '#222222' : '#fff';
  const textColor = theme === 'light' ? '#000' : '#fff';
  const organizations = useSelector(state => state.reducer.organization);
  const {token} = useAppContext(AppContext);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    block_list();
  }, [isFocused]);

  const unblock = async id => {
    setLoader(true);
    await axiosconfig
      .get(`block/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        block_list();
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.error(err, 'her');
      });
  };
  const block_list = async () => {
    setLoader(true);
    axiosconfig
      .get(`block-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setData(res?.data);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.error(err);
      });
  };
  const renderItem = (elem, i) => {
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

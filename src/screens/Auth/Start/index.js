import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Platform,
} from 'react-native';

import {Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {theme} from '../../../Constants/Index';
import e1 from '../../../assets/images/png/as1.jpg';
import e2 from '../../../assets/images/png/as2.jpg';
import e3 from '../../../assets/images/png/as3.jpg';
import e4 from '../../../assets/images/png/as4.jpg';
import Logo from '../../../assets/images/png/logo.png';

const StartScreen = ({navigation}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const transAnim = useRef(new Animated.Value(-100)).current;
  const circulate = useRef(new Animated.ValueXY({x: 70, y: 70})).current;
  const circulate1 = useRef(
    new Animated.ValueXY({x: 196 / 2, y: 200 / 2}),
  ).current;
  const spinValue2 = useRef(new Animated.Value(0)).current;
  const circulate2 = useRef(new Animated.ValueXY({x: 130, y: 140})).current;
  const circulate3 = useRef(new Animated.ValueXY({x: 150, y: 150})).current;
  const circulate4 = useRef(new Animated.ValueXY({x: 140, y: 170})).current;
  const circulate5 = useRef(new Animated.ValueXY({x: 140, y: 170})).current;

  useEffect(() => {
    check();
    circulation();
    fadeIn();
  }, []);

  const check = async () => {
    const already = await AsyncStorage.getItem('already');
    console.log('already', already);
    if (already) {
      navigation.navigate('Login');
    }
  };

  const fadeIn = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.timing(spinValue2, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      }),
    ).start();
  };

  const translate = () => {
    Animated.timing(transAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const circulation = () => {
    Animated.loop(
      Animated.timing(circulate, {
        toValue: {x: 70, y: 70},
        duration: 15000,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.timing(circulate1, {
        toValue: {x: 196 / 2, y: 200 / 2},
        duration: 10000,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.timing(circulate2, {
        toValue: {x: 130, y: 140},
        duration: 15000,
        useNativeDriver: true,
      }),
    ).start();
    Animated.loop(
      Animated.timing(circulate3, {
        toValue: {x: 150, y: 150},
        duration: 10000,
        useNativeDriver: true,
      }),
    ).start();
    Animated.loop(
      Animated.timing(circulate4, {
        toValue: {x: 140, y: 170},
        duration: 8000,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.timing(circulate5, {
        toValue: {x: 140, y: 170},
        duration: 8000,
        useNativeDriver: true,
      }),
    ).start();
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme === 'dark' ? '#222222' : '#fff',
        },
      ]}>
      <View style={[styles.logo, {color: theme === 'dark' ? '#fff' : '#000'}]}>
        <Image
          source={Logo}
          width={undefined}
          height={undefined}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.logoText,
            {color: theme === 'dark' ? '#fff' : '#000'},
          ]}>
          D9 Dating
        </Text>
      </View>
      <View style={styles.headingContainer}>
        <Text
          style={[
            styles.heading1,
            {color: theme === 'dark' ? '#fff' : '#000'},
          ]}>
          Find Your
        </Text>
        <Text
          style={[
            styles.heading2,
            {color: theme === 'dark' ? '#fff' : '#000'},
          ]}>
          Best Partner
        </Text>
      </View>
      <View style={styles.animationView}>
        <View style={styles.circle1}>
          <Animated.Image
            source={e1}
            width={undefined}
            height={undefined}
            style={{
              borderRadius: moderateScale(116 / 2),
              width: moderateScale(90),
              height: moderateScale(90),
            }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.circle2}>
          <View style={styles.round2}>
            <Text style={{fontSize: moderateScale(25)}}>🤙🏾</Text>
          </View>
        </View>
        <View style={styles.circle3}>
          <View style={styles.round}>
            <Text style={{fontSize: moderateScale(25)}}>👌🏾</Text>
          </View>
          <View style={styles.round1}>
            <Text style={{zIndex: 5000, fontSize: moderateScale(30)}}>🤘🏽</Text>
          </View>
        </View>
        <View style={styles.circle4}>
          <Image
            source={e2}
            width={undefined}
            resizeMode="cover"
            style={{
              top: moderateScale(7),
              left: moderateScale(25),
              width: moderateScale(60),
              height: moderateScale(60),
              borderRadius: moderateScale(60 / 2),
            }}
          />
          <Image
            source={e3}
            width={undefined}
            resizeMode="cover"
            style={{
              left: moderateScale(200),
              top: moderateScale(240),
              width: moderateScale(55),
              height: moderateScale(55),
              borderRadius: moderateScale(55 / 2),
            }}
          />
          <Image
            source={e4}
            width={undefined}
            resizeMode="cover"
            style={{
              left: moderateScale(300),
              top: moderateScale(-50),
              width: moderateScale(50),
              height: moderateScale(50),
              borderRadius: moderateScale(50 / 2),
            }}
          />
        </View>
      </View>

      <View style={styles.button}>
        <Button
          size="sm"
          onPressIn={async () => {
            navigation.navigate('Login');
            await AsyncStorage.setItem('already', 'already');
          }}
          variant="solid"
          _text={{
            color: '#6627EC',
          }}
          backgroundColor="#FFD700"
          borderRadius={50}
          w={moderateScale(151)}
          h={moderateScale(35)}
          alignItems="center"
          style={styles.shadow}>
          <Text style={[styles.btnText, {color: '#000'}]}>Start</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
  },
  centerImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    marginTop: Platform.OS == 'ios' ? moderateScale(-100) : moderateScale(-40),
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: moderateScale(12),
    marginTop: moderateScale(5),
  },
  headingContainer: {
    marginTop: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading1: {
    lineHeight: moderateScale(28),
    color: '#fff',
    fontSize: moderateScale(22),
  },
  heading2: {
    lineHeight: moderateScale(35),
    color: '#fff',
    fontSize: moderateScale(30),
  },
  animationView: {
    width: moderateScale(400),
    height: moderateScale(400),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: moderateScale(-20),
  },
  circle1: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderWidth: moderateScale(4),
    borderColor: '#FFD700',
    borderRadius: moderateScale(116 / 2),
    width: moderateScale(100),
    height: moderateScale(100),
    zIndex: 1000,
  },
  circle2: {
    position: 'absolute',
    borderWidth: moderateScale(1),
    borderColor: '#FFD700',
    borderRadius: moderateScale(196 / 2),
    width: moderateScale(180),
    height: moderateScale(180),
    backgroundColor: '#ABB3BA',
    zIndex: 999,
  },
  circle3: {
    position: 'absolute',
    borderWidth: moderateScale(1),
    borderColor: '#FFD700',
    borderRadius: moderateScale(268 / 2),
    width: moderateScale(260),
    height: moderateScale(260),
    backgroundColor: '#838383',
    zIndex: 100,
  },
  circle4: {
    position: 'absolute',
    borderWidth: moderateScale(1),
    borderColor: '#FFD700',
    borderRadius: moderateScale(344 / 2),
    width: moderateScale(344),
    height: moderateScale(344),
    backgroundColor: '#4E4E4E',
    zIndex: 10,
  },
  round: {
    borderColor: 'red',
    top: moderateScale(-25),
    left: moderateScale(220 / 2),
    position: 'absolute',
    borderWidth: moderateScale(3),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(50),
    height: moderateScale(50),

    borderRadius: moderateScale(50 / 2),
  },
  round1: {
    borderColor: 'blue',
    top: moderateScale(205),
    left: moderateScale(25),
    position: 'absolute',
    borderWidth: moderateScale(3),
    borderRadius: moderateScale(50 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(50),
    height: moderateScale(50),
  },
  round2: {
    borderColor: 'gold',
    top: moderateScale(100),
    left: moderateScale(145),
    position: 'absolute',
    borderWidth: moderateScale(3),
    borderRadius: moderateScale(50 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(50),
    height: moderateScale(50),
  },
  btnText: {
    fontSize: moderateScale(13),
    lineHeight: moderateScale(18),
    color: '#fff',
  },
  button: {
    position: 'absolute',
    bottom: moderateScale(30),
  },
});

export default StartScreen;

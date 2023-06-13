import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
  Button,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 29.9417666;
const LONGITUDE = -95.3991524;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
const SPACE = 0.01;

function log(eventName, e) {}

const Map = ({navigation, route}) => {
  const mapRef = useRef();
  // const [region, setRegion] = useState({
  //   latitude: route.params.location?.coords?.latitude
  //     ? route.params.location?.coords?.latitude
  //     : route.params.location?.latitude,
  //   longitude: route.params.location?.coords?.longitude
  //     ? route.params.location?.coords?.longitude
  //     : route.params.location?.longitude,

  //   latitudeDelta: LATITUDE_DELTA,
  //   longitudeDelta: LONGITUDE_DELTA,
  // });
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LATITUDE_DELTA,
  });

  useEffect(() => {
    console.log(
      'location address',
      route.params.address,
      route.params.location,
    );
    if (route?.params?.address) {
      getPhysicalAddress(route.params.address);
    } else {
      currentLocation();
    }
  }, []);

  const getPhysicalAddress = address => {
    Geocoder.init('AIzaSyCYvOXB3SFyyeR0usVOgnLyoDiAd2XDunU');
    setTimeout(() => {
      Geocoder.from(address)
        .then(json => {
          var location = json.results[0].geometry.location;
          setRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          });
          mapRef.current.animateToRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        })
        .catch(error => console.warn(error));
    }, 1000);
  };

  const getAddress = location => {
    Geocoder.init('AIzaSyCYvOXB3SFyyeR0usVOgnLyoDiAd2XDunU');
    setTimeout(() => {
      Geocoder.from(location?.latitude, location?.longitude)
        .then(json => {
          var addressComponent = json.results[0].formatted_address;
          console.log('correct address', addressComponent);
          route.params.setaddress(addressComponent);
          route.params.setLocation(location);
          navigation.goBack();
        })
        .catch(error => {
          console.log(error);
        });
    }, 1000);
  };

  const currentLocation = () => {
    try {
      Geolocation.getCurrentPosition(location => {
        console.log('currLoc', location);
        setRegion({
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
        // getAddress({
        //   latitude: location?.coords?.latitude,
        //   longitude: location?.coords?.longitude,
        //   latitudeDelta: LATITUDE_DELTA,
        //   longitudeDelta: LONGITUDE_DELTA,
        // });
        route.params.setLocation({
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });

        mapRef.current.animateToRegion({
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      });
    } catch (error) {
      const {code, message} = error;
      console.log(error, 'err');
    }
  };

  const saveRegion = () => {
    getAddress(region);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backbtn}
        onPress={() => navigation.goBack()}>
        <MaterialIcon
          name={'chevron-left'}
          color="#000"
          size={moderateScale(30, 0.1)}
        />
      </TouchableOpacity>
      <View style={styles.mainContainer}>
        <GooglePlacesAutocomplete
          placeholder="Enter Location"
          placeholderTextColor="#000"
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          onPress={(data, details = null) => {
            getPhysicalAddress(data?.description);
          }}
          textInputProps={{placeholderTextColor: '#999'}}
          styles={{
            textInput: styles.searchText,
            predefinedPlacesDescription: {
              color: '#000',
            },
          }}
          query={{
            key: 'AIzaSyCYvOXB3SFyyeR0usVOgnLyoDiAd2XDunU',
            language: 'en',
          }}
          currentLocation={true}
          currentLocationLabel="Current location"
        />
      </View>

      <View style={styles.mapView}>
        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            style={styles.myLoc}
            onPress={() => currentLocation()}>
            <MaterialIcon
              name={'my-location'}
              color="red"
              size={moderateScale(40, 0.1)}
            />
          </TouchableOpacity>
        </View>
        <Button
          title="Save"
          type="solid"
          onPress={() => saveRegion()}
          buttonStyle={styles.save}
        />
      </View>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={e => {
          console.log('region chaneg', e);
          setRegion(e);
        }}></MapView>
      <View style={styles.markerFixed}>
        <Image
          source={{
            uri: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
          }}
          style={{height: 35, width: 35}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  mainContainer: {
    position: 'absolute',
    top:
      Platform.OS == 'ios' ? moderateScale(120, 0.1) : moderateScale(70, 0.1),
    left: 0,
    zIndex: 9999,
    width: '100%',
    paddingHorizontal: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backbtn: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(50, 0.1),
    padding: moderateScale(2, 0.1),
    position: 'absolute',
    left: moderateScale(15, 0.1),
    top: moderateScale(15, 0.1),
    zIndex: 100,
  },
  myLoc: {
    padding: moderateScale(10, 0.1),
    backgroundColor: '#fff',
    borderRadius: moderateScale(50, 0.1),
    elevation: 5,
    marginBottom: moderateScale(20, 0.1),
  },
  searchText: {
    height: 42,
    fontSize: 16,
    color: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -20,
    position: 'absolute',
    top: '50%',
    zIndex: 999,
  },
  save: {
    backgroundColor: '#1E3865',
    padding: moderateScale(15, 0.1),
    borderRadius: moderateScale(15, 0.1),
  },
  mapView: {
    position: 'absolute',
    bottom: moderateScale(60),
    left: 0,
    zIndex: 9999,
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default Map;

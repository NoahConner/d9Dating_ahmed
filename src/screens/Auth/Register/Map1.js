import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';

export default function Map1() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [city, setCity] = useState(null);
  useEffect(() => {
    const fetchCityName = async () => {
        const { latitude, longitude } = region;
        try {
          const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD8i3TGGkBPF757aCT-w36E6zvSer3r2KE`);
          const json = await result.json();
          if (json.status === 'OK') {
            const locality = json.results[0].address_components.find(component => component.types.includes('locality'));
            if (locality) {
              const cityName = locality.long_name;
              setCity(cityName);
            } else {
              console.error('Could not find locality component in Google Maps Geocoding API response');
            }
          } else {
            console.error('Invalid response from Google Maps Geocoding API:', json.status);
          }
        } catch (error) {
          console.error(error);
        }
      };
    fetchCityName();
  }, [region]);

  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={handleRegionChange}
      />
      {city && (
        <View style={styles.cityContainer}>
          <Text style={styles.cityText}>{city}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  cityContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cityText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
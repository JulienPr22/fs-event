import { View, } from 'react-native';
import { StyleSheet } from 'react-native';
import { useRef } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const INITIAL_REGION = {
  latitude: 48.11,
  longitude: -1.68,
  latitudeDelta: 2,
  longitudeDelta: 2
}

function MapScreen() {
  const mapRef = useRef < MapView();

  const focusMap = () => {
    const GreenBayStadium = {
      latitude: 48.11,
      longitude: -1.68,
      latitudeDelta: 2,
      longitudeDelta: 2
    };
    mapRef.current?.animateCamera({ center: GreenBayStadium, zoom: 10 }, { duration: 30 })
  }

  const onRegionChange = (region) => {
    console.log(region);
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        onRegionChangeComplete={onRegionChange}
        ref={mapRef}
      ></MapView>
    </View>
  );
}

export default MapScreen;
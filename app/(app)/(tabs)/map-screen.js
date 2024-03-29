import { Text, View, } from 'react-native';
import { StyleSheet } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import firestoreService from '../services/fireStoreService';
import * as Location from 'expo-location';


const INITIAL_REGION = {
  latitude: 48.11,
  longitude: -1.68,
  latitudeDelta: 2,
  longitudeDelta: 2
}

function MapScreen() {
  // const mapRef = useRef < MapView();

  const [userLocation, setUserLocation] = useState(null);
  const [events, setEvents] = useState({})

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg("L'autorisation d'accéder à la position a été refusée");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);

      console.log("userLocation", location);
      // Récupération des évennements proches
      const eventsData = await firestoreService.getNearbyEvents(48.08, 1.68, 10)
      setEvents(eventsData);

    })();

  }, []);


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
      <Text> Map Screen</Text>
      {/* <MapView style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        onRegionChangeComplete={onRegionChange}
        ref={mapRef}
      ></MapView> */}
    </View>
  );
}

export default MapScreen;
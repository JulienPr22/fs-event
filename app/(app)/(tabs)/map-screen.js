import { Alert, Text, View, } from 'react-native';
import { StyleSheet } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import firestoreService from '../services/fireStoreService';
import * as Location from 'expo-location';
import { Tabs, useRouter } from 'expo-router';
import { SIZES } from '../../constants';


const INITIAL_REGION = {
  latitude: 48.11,
  longitude: -1.68,
  latitudeDelta: 2,
  longitudeDelta: 2
}

function MapScreen() {
  const router = useRouter();
  const mapRef = useRef();

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

  const markers = [
    {
      name: "Paris",
      latitude: 48.8666,
      longitude: 2.3333
    }
  ]


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

  const onMarkerSelected = (marker) => {
    Alert.alert(marker.name)
  }

  return (
    <View style={{ flex: 1 }}>
      <Tabs.Screen options={{
        headerLeft: () => (
          <ScreenHeaderBtn
            iconUrl={icons.left}
            dimension='60%'
            handlePress={() => router.back()}
          />
        ),
        headerRight: () => (
          <ScreenHeaderBtn iconUrl={icons.signOut} dimension='60%' handlePress={signOut} />
        )
      }}></Tabs.Screen>
      <Text> Map Screen</Text>
      <MapView style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        onRegionChangeComplete={onRegionChange}
        ref={mapRef}
      >


        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker} onPress={() => onMarkerSelected(marker)}>
          </Marker>
        ))}

        <View style={styles.tile}>
          <Text>Paris</Text>
          {/* Add more information here as needed */}
        </View>

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    margin: 10,
    borderRadius: SIZES.medium,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
});

export default MapScreen;
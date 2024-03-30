import { Alert, Text, View, } from 'react-native';
import { StyleSheet } from 'react-native';
import { useContext, useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import firestoreService from '../services/fireStoreService';
import { Stack, Tabs, useRouter } from 'expo-router';
import { COLORS, SIZES, icons } from '../../constants';
import { ScreenHeaderBtn } from '../../components';
import EventTile from '../../components/map-screen/event-tile/EventTile';
import { UserContext } from '../UserContext';


const INITIAL_REGION = {
  latitude: 48.11,
  longitude: -1.68,
  latitudeDelta: 2,
  longitudeDelta: 2
}

function MapScreen() {
  const router = useRouter();
  const mapRef = useRef();
  const { user, setUser } = useContext(UserContext);

  const [events, setEvents] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null);


  useEffect(() => {
    (async () => {
      console.log("user Location", user.location);

      // Récupération des évennements proches
      const eventsData = await firestoreService.getNearbyEvents(48.08, 1.68, 10)
      setEvents(eventsData)
      console.log("eventsData", eventsData);
      setIsDataLoaded(true)
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

  const onMarkerSelected = (marker) => {
    setSelectedEvent(marker);
    //Alert.alert(marker.name)
  }

  return (
    <View style={styles.container}>
      <Tabs.Screen options={{
        visible: false,
        headerStyle: { backgroundColor: COLORS.lightWhite },
        headerLeft: () => (
          <ScreenHeaderBtn
            iconUrl={icons.left}
            dimension='60%'
            handlePress={() => router.back()}
          />
        )
      }} />

      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        onRegionChangeComplete={onRegionChange}
        ref={mapRef}
      >


        {(events && events.length > 0) && (
          events.map((event, index) => (
            <Marker
              key={`nearby-event-${event.id}`}
              coordinate={{
                latitude: event.geolocalisation.lat,
                longitude: event.geolocalisation.lon
              }}
              onPress={() => onMarkerSelected(event)}>
            </Marker>
          )))
        }


        {selectedEvent && (
          <View style={styles.tileContainer}>
            <EventTile event={selectedEvent} />
          </View>
        )}

        {/* {selectedEvent && (
          <View style={styles.tileContainer}>
            <Text style={styles.eventTitle}>{selectedEvent.titre_fr}</Text>
          </View>)} */}


      </MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  tileContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'flex-start', // Utilise Flexbox pour les éléments à l'intérieur
    borderRadius: SIZES.medium,
  },
  eventTitle: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },


});

export default MapScreen;
import { Alert, Image, Linking, Modal, Platform, Text, TouchableOpacity, View, } from 'react-native';
import { StyleSheet } from 'react-native';
import { useContext, useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import firestoreService from '../services/fireStoreService';
import { Stack, Tabs, useRouter } from 'expo-router';
import { COLORS, SIZES, icons } from '../../constants';
import { ScreenHeaderBtn } from '../../components';
import EventTile from '../../components/map-screen/event-tile/EventTile';
import { UserContext } from '../UserContext';
import { checkImageURL } from '../../utils';
import { Button, Card, FAB, Icon } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import EventCard from '../../components/common/cards/event/EventCard';
import eventService from '../services/eventService';


const INITIAL_REGION = {
  latitude: 48.8666,
  longitude: 2.3333,
  latitudeDelta: 2,
  longitudeDelta: 2
}

function MapScreen() {
  const router = useRouter();
  const mapRef = useRef();
  const { user, setUser } = useContext(UserContext);
  const [regionLocation, setRegionLocation] = useState()
  const [tileVisible, setTileVisible] = useState(false)

  const [events, setEvents] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null);


  useEffect(() => {
    (async () => {
      setRegionLocation({ latitude: INITIAL_REGION.latitude, longitude: INITIAL_REGION.longitude })
      // Récupération des évennements proches
      const eventsData = await eventService.getNearbyEvents(INITIAL_REGION.latitude, INITIAL_REGION.longitude, 10)
      setEvents(eventsData)
      console.log("eventsData", eventsData);
      setIsDataLoaded(true)
    })();

  }, []);


  const searchNearbyEvents = async () => {
    setIsDataLoaded(false)
    const eventsData = await eventService.getNearbyEvents(regionLocation.latitude, regionLocation.longitude, 50)
    setEvents(eventsData)
    console.log("nearbyEvents", eventsData);
    setIsDataLoaded(true)
  }

  const focusMap = (lat, lon) => {
    const center = {
      latitude: lat,
      longitude: lon,
      latitudeDelta: 2,
      longitudeDelta: 2
    };
    mapRef.current?.animateCamera({ center: center, zoom: 10 }, { duration: 1000 })
  }

  const onRegionChange = (region) => {
    setRegionLocation({ latitude: region.latitude, longitude: region.longitude })
  }

  const onMarkerSelected = (marker) => {
    setTileVisible(true)
    setSelectedEvent(marker);
    //Alert.alert(marker.name)
  }

  const getDirection = () => {
    if (selectedEvent) {
      const { geolocalisation: { lat, lon } } = selectedEvent;
      const destination = `${lat},${lon}`;
      const platformURL = Platform.select({
        ios: `maps:0,0?q=${destination}`,
        android: `google.navigation:q=${destination}`,
      });
      Linking.openURL(platformURL);
    }
  };

  const imageSource = (event) => {
    return checkImageURL(event.image)
      ? { uri: event.image }
      : checkImageURL(event.organisateur_logo)
        ? { uri: event.organisateur_logo }
        : require('../../assets/images/placeholder.png');

  }

  return (
    <View style={styles.container}>

      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
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

        <View style={styles.tileContainer}>
          {selectedEvent && (
            <EventTile
              event={selectedEvent}
              onPress={() => {
                router.push(`/event-details/${selectedEvent.id}`);
              }}
              onClose={() => setSelectedEvent(null)} ></EventTile>
          )}
        </View>


      </MapView>


      <FAB
        style={{ width: "5%", marginBottom: 315, marginLeft: 25 }}
        placement="left"
        color={COLORS.systemBlue}
        size="large"
        icon={{ name: "directions", color: COLORS.white }}
        onPress={getDirection}
        disabled={!selectedEvent}
      />


      <FAB
        style={{ width: "5%", marginBottom: 245, marginLeft: 25 }}
        placement="left"
        color={COLORS.systemBlue}
        size="large"
        icon={{ name: "search", color: COLORS.white }}
        onPress={searchNearbyEvents}
      />

      <FAB
        style={{ width: "5%", marginBottom: 175, marginLeft: 25 }}
        placement="left"
        color={COLORS.systemBlue}
        size="large"
        icon={{ name: "my-location", color: COLORS.white }}
        onPress={() => focusMap(
          user.location.coords.latitude,
          user.location.coords.longitude
        )}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
  tileContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    margin: 10,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  eventImage: {
    width: "100%",
    height: "100%",
    marginRight: 10, // Espacement entre l'image et le titre
    borderRadius: SIZES.small, // Bordure arrondie pour l'image
  },
  eventTitle: {
    fontSize: SIZES.small,
    fontFamily: "DMBold",
    color: COLORS.primary,
    width: 200
  },
  directionsButton: {
    width: 40,
    height: 40,
    borderRadius: 20, // Pour le rond bleu
    backgroundColor: "blue", // Couleur du rond bleu
    justifyContent: 'center',
    // alignItems: 'center',
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17, // Pour le losange blanc
    backgroundColor: 'white', // Couleur du losange blanc
    justifyContent: 'center',
    alignItems: 'center',
  },
  diamond: {
    width: 24,
    height: 24,
    backgroundColor: 'white', // Couleur du losange blanc
    transform: [{ rotate: '45deg' }], // Rotation du losange de 45 degrés
  },


});

export default MapScreen;
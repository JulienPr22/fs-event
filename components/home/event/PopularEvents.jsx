import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './popularevents.style';
import { COLORS } from '../../../constants';
import PopularEventCard from '../../common/cards/event/PopularEventCard';
import fireStoreService from '../../../app/services/fireStoreService';
import * as Location from 'expo-location';


const PopularEvents = () => {
  const router = useRouter();
  const [popularEventsData, setPopularEventsData] = useState([]);
  const [nearbyEventsData, setNearbyEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Récupération des évennements populaires
      const popularEvents = await fireStoreService.fetchData({ limit: 20, minRating: 4.500 }, setIsLoading);
      setPopularEventsData(popularEvents);

      // Récupération de la position de l'utilisateur
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg("L'autorisation d'accéder à la position a été refusée");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

    /*   const nearbyEvents = await fireStoreService.getNearbyEvents(location.coords.latitude, location.coords.longitude)
      setNearbyEventsData(nearbyEvents) */
    })();

  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Évennements populaires</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Voir tous</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : (
          popularEventsData?.map((event) => (
            <PopularEventCard
              event={event}
              key={`popular-event-${event.id}`}
              onPress={() => {
                router.push(`/event-details/${event.id}`);
              }}
            />
          ))
        )}

      </View>
    </View>
  );
};

export default PopularEvents;

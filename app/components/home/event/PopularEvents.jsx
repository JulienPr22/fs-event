import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './popularevents.style';

import EventCard from '../../common/cards/event/EventCard';

import { COLORS } from '../../../constants';
import firestoreService from '../../../(app)/services/fireStoreService';

const PopularEvents = () => {
  const router = useRouter();
  const [popularEventsData, setPopularEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    (async () => {
      // Récupération des évennements populaires
      const popularEvents = await firestoreService.fetchEvents(
        { maxResults: 20, minRating: 4.5, page: 1 },
        setIsLoading
      );
      setPopularEventsData(popularEvents);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Évennements populaires</Text>
        <TouchableOpacity onPress={() => router.push(`/search/all`)}>
          <Text style={styles.headerBtn}>Voir tous</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : (
          popularEventsData?.map((event) => (
            <EventCard
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

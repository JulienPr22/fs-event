import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './popularevents.style';
import { COLORS } from '../../../constants';
import PopularEventCard from '../../common/cards/event/PopularEventCard';
import useFetch from '../../../hook/useFetch';

const PopularEvents = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch();

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
          data?.map((event) => (
            <PopularEventCard
              event={event}
              key={`popular-event-${event.identifiant}`}
              handleNavigate={() => router.push(`/event-details/${event.identifiant}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default PopularEvents;

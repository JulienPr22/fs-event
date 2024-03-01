import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './popularevents.style';
import { COLORS } from '../../../constants';
import PopularEventCard from '../../common/cards/event/PopularEventCard';
import fireStoreService from '../../../app/services/fireStoreService';

const PopularEvents = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newData = await fireStoreService.fetchData({ limit: 20, minRating: 4.500 }, setIsLoading);
      setData(newData);
    };

    fetchData();
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
          data?.map((event) => (
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

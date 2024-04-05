import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { COLORS, SIZES } from '../../../constants';
import routesService from '../../../(app)/services/routesService';
import RouteCard from '../../common/cards/route/RouteCard';
import styles from './popularoutes.style';

const PopularRoutes = ({ refreshing }) => {
  const router = useRouter();

  const [popularRoutesData, setPopularRoutesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (refreshing || isLoading) {
        // Récupération des parcours populaires
        const popularRoutes = await routesService.getRoutes(setIsLoading);
        setPopularRoutesData(popularRoutes);
      }
    })();
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Parcours populaires</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : (
          <FlatList
            data={popularRoutesData}
            renderItem={({ item, index }) => (
              <RouteCard
                index={index}
                onPress={() => {
                  router.push(`/route-details/${item.id}`);
                }}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default PopularRoutes;

import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularroutes.style";
import { COLORS, SIZES } from "../../../constants";
import routesService from "../../../(app)/services/routesService";
import RouteCard from "../../common/cards/route/RouteCard";

const PopularRoutes = () => {
  const router = useRouter();
  const [selectedRoute, setSelectedRoute] = useState();

  const [popularRoutesData, setPopularRoutesData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    (async () => {
      // Récupération des évennements populaires
      const popularRoutes = await routesService.getRoutes(setIsLoading);
      setPopularRoutesData(popularRoutes);
    })();
  }, []);

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedRoute(item.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Parcours populaires</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Voir tous</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={popularRoutesData}
            renderItem={({ item }) => (
              <RouteCard
                route={item}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default PopularRoutes;

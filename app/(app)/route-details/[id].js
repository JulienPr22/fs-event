import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from "react-native";

import {
  EventCard,
  ScreenHeaderBtn,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import routesService from "../services/routesService";
import styles from "./routedetails.style";

const EventDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const [route, setRoute] = useState([])
  const [routeCreator, setRouteCreator] = useState({})
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [numberOfSteps, setNumberOfSteps] = useState(0)

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { route, user, events } = await routesService.fetchRouteData(params.id, setIsLoading);
      if (route) {
        setRoute(route)
      }
      if (user) {
        setRouteCreator(user)
      }
      if (events) {
        setRelatedEvents(events)
        setNumberOfSteps(events.length)
      }
    })();

  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, justifyContent: "flex-start" }}>
      <Stack.Screen
        options={{
          visible: false,
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          relatedEvents && relatedEvents.length > 0 ? (
            <View >
              <View style={styles.container}>

                <Text style={styles.title}>Parcours de {routeCreator.name}</Text>

                <View style={styles.field}>
                  <Text style={styles.infoValue}>{route.description}</Text>
                </View>
              </View>


                <View style={{ alignItems: "center" }}>
                  <Text style={styles.title}>{numberOfSteps} étapes:</Text>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.cardsContainer}
                  >
                    {
                      relatedEvents?.map((event) => (
                        <EventCard
                          event={event}
                          key={`popular-event-${event.id}`}
                          onPress={() => {
                            router.push(`/event-details/${event.id}`);
                          }}
                        />
                      ))
                    }
                  </View>
                </ScrollView>
              </View>

          ) : (
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: COLORS.tertiary, marginTop: SIZES.medium }}>Aucun parcours n'a été créé</Text>
            </View>
          ))}
      </View>

    </SafeAreaView >
  )
};

export default EventDetails;

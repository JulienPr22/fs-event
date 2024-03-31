import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {

  EventCard,
  ScreenHeaderBtn,
  Tabs,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";

import { checkImageURL } from "../../utils";

import { useSession } from "../../ctx";
import routesService from "../services/routesService";
import styles from "./routedetails.style";
import MapInfo from "../../components/eventdetails/map/MapInfo";


const tabs = ["À Propos", "Carte"];

const EventDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const session = useSession();

  const [route, setRoute] = useState([])
  const [routeCreator, setRouteCreator] = useState({})
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [numberOfSteps, setNumberOfSteps] = useState(0)

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false)
  }, []);


  const displayTabContent = () => {
    switch (activeTab) {

      case "À Propos":
        return (
          <View>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              relatedEvents && relatedEvents.length > 0 ? (
                <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                  <View style={styles.container}>

                    <Text style={styles.title}>Parcours de {routeCreator.name}</Text>

                    <View style={{ width: 350 }}>
                      <View style={styles.field}>
                        <Text style={styles.infoLabel} >Titre:  </Text>
                        <Text style={styles.infoValue}>{route.title}</Text>
                      </View>

                      <View style={styles.field}>
                        <Text style={styles.infoLabel} >Description:  </Text>
                        <Text style={styles.infoValue}>{route.description}</Text>
                      </View>
                    </View>

                  </View>


                  <View style={styles.eventsContainer}>
                    <Text style={styles.title}>{numberOfSteps} étapes:</Text>

                    <ScrollView
                      style={styles.cardsContainer}
                      showsVerticalScrollIndicator={false}
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

                    </ScrollView>
                  </View>

                  <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />

                </View>


              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: COLORS.tertiary, marginTop: SIZES.medium }}>Aucun parcours n'a été créé</Text>
                </View>
              ))}
          </View>
        );



      case "Carte":
        return (
          <MapInfo
            coordinate={{
              latitude: event.geolocalisation.lat, longitude: event.geolocalisation.lon, latitudeDelta: 0.01,
              longitudeDelta: 0.01, name: event.title
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
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







      {displayTabContent()}
    </SafeAreaView >
  )





};

export default EventDetails;

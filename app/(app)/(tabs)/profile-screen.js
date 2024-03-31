import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { useSession } from '../../ctx';
import firestoreService from '../services/fireStoreService';
import { useCallback, useContext, useEffect, useState } from 'react';
import { COLORS, FONT, SIZES } from '../../constants';
import { router } from 'expo-router';
import { Switch } from 'react-native-gesture-handler';
import { UserContext } from '../UserContext';
import { EventCard } from '../../components';
import routesService from '../services/routesService';

const ProfileScreen = () => {
  const { session, signOut } = useSession();
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [editing, setEditing] = useState(false)

  const [relatedRoute, setRelatedRoute] = useState([])
  const [relatedEvents, setRelatedEvents] = useState()
  const [published, setPublished] = useState()

  useEffect(() => {
    console.log("Profile Screen", user);
    (async () => {

      const { route, events } = await firestoreService.fetchRouteData(session, setIsLoading);

      if (route) {
        setRelatedRoute(route)
        setPublished(route.published)
      }
      if (events) {
        setRelatedEvents(events)
      }

    })();

  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const { route, events } = await firestoreService.fetchRouteData(session, setIsLoading);

    if (route) {
      setRelatedRoute(route)
      setPublished(route.published)
    }
    if (events) {
      setRelatedEvents(events)
    }
    setRefreshing(false)
  }, []);

  const onPressPublishedYes = async () => {
    await routesService.setRoutePublished(relatedRoute.id, true);
    setPublished(true);
    console.log("published", published);
  }

  const onPressPublishedNo = async () => {
    await routesService.setRoutePublished(relatedRoute.id, false);
    setPublished(false);
    console.log("published", published);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, justifyContent: "center" }}>

      <View style={styles.container}>
        <Text style={styles.title}>Mes Informations</Text>
        <View style={styles.infosContainer}>

          <View style={styles.field}>
            <Text style={styles.infoLabel} >Nom: </Text>
            <Text style={styles.infoValue}>{user.name}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.infoLabel}>Mail: </Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>


          <View style={styles.field}>
            <Text style={styles.infoLabel}>Rôle: </Text>
            <Text style={styles.infoValue}>{user.role == "visitor" ? "Visiteur" : "Contributeur"}</Text>
          </View>



        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        relatedEvents && relatedEvents.length > 0 ? (
          <View>
            <View style={styles.container}>


              <Text style={styles.title}>Mon Parcours</Text>
              <View style={styles.infosContainer}>

                <View style={styles.field}>
                  <Text style={styles.infoLabel} >Titre:  </Text>
                  <Text style={styles.infoValue}>{relatedRoute.title}</Text>
                </View>

                <View style={styles.field}>
                  <View style={styles.tabsContainer}>
                    <Text style={styles.infoLabel}>Publié:</Text>

                    <TouchableOpacity
                      style={styles.tab(published)}
                      onPress={onPressPublishedYes}
                    >
                      <Text style={styles.tabText(published, true)}>Oui</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.tab(published)}
                      onPress={onPressPublishedNo}
                    >
                      <Text style={styles.tabText(published, false)}>Non</Text>
                    </TouchableOpacity>
                  </View>
                </View>



              </View>
            </View>
            <View style={{ height: 350 }}>
              <ScrollView
                style={styles.cardsContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
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
          </View>


        ) : (
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: COLORS.tertiary, marginTop: SIZES.medium }}>Aucun parcours n'a été créé</Text>
          </View>
        ))}
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: SIZES.xSmall,
    marginTop: SIZES.xLarge
  },
  title: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  field: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 5,
  },

  infoLabel: {
    fontSize: SIZES.large,
    color: COLORS.secondary,
    fontFamily: FONT.bold,
  },
  infoValue: {
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    marginHorizontal: SIZES.medium,
    gap: SIZES.small,
  },
  input: {
    width: '100%',
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginTop: 10,
    paddingHorizontal: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center'
  },
  tab: (activeValue, switchValue) => ({

    paddingVertical: SIZES.small / 2,
    paddingLeft: SIZES.small,
    borderColor: activeValue === switchValue ? COLORS.tertiary : COLORS.gray2,
  }),
  tabText: (activeValue, switchValue) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: activeValue === switchValue ? COLORS.tertiary : COLORS.gray2,
  }),
});

export default ProfileScreen;
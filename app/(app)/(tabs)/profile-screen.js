import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { useSession } from '../../ctx';
import firestoreService from '../services/fireStoreService';
import { useContext, useEffect, useState } from 'react';
import { COLORS, FONT, SIZES } from '../../constants';
import { router } from 'expo-router';
import { PopularEventCard } from '../../components';
import { Switch } from 'react-native-gesture-handler';
import { UserContext } from '../UserContext';

const ProfileScreen = () => {
  const { session, signOut } = useSession();
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState([]);
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(false)
  const [role, setRole] = useState(false)
  const [relatedRoute, setRelatedRoute] = useState([])
  const [relatedEvents, setRelatedEvents] = useState()
  const [published, setPublished] = useState()


  useEffect(() => {
    console.log("Session", session);
    (async () => {

      const { route, events } = await firestoreService.fetchUserRouteData(session, setIsLoading);
      setName(user.name);
      setRole(user.role);
      setRelatedRoute(route)
      setPublished(route.published)
      setRelatedEvents(events)
      console.log("route", route);
      console.log("events", events);
      console.log("relatedEvents", relatedEvents);
    })();

  }, []);

  useEffect(() => {
    console.log("relatedEvents changed:", relatedEvents);
  }, [relatedEvents]);

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
            <Text style={styles.infoValue}>{user.role = "visitor" ? "Visiteur" : "Contributeur"}</Text>
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
                  <Text style={styles.infoLabel} >Publié:  </Text>
                  <Text style={styles.infoValue}>{published ? "Oui" : "Non"}</Text>
                </View>

                {/* <View tyle={styles.field}>
                  <Text tyle={styles.infoLabel}>Publié: </Text>
                  <Switch
                  trackColor={{false: COLORS.gray, true: COLORS.primary}}
                  thumbColor={published ? '#f5dd4b' : '#f4f3f4'}
                  value={published}
                  onValueChange={() => setPublished(!published)}></Switch>
                </View> */}

                {/* <View style={styles.field}>
              <Text style={styles.infoLabel} >Description: </Text>
              <Text style={styles.infoValue}>{relatedRoute.description}</Text>
            </View> */}

              </View>
            </View>
            <ScrollView style={styles.cardsContainer}>

              {
                relatedEvents?.map((event) => (
                  <PopularEventCard
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
        ) : (
          <Text style={{ flex: 1, justifyContent: 'center', color: COLORS.tertiary }}>Aucun parcours n'a été créé</Text>
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
  tab: (activeRole, switchRole) => ({
    paddingVertical: SIZES.small / 2,
    paddingLeft: SIZES.small,
    borderColor: activeRole === switchRole ? COLORS.tertiary : COLORS.gray2,
  }),
  tabText: (activeJobType, switchRole) => ({
    fontFamily: FONT.medium,
    color: activeJobType === switchRole ? COLORS.tertiary : COLORS.gray2,
  }),
});

export default ProfileScreen;
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { useSession } from '../../ctx';
import firestoreService from '../services/fireStoreService';
import { useEffect, useState } from 'react';
import { COLORS, FONT, SIZES } from '../../constants';
import { router } from 'expo-router';
import { PopularEventCard } from '../../components';

const ProfileScreen = () => {
  const { session, signOut } = useSession();
  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState([]);
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(false)
  const [role, setRole] = useState(false)
  const [relatedRoute, setRelatedRoute] = useState([])
  const [relatedEvents, setRelatedEvents] = useState()


  useEffect(() => {
    console.log("Session", session);
    (async () => {
      const { user, route, events } = await firestoreService.fetchUserData(session, setIsLoading);
      setUser(user)
      setName(user.name);
      setRole(user.role);
      setRelatedRoute(route)
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View style={styles.container}>
        <Text style={styles.title}>Mes Informations</Text>
        <View style={styles.infosContainer}>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel} >Nom: </Text>
            <Text style={styles.infoValue}>{user.name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Mail: </Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Rôle: </Text>
            <Text style={styles.infoValue}>{user.role = "visitor" ? "Visiteur" : "Contributeur"}</Text>
          </View>
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        relatedEvents && relatedEvents.length > 0 ? (
          <>
            <View style={styles.container}>


              <Text style={styles.title}>Mon Parcours</Text>
              <View style={styles.infosContainer}>

                <View style={styles.infoContainer}>
                  <Text style={styles.infoLabel} >Titre:  </Text>
                  <Text style={styles.infoValue}>{relatedRoute.title}</Text>
                </View>

                {/* <View style={styles.infoContainer}>
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

          </>
        ) : (
          <Text>Aucun parcours n'a été créé</Text>
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
  infoContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  infoContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  infoLabel: {
    flexDirection: "row",
    fontSize: SIZES.large,
    color: COLORS.secondary,
    fontFamily: FONT.bold,
  },
  infoValue: {
    flexDirection: "row",
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
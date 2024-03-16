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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Mon Profil</Text>

        {editing ? (

          <View style={styles.infosContainer}>

            <View style={styles.infoContainer}>
              {/* <Text style={styles.infoLabel} >Nom: </Text> */}
              <TextInput
                style={styles.input}
                value={name}
                placeholder='Nom'
                autoCapitalize='words'
                onChangeText={(text) => setName(text)}
              />
            </View>


            <View style={styles.infoContainer}>
              <Text >Rôle:</Text>

              <TouchableOpacity
                style={styles.tab(role)}
                onPress={() => {
                  setRole("visitor");
                }}
              >
                <Text style={styles.tabText(role, 'visitor')}>Visiteur</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tab(role)}
                onPress={() => {
                  setRole("contributor");
                }}
              >
                <Text style={styles.tabText(role, 'contributor')}>Contributeur</Text>
              </TouchableOpacity>
            </View>
          </View>

        ) : (

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


            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <View>
                <Text style={styles.title}>Mon Parcours</Text>
                <Text style={styles.infoLabel} >{relatedRoute.title}</Text>
                <Text>{relatedRoute.description}</Text>
              </View>
            )}

            {isLoading ? (
              <ActivityIndicator />
            ) : (
              relatedEvents && relatedEvents.length > 0 ? (

                relatedEvents?.map((event) => (
                  <PopularEventCard
                    event={event}
                    key={`popular-event-${event.id}`}
                    onPress={() => {
                      router.push(`/event-details/${event.id}`);
                    }}
                  />
                ))) : (
                <Text>Aucun événement trouvé</Text>
              )
            )}

          </View>
        )}

        {/*    <TouchableOpacity
        style={styles.button}
        onPress={() => { setEditing(!editing); console.log("editing", editing); }}>
        <Text style={styles.buttonText} >Modifier les informations</Text>
      </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.xSmall,
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
    paddingVertical: 10,
  },
  infoLabel: {
    flexDirection: "row",
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  infoValue: {
    flexDirection: "row",
    fontSize: SIZES.large,
    color: COLORS.primary,
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
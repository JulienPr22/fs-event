import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl, Pressable, TextInput } from 'react-native';
import { useSession } from '../../ctx';
import userService from '../services/userService';
import { useCallback, useContext, useEffect, useState } from 'react';
import { COLORS, FONT, SIZES, icons } from '../../constants';
import { Stack, router } from 'expo-router';
import { UserContext } from '../UserContext';
import { EventCard, ScreenHeaderBtn, ScreenMaterialHeaderBtn } from '../../components';
import routesService from '../services/routesService';
import { Input } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const { session, signOut } = useSession();
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState('');

  const [relatedRoute, setRelatedRoute] = useState([])
  const [relatedEvents, setRelatedEvents] = useState()
  const [published, setPublished] = useState()

  useEffect(() => {
    (async () => {

      const { route, events } = await userService.fetchRouteData(session, setIsLoading);

      if (route) {
        setRelatedRoute(route)
        setPublished(route.published)
        setDescription(route.description);
      }
      if (events) {
        setRelatedEvents(events)
      }

    })();

  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const { route, events } = await userService.fetchRouteData(session, setIsLoading);

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

  const handleSave = async () => {
    console.log("handleSave", description);
    await routesService.setRouteDescription(relatedRoute.id, description)
    setEditing(false)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, justifyContent: "flex-start" }}>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Stack.Screen options={{

          headerRight: () => (
            <ScreenMaterialHeaderBtn iconName={editing ? "save" : "logout"} handlePress={editing ? handleSave : signOut} />
          ),
        }}></Stack.Screen>


        <View style={styles.container}>
          <Text style={styles.title}>Mes Informations</Text>
          <View>

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

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                  <Text style={styles.title}>Mon Parcours</Text>
                  <Pressable onPress={() => setEditing(true)} style={{ marginBottom: 15, marginLeft: 10 }} >
                    <MaterialIcons name='edit' size={24} color={COLORS.primary} />

                  </Pressable>
                </View>

                <View>

                  {
                    relatedRoute && editing ? (
                      <TextInput
                        multiline
                        numberOfLines={5}
                        style={styles.input}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        placeholder='Décrivez votre parcours'
                        autoCapitalize='none'
                        returnKeyType='done'
                        inputMode="text"
                        blurOnSubmit
                        onSubmitEditing={handleSave}

                      />
                    ) : (

                      <View style={styles.field}>
                        <Text style={styles.infoValue}>{description}</Text>
                      </View>)
                  }


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

              <View  >
                <View style={styles.cardsContainer} >
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

              </View>
            </View>


          ) : (
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: COLORS.tertiary, marginTop: SIZES.medium }}>Aucun parcours n'a été créé</Text>
            </View>
          ))}
      </ScrollView>
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
    height: 100,
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
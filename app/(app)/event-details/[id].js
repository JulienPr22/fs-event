import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Pressable,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import {
  EventAbout,
  JobTabs,
  ScreenHeaderBtn,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import GeneralEventInfo from "../../components/eventdetails/general-event-info/GeneralEventInfo";
import styles from "./details.style";
import firestoreService from "../services/fireStoreService";
import { AirbnbRating, Overlay } from "@rneui/themed";
import MapInfo from "../../components/eventdetails/map/MapInfo";
import PlaceDetails from "../../components/eventdetails/place/PlaceDetails";
import { checkImageURL, formatDate } from "../../utils";
import { convertToIso } from "../../utils";
import * as Calendar from 'expo-calendar';
import calendarService from "../services/calendarService";
import { Platform } from "react-native";
import { Linking } from "react-native";
import { UserContext } from "../UserContext";
import { Slider } from '@rneui/themed';
import { useSession } from "../../ctx";
import routesService from "../services/routesService";
import ActionModal from "../../components/eventdetails/modals/ActionModal";
import RatingModal from "../../components/eventdetails/modals/RatingModal";

const tabs = ["À Propos", "Adresse", "Carte"];

const EventDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const session = useSession();
  const { user, setUser } = useContext(UserContext);

  const [event, setEvent] = useState([]);
  const [userRating, setUserRating] = useState([]);

  const [slotOptions, setSlotOptions] = useState([]);
  const [isAdded, setIsAdded] = useState()

  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [actionsModalVisible, setActionsModalVisible] = useState(false);
  const [slotPickerModalVisible, setSlotPickerModalVisible] = useState(false);

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isLoading, setIsLoading] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const eventData = await firestoreService.fetchEvents({ docId: params.id }, setIsLoading);
      setEvent(eventData);
      console.log("event details", eventData);

      const userEventRouteData = await firestoreService.fetchUserEventsRouteIds(session.session, setIsLoading);
      setIsAdded(userEventRouteData.includes(event.id));

      console.log("userEventRouteData", userEventRouteData);

    };

    fetchData();
  }, []);

  const validateRating = async () => {
    setRatingModalVisible(!ratingModalVisible)
    const updatedEvent = await firestoreService.updateEventRating(event, params.id, userRating)
    setEvent(updatedEvent);
  }

  const phoneResevation = async () => {
    setActionsModalVisible(false)
    if (event.grandpublic_reservation_telephone) {
      Linking.openURL(`tel:${event.grandpublic_reservation_telephone}`)
    } else {
      // TODO: Message d'erreur: pas de numéro
    }
  }

  const mailReservation = async () => {
    setActionsModalVisible(false)
    if (event.grandpublic_reservation_email) {
      Linking.openURL(`mailto:${event.grandpublic_reservation_email}?subject=réservation pour l'évennement "${event.titre_fr}"`)
    } else {
      // TODO: Message d'erreur: pas de mail
    }
  }

  const handleOnAdd = async () => {
    if (isAdded) {
    } else {
      await routesService.addEventToUserRoute(session.session, params.id);

    }
    setIsAdded(!isAdded)
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false)
  }, []);

  const toggleActionsModal = () => {
    setActionsModalVisible(!actionsModalVisible);
  };


  const slotPickerModal = () => {

    setActionsModalVisible(false);
    setSlotPickerModalVisible(true)
    if (event.dates && event.dates.length > 0) {
      const slots = event.dates.map(date => (
        convertToIso(date)
      ))
      setSlotOptions(slots);
      console.log("slotOptions", slotOptions);
    } else {
      Alert.alert("Pas d'horaire disponible");
    }

  }

  const addToCalendar = async (slot) => {
    console.log("slot", slot);
    const eventDetails = {
      title: event.titre_fr,
      startDate: slot,
      allDay: true,
      location: event.lib_commune,
      timeZone: 'Europe/Paris',
      notes: event.description_fr,
      url: event.lien
    };

    console.log("eventDetails", eventDetails);

    Alert.alert('Ajouter ce créneau au calendrier ?', '', [

      {
        text: 'Annuler',
        onPress: () => console.log('Cancel Pressed'),
        style: 'destructive',
      },
      { text: 'Oui', onPress: () => this.handleAddEventConfirmed(eventDetails) },
    ]);

  };

  handleAddEventConfirmed = async (eventDetails) => {
    setSlotPickerModalVisible(false)
    try {
      console.log("eventData", eventDetails);
      await calendarService.addEvent(eventDetails)
      Alert.alert('Succès', `L'événement "${eventDetails.title}" a été ajouté au calendrier.`);

    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'événement au calendrier:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'ajout de l\'événement au calendrier.');
    }
  };

  const displayTabContent = () => {
    switch (activeTab) {

      case "À Propos":
        return (
          <EventAbout
            description={event.description_longue_fr ?? "Cet évennement n'a pas de description"}
            dates={event.date_debut}
            capacite={event.capacite ?? "Non renseigné"} />
        );

      case "Adresse":
        return (
          <PlaceDetails
            placeName={event.nom_du_lieu ?? ["Non renseigné"]}
            adress={event.adresse ?? ["Non renseigné"]}
            accessibility={event.accessibilite_fr ?? ["Non renseigné"]}

          />
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
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
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' handlePress={toggleActionsModal} />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          )
            : !event ? (
              <Text>No data available</Text>
            ) : (
              <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>

                <GeneralEventInfo
                  image={{
                    uri: checkImageURL(event.image)
                      ? event.image
                      : event.organisateur_logo
                  }}
                  title={event.titre_fr}
                  animationType={event.type_animation_project}
                  city={event.lib_commune}
                  rating={event.rating}
                  votes={event.votes}
                />

                <JobTabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />

                {/* RATING MODAL */}
                <RatingModal
                  visible={ratingModalVisible}
                  setVisible={setRatingModalVisible}
                  setUserRating={setUserRating}
                  validateRating={validateRating}
                />

              {/*   <Modal
                  animationType="slide"
                  transparent={true}
                  visible={ratingModalVisible}
                  onRequestClose={() => {
                    setRatingModalVisible(!ratingModalVisible);
                  }}>
                  <View style={styles.ratingModalCenteredView}>
                    <View style={styles.ratingModalView}>
                      <Text style={styles.modalText}>Veuillez saisir une note</Text>

                      <AirbnbRating
                        ratingBackgroundColor="#000"
                        showRating fractions="{0}"
                        reviews={["Très mauvais", "Mauvais", "Moyen", "Bien", "Super"]}
                        onFinishRating={(rating) => {
                          setUserRating(rating)
                        }}>

                      </AirbnbRating>
                      <View style={styles.buttons}>
                        <Pressable
                          style={[styles.button]}
                          onPress={() => {
                            setRatingModalVisible(!ratingModalVisible)
                          }}>
                          <Text style={styles.textStyleCancel}>Annuler</Text>
                        </Pressable>

                        <Pressable
                          style={[styles.button, styles.buttonValidate]}
                          onPress={() => {
                            validateRating()
                          }}>
                          <Text style={styles.textStyle}>Valider</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Modal> */}

                {/* ACTION MODAL */}
                <ActionModal
                  visible={actionsModalVisible}
                  setVisible={setActionsModalVisible}
                  toggleModal={toggleActionsModal}
                  slotPickerModal={slotPickerModal}
                  phoneResevation={phoneResevation}
                  mailReservation={mailReservation}
                  eventLink={event.lien}
                />

                {/* SLOT PICKER MODAL */}

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={slotPickerModalVisible}
                  onRequestClose={setSlotPickerModalVisible}>

                  <View style={styles.actionsModalCenteredView}>
                    <View style={styles.actionsModalView}>
                      <Text style={styles.actionText}>Choisissez un créneau</Text>
                      {
                        slotOptions?.map((slot, index) => (
                          <TouchableOpacity key={index} style={styles.actionContainer} onPress={() => addToCalendar(slot)}>
                            <View style={styles.textContainer}>
                              <Text style={styles.actionText} numberOfLines={1}>
                                {formatDate(slot)}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))

                      }

                      <View style={styles.buttons}>
                        <Pressable
                          style={[styles.button]}
                          onPress={() => {
                            setSlotPickerModalVisible(false)
                          }}>
                          <Text style={styles.textStyleCancel}>Annuler</Text>
                        </Pressable>

                      </View>
                    </View>
                  </View>
                </Modal>


                {displayTabContent()}
              </View>
            )}
        </ScrollView>

        <View style={styles.actionBtnContainer}>

          <TouchableOpacity style={styles.addBtn} onPress={handleOnAdd}>

            <Image
              source={isAdded ? icons.remove : icons.add}
              resizeMode='contain'
              style={styles.likeBtnImage}
            />
          </TouchableOpacity>

          {user.role == "visitor" ? (<Pressable
            style={styles.ratingBtn}
            onPress={() => { setRatingModalVisible(!ratingModalVisible) }}>
            <Text style={styles.openBtnText}>Noter l'évennement</Text>
          </Pressable>) : (

            <Pressable
              style={styles.ratingBtn}
             /*  onPress={() => {
                router.setParams({
                  eventId: event.id,
                  eventFilling: 60
                })
                router.navigate('/fillingModal/', {
                  eventId: event.id,
                  eventFilling: 60
                })
              }} */>
              <Text style={styles.openBtnText}>Remplissage</Text>
            </Pressable>)}

        </View>
      </>
    </SafeAreaView>
  );
};

export default EventDetails;

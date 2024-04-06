import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Platform,
} from "react-native";

import {
  EventAbout,
  EventFooter,
  PlaceDetails,
  ScreenHeaderBtn,
  Tabs,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import GeneralEventInfo from "../../components/eventdetails/general-event-info/GeneralEventInfo";
import userService from "../services/userService";
import { checkImageURL } from "../../utils";
import { convertToIso } from "../../utils";
import calendarService from "../services/calendarService";
import { Linking } from "react-native";
import { UserContext } from "../UserContext";
import { useSession } from "../../ctx";
import routesService from "../services/routesService";
import ActionModal from "../../components/eventdetails/modals/ActionModal";
import RatingModal from "../../components/eventdetails/modals/RatingModal";
import SlotPickerModal from "../../components/eventdetails/modals/SlotPickerModal";
import FillingModal from "../../components/eventdetails/modals/FillingModal";
import eventService from "../services/eventService";
import MapInfo from "../../components/eventdetails/map/MapInfo";
import * as Calendar from 'expo-calendar';


const tabs = ["À Propos", "Adresse", "Carte"];

const EventDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const session = useSession();
  const { user, setUser } = useContext(UserContext);

  const [event, setEvent] = useState([]);
  const [userRating, setUserRating] = useState([]);
  const [userFilling, setUserFilling] = useState([])

  const [slotOptions, setSlotOptions] = useState([]);
  const [isAdded, setIsAdded] = useState()

  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [fillingModalVisible, setFillingModalVisible] = useState(false)
  const [actionsModalVisible, setActionsModalVisible] = useState(false);
  const [slotPickerModalVisible, setSlotPickerModalVisible] = useState(false);

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isLoading, setIsLoading] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const eventData = await eventService.getEventById( params.id );
      setEvent(eventData);
      setUserFilling(eventData.filling)

      const userEventRouteData = await userService.fetchUserEventsRouteIds(session.session, setIsLoading);
      setIsAdded(userEventRouteData.includes(params.id));

      await Calendar.requestCalendarPermissionsAsync();


    })();
  }, []);

  const validateRating = async () => {
    setRatingModalVisible(false)
    await eventService.updateEventRating(event, userRating)

  }

  const validateFilling = async () => {
    setFillingModalVisible(false)
    const updatedEvent = await eventService.updateEventFilling(event, userFilling)
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
      Linking.openURL(`mailto:${event.grandpublic_reservation_email}?subject=réservation pour l'événement "${event.titre_fr}"`)
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const eventData = await eventService.getEventById(  params.id );
    setEvent(eventData);
    setRefreshing(false)
  }, []);


  const slotPickerModal = () => {
    setActionsModalVisible(false);
    setSlotPickerModalVisible(true)

    if (event.dates && event.dates.length > 0) {
      const slots = event.dates.map(date => {
        const dateObj = new Date(convertToIso(date));
        dateObj.setFullYear(dateObj.getFullYear() + 1);
        const dateString = dateObj.toISOString()
        console.log("dateString", dateString);
        return dateString;
      })

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
      endDate: slot,
      allDay: true,
      location: event.lib_commune,
      timeZone: 'Europe/Paris',
      notes: event.description_fr,
      url: event.lien
    };

    Alert.alert('Ajouter ce créneau au calendrier ?', '', [

      {
        text: 'Annuler',
        onPress: () => console.log('Cancel Pressed'),
        style: 'destructive',
      },
      { text: 'Oui', onPress: async () => handleAddEventConfirmed(eventDetails) },
    ]);

  };

  const getDefaultCalendarSource = async () => {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.id;
  }

  const addEvent = async (eventData) => {
    try {
      const calendarId =
        Platform.OS === 'ios'
          ? await getDefaultCalendarSource()
          : { isLocalAccount: true, name: 'Expo Calendar' };

      await Calendar.createEventAsync(calendarId, eventData);

    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'événement au calendrier:', error);
    }
  }

  const handleAddEventConfirmed = async (eventDetails) => {
    setSlotPickerModalVisible(false)
    try {
      await addEvent(eventDetails)
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
            description={event.description_longue_fr ?? "Cet événement n'a pas de description"}/>
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
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension='60%'
              handlePress={() => setActionsModalVisible(true)} />
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
                  image={checkImageURL(event.image)
                    ? event.image
                    : event.organisateur_logo}
                  title={event.titre_fr}
                  animationType={event.type_animation_project}
                  city={event.lib_commune}
                  rating={event.rating}
                  votes={event.votes}
                />

                <Tabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />

                {/* MODALS*/}
                <RatingModal
                  visible={ratingModalVisible}
                  setVisible={setRatingModalVisible}
                  setUserRating={setUserRating}
                  validateRating={validateRating}
                />

                <FillingModal
                  visible={fillingModalVisible}
                  setVisible={setFillingModalVisible}
                  fillingValue={userFilling}
                  setFillingValue={setUserFilling}
                  onApply={validateFilling}
                />

                <ActionModal
                  visible={actionsModalVisible}
                  setVisible={setActionsModalVisible}
                  slotPickerModal={slotPickerModal}
                  phoneResevation={phoneResevation}
                  mailReservation={mailReservation}
                  eventLink={event.lien}
                />

                <SlotPickerModal
                  visible={slotPickerModalVisible}
                  setVisible={setSlotPickerModalVisible}
                  slotOptions={slotOptions}
                  addToCalendar={addToCalendar}
                />

                {displayTabContent()}

              </View>
            )}

        </ScrollView>

        <EventFooter
          isAdded={isAdded}
          handleOnAdd={handleOnAdd}
          userRole={user?.role}
          ratingVisible={user?.role == "visitor" ? ratingModalVisible : fillingModalVisible}
          setModalVisible={user?.role == "visitor" ? setRatingModalVisible : setFillingModalVisible}
        />

      </>
    </SafeAreaView>
  );
};

export default EventDetails;

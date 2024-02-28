import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Pressable,
} from "react-native";

import {
  EventAbout,
  JobTabs,
  ScreenHeaderBtn,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import GeneralEventInfo from "../../components/eventdetails/general-event-info/GeneralEventInfo";
import styles from "./details.style";
import firestoreService from "../../components/services/fireStoreService";
import { AirbnbRating } from "@rneui/themed";
import MapInfo from "../../components/eventdetails/map/MapInfo";
import PlaceDetails from "../../components/eventdetails/place/PlaceDetails";
import { checkImageURL } from "../../utils";

const tabs = ["À Propos", "Adresse", "Carte"];

const EventDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const [event, setEvent] = useState([]);
  const [userRating, setUserRating] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isLoading, setIsLoading] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await firestoreService.fetchData({ docId: params.id }, setIsLoading);
      setEvent(data);
    };

    fetchData();
  }, []);

  const validateRating = async () => {
    setModalVisible(!modalVisible)
    const updatedEvent = await firestoreService.updateEventRating(event, params.id, userRating)
    setEvent(updatedEvent);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false)
  }, []);



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
        console.log(event.geolocalisation);
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
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
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

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
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
                            setModalVisible(!modalVisible)
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
                </Modal>

                {displayTabContent()}
              </View>
            )}
        </ScrollView>
        <View style={styles.actionBtnContainer}>
          <Pressable
            style={styles.openBtn}
            onPress={() => { setModalVisible(!modalVisible) }}>
            <Text style={styles.openBtnText}>Noter l'évennement</Text>
          </Pressable>
        </View>
      </>
    </SafeAreaView>
  );
};

export default EventDetails;

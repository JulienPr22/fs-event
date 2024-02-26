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
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import EventInfo from "../../components/eventdetails/company/EventInfo";
import { Rating } from '@rneui/themed';
import styles from "./details.style";
import firestoreService from "../../components/services/fireStoreService";
import { checkImageURL } from "../../utils";
import { AirbnbRating } from "@rneui/themed";

const tabs = ["À Propos", "Qualifications", "Responsibilities"];

const EventDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [rate, setRate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await firestoreService.fetchData({ docId: params.id }, setIsLoading);
      setEvent(data);
    };

    fetchData();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

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

      case "Qualifications":
        return (
          <Specifics
            title='Qualifications'
            points={event.adresse ?? ["N/A"]}
          />
        );

      case "Responsibilities":
        return (
          <Specifics
            title='Responsibilities'
            points={event.type_d_animation ?? ["N/A"]}
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
          ) /* : error ? (
            <Text>Something went wrong</Text>
          )  */
            : !event ? (
              <Text>No data available</Text>
            ) : (
              <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                <EventInfo
                  image={{
                    uri: checkImageURL(event.image)
                      ? event.image
                      : checkImageURL(event.organisateur_logo)
                        ? event.organisateur_logo
                        : '../../assets/images/placeholder.jpg',
                  }}
                  title={event.titre_fr}
                  animationType={event.type_animation_project}
                  conditions={event.detail_des_conditions_fr}
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
                          setRate(rating)
                        }}>

                      </AirbnbRating>
                      <View style={styles.buttons}>
                        <Pressable
                          style={[styles.button]}
                          onPress={() => {
                            firestoreService.doRateEvent();
                            setModalVisible(!modalVisible)
                          }}>
                          <Text style={styles.textStyleCancel}>Annuler</Text>
                        </Pressable>

                        <Pressable
                          style={[styles.button, styles.buttonValidate]}
                          onPress={() => {
                            setModalVisible(!modalVisible);
                            firestoreService.doRateEvent(params.id, rate)
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

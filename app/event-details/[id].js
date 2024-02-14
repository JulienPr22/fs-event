import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Pressable
} from "react-native";

import {
  EventAbout,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import EventInfo from "../../components/eventdetails/company/EventInfo";
import { Rating } from '@rneui/themed';
import styles from "./details.style";
const tabs = ["À Propos", "Qualifications", "Responsibilities"];

const EventDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const { data, isLoading, error } = useFetch('events', { docId: params.id });
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title='Qualifications'
            points={data.adresse ?? ["N/A"]}
          />
        );

      case "À Propos":
        return (
          <EventAbout description={data.description_longue_fr ?? "No data provided"} />
        );

      case "Responsibilities":
        return (
          <Specifics
            title='Responsibilities'
            points={data.type_d_animation ?? ["N/A"]}
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
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : !data ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <EventInfo
                image={data.image}
                title={data.titre_fr}
                animationType={data.type_animation_project}
                conditions={data.detail_des_conditions_fr}
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
                <View style={styles.modalCenteredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Votre note</Text>

                    <Rating ratingBackgroundColor="#000" showRating fractions="{0}" ></Rating>
                    <View style={styles.buttons}>
                      <Pressable
                        style={[styles.button, styles.modalButtonCancel]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.cancelTextStyle}>Annuler</Text>
                      </Pressable>

                      <Pressable
                        style={[styles.button, styles.ModalButtonValidate]}
                        onPress={() => setModalVisible(!modalVisible)}>
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

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => { setModalVisible(!modalVisible) }}><Text>Noter l'évennement</Text>
        </Pressable>
      </>
    </SafeAreaView>
  );
};

export default EventDetails;

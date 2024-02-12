import { useState } from "react";
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import data from '../assets/fr-esr-fete-de-la-science-23.json'

import { COLORS, icons, images, SIZES } from "../constants";
import {
  PopularEvents,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { FIRESTORE_DB } from "../firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Home = () => {
  const events = [];
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
          />


          <TouchableOpacity
            onPress={() => importData()}
          >
            <Text >Ajout Event Test</Text>
          </TouchableOpacity>


          <Popularjobs />
          <PopularEvents />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

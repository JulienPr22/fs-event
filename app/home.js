import { useState } from "react";
import { SafeAreaView, ScrollView, View, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import fakeData from "../assets/fr-esr-fete-de-la-science-23.json"


import { COLORS, icons, images, SIZES } from "../constants";
import {
  PopularEvents,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,

} from "../components";
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";



const Home = () => {
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
              /* if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              } */
              exportData();
            }}
          />



          <Popularjobs />
          <PopularEvents />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

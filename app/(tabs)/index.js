import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants";
import {
  PopularEvents,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,

} from "../../components";

import { MaterialIcons } from "@expo/vector-icons";
import firestoreService from "../services/fireStoreService";

const HomeScreen = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
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
              firestoreService.exportData()
              /* if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              } */
            }}
          />

          <Popularjobs />
          <PopularEvents />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

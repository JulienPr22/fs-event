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

const HomeScreen = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Tabs.Screen
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

export default HomeScreen;

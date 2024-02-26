import { useState } from "react";
import { SafeAreaView, ScrollView, View, Pressable } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../../constants";
import {
  PopularEvents,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,

} from "../../components";

import { FontAwesome } from "@expo/vector-icons";

const HomeScreen = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Tabs.Screen

        options={{
          tabBarLabel: "Accueil",
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
          ),
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={28}
              style={{ marginBottom: -3 }}
              name="home"
              color={color}
            />
          ),
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

export default HomeScreen;

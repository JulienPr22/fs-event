import { useCallback, useContext, useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
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
import { useSession } from "../../ctx";
import { UserContext } from "../UserContext";

const HomeScreen = () => {
  const router = useRouter()
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
            handleClick={(searchTerm) => {
              // firestoreService.exportData()
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              } else {
                router.push(`/search/all`)

              }
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

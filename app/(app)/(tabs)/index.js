import { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
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
  const { session } = useSession()
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState([]);

 /*  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await firestoreService.fetchUser(session);
        console.log("userData", userData);
        setUser(userData);
        console.log(user, "user");
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
      }
    };

    fetchData();
  }, []); */


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
              // firestoreService.exportData()
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
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

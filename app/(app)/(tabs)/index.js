import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants";
import {
  PopularEvents,
  PopularRoutes,
  Welcome,

} from "../../components";
import { useCallback, useEffect, useState } from "react";

const HomeScreen = () => {
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)


  useEffect(() => {
    ( () => {
      onRefresh
    })();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >

          <Welcome
            handleClick={(searchTerm) => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              } else {
                router.push(`/search/all`)

              }
            }}
          />

          <PopularRoutes refreshing={refreshing}/>
          <PopularEvents refreshing={refreshing} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

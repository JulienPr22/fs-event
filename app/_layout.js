import { Stack, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "home",
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    /*  <Stack initialRouteName="home">
       <Stack.Screen name="home" />
     </Stack> */

    <Tabs initialRouteName="home">
      <Tabs.Screen
        name="home"
      />
    </Tabs>
  )
};

export default Layout;

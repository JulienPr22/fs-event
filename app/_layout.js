import { Stack, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import HomeScreen from "./home/home-screen";
import { creatNativeStackNavigator } from '@react-navigation/native-stack'

// const Stack = creatNativeStackNavigator();

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
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
};

export default Layout;

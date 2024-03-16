import { Redirect, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useSession } from "../ctx";

export const unstable_settings = {
  initialRouteName: "home",
};

const Layout = () => {
  const { session, isLoading } = useSession();

  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  return (

    <Stack >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>

  )
};

export default Layout;

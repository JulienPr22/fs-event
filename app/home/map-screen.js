import { Tabs } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';
import { COLORS, icons, images } from '../../constants';
import { ScreenHeaderBtn } from '../../components';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function Messages() {
  return (
    <SafeAreaView>
      <Tabs.Screen
        options={{
          tabBarLabel: "Carte",
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
            <MaterialIcons
              size={28}
              style={{ marginBottom: -3 }}
              name="place"
              color={color}
            />
          ),
        }}
      />
      <View>
        <Text>Messages screen</Text>
      </View>
    </SafeAreaView>

  );
}

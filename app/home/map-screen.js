import { Tabs } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';
import { COLORS, icons, images } from '../../constants';
import { ScreenHeaderBtn } from '../../components';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function MapScreen() {
  return (
    <SafeAreaView>
      <Tabs.Screen
      />
      <View>
        <Text>Map</Text>
      </View>
    </SafeAreaView>

  );
}

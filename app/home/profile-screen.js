import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants';

export default function ProfileScreen() {
  return (
    <SafeAreaView>
      <Tabs.Screen
      />
      <View>
        <Text>profile</Text>
      </View>
    </SafeAreaView>
  );
}

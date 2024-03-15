import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { COLORS } from '../../constants';

function MyTabs() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: COLORS.primary }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Accueil',
                    headerShadowVisible: false,
                    headerShown: false,
                    headerLeft: null,
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons
                            size={28}
                            style={{ marginBottom: -3 }}
                            name="home"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="map-screen"
                options={{
                    title: 'Carte',
                    headerShadowVisible: false,
                    headerShown: false,
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
            <Tabs.Screen
                name="profile-screen"
                options={{
                    title: 'Profil',
                    headerShadowVisible: false,
                    headerTitle: "",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons
                            size={28}
                            style={{ marginBottom: -3 }}
                            name="person"
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
export default MyTabs;
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './profile-screen';
import HomeScreen from './home-screen';
import MapScreen from './map-screen';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Accueil"
                component={HomeScreen}
                options={{
                    headerShadowVisible: false,
                    headerTitle: "",
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
            <Tab.Screen
                name="Carte"
                component={MapScreen}
                options={{
                    headerShadowVisible: false,
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
            <Tab.Screen
                name="Profil"
                component={ProfileScreen}
                options={{
                    headerShadowVisible: false,
                    headerTitle: "",
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
        </Tab.Navigator>
    );
}
export default MyTabs;
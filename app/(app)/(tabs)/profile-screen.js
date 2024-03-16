import { View, Text, SafeAreaView } from 'react-native';
import { useSession } from '../../ctx';


export default function ProfileScreen() {
  const {signOut}  = useSession();
  return (
    <SafeAreaView>
      <View>
        <Text
          onPress={() => {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            signOut();
          }}>
          Sign Out
        </Text>
      </View>
    </SafeAreaView>
  );
}

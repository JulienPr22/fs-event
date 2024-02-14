import { View, Text,StyleSheet } from 'react-native'
import IconButton from './IconButton';


const rating = () => {

  const handlePress = () => {
    console.log('Button pressed');
  };

  return (
    <View style={styles.container}>
      <IconButton
        onPress={handlePress}
        iconName="heart"
        iconType="font-awesome"
        iconColor="red"
        iconSize={30}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default rating
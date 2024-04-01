import { Pressable, Text, View } from 'react-native';
import styles from './routecard.style';

const RouteCard = ({index, onPress }) => {

  return (
    <Pressable style={styles.container(index)} onPress={onPress}>
      <View>
        <Text style={styles.rank} numberOfLines={1}>
          {index + 1}
        </Text>
      </View>
    </Pressable>
  );
};

export default RouteCard;

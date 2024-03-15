import { View, Text } from 'react-native';

import styles from './place-details.style';

const PlaceDetails = ({ placeName, adress, accessibility }) => {
  return (
    <View style={styles.container}>

      <View style={styles.contentBox}>
        <Text style={styles.headText}>Lieu: </Text>
        <Text style={styles.contextText}>{placeName}</Text>
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.headText}>Adresse: </Text>
        <Text style={styles.contextText}>{adress}</Text>
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.headText}>Accessibilité: </Text>

        <View style={styles.pointsContainer}>
          {accessibility.map((item, index) => (
            <View style={styles.pointWrapper} key={item + index}>
              <View style={styles.pointDot} />
              <Text style={styles.pointText}>{item}</Text>
            </View>
          ))}
        </View>

      </View>
    </View>
  );
};

export default PlaceDetails;

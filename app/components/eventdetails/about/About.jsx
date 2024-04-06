import { View, Text } from "react-native";

import styles from "./about.style";

const About = ({ description, dates, capacite }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>À propos de l'événement:</Text>

      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{description}</Text>
      </View>

    </View>
  );
};

export default About;

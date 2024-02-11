import { View, Text } from "react-native";

import styles from "./about.style";

const About = ({ description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>À propos de l'évennement:</Text>

      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{description}</Text>
      </View>

      {/* <View style={styles.contentBox}>
        <Text style={styles.contextText}>Organiser par: {organisateur}</Text>
      </View> */}


    </View>
  );
};

export default About;

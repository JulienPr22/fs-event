import { View, Text } from "react-native";

import styles from "./organization-details.style";

const OrganizationDetails = ({ organizer, organizer_url }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>organizer</Text>

      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{date}</Text>
      </View>

      {/* <View style={styles.contentBox}>
        <Text style={styles.contextText}>Organiser par: {organisateur}</Text>
      </View> */}


    </View>
  );
};

export default OrganizationDetails;

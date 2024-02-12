import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./populareventcard.style";
import { checkImageURL } from "../../../../utils";

const PopularEventCard = ({ event: event, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(event.image)
              ? event.image
              : (
                checkImageURL(event.organisateur_logo) ? event.organisateur_logo : "../../../../assets/images/placeholder.jpg"
              )
          }}
          resizeMode='contain'
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {event?.titre_fr}
        </Text>

        <Text style={styles.jobType}>{event?.type_d_animation}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularEventCard;

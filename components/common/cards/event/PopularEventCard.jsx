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
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
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

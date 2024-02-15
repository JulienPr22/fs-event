import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './populareventcard.style';
import { checkImageURL } from '../../../../utils';
import { icons } from '../../../../constants';

const PopularEventCard = ({ event: event, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(event.image)
              ? event.image
              : checkImageURL(event.organisateur_logo)
              ? event.organisateur_logo
              : '../../../../assets/images/placeholder.jpg',
          }}
          resizeMode='contain'
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <View>
          <Text style={styles.eventTitle} numberOfLines={1}>
            {event?.titre_fr}
          </Text>
        </View>

        <View style={styles.InfoBox}>

        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode='contain'
            style={styles.locationImage}
          />
          <Text style={styles.companyName}>{event.lib_commune} </Text>

        </View>
      </View>

        <Text style={styles.eventDescription} numberOfLines={3}>
          {event?.description_fr}
        </Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.eventDescription}>{event?.rating.toFixed(1)}</Text>
          <Image
            source={icons.star}
            resizeMode='contain'
            style={styles.starIcon}
          />
          <Text style={styles.eventDescription}>({event?.votes})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularEventCard;

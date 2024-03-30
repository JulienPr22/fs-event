import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import styles from './eventcard.style';
import { checkImageURL } from '../../../../utils';
import { icons } from '../../../../constants';
import { useState } from 'react';

const EventCard = ({ event, onPress }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const imageSource = checkImageURL(event.image)
    ? { uri: event.image }
    : checkImageURL(event.organisateur_logo)
    ? { uri: event.organisateur_logo }
    : require('../../../../assets/images/placeholder.png');

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      onLongPress={() => setIsDescriptionVisible(true)}
      onPressOut={() => setIsDescriptionVisible(false)}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={imageSource}
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
            <Text style={styles.locationName}>{event.lib_commune} </Text>
          </View>
        </View>

        {isDescriptionVisible ? (
          <Text style={styles.eventDescription} >
            {event?.description_fr}
          </Text>
        ) : (
          <></>
        )}

        <View style={styles.ratingContainer}>
          <Text style={styles.eventDescription}>
            {event?.rating?.toFixed(1)}
          </Text>
          <Image
            source={icons.star}
            resizeMode='contain'
            style={styles.starIcon}
          />
          <Text style={styles.eventDescription}>({event?.votes})</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default EventCard;

import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import styles from './event-tile.style';
import { useState } from 'react';
import { checkImageURL } from '../../../utils';
import { icons } from '../../../constants';

const EventTile = ({ event, onPress }) => {
  const imageSource = checkImageURL(event.image)
    ? { uri: event.image }
    : checkImageURL(event.organisateur_logo)
    ? { uri: event.organisateur_logo }
    : require('../../../assets/images/placeholder.png');

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default EventTile;

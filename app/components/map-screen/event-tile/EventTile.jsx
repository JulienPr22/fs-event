import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './event-tile.style';
import { checkImageURL } from '../../../utils';
import { COLORS, icons } from '../../../constants';
import { MaterialIcons } from '@expo/vector-icons';

const EventTile = ({ event, onPress, onClose }) => {
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

      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={onClose}
          style={{
            backgroundColor: 'red',
            padding: 5,
            borderRadius: '50%',
          }}
        >
          <MaterialIcons name='close' size={24} color={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: COLORS.systemBlue,
            padding: 5,
            borderRadius: '50%',
          }}
        >
          <MaterialIcons
            name='arrow-right-alt'
            size={24}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventTile;

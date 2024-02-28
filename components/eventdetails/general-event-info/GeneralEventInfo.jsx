import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './general-event-info.style';
import { icons } from '../../../constants';
import { checkImageURL } from '../../../utils';

const GeneralEventInfo = ({ image, title, animationType, city, rating, votes }) => {

  const imageSource = checkImageURL(image)
  ? { uri: image }
  : require('../../../assets/images/placeholder.jpg');

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image source={imageSource} style={styles.logoImage} />
      </View>

      <View style={styles.eventTitleBox}>
        <Text style={styles.eventTitle}>{title}</Text>
      </View>

      <View style={styles.eventInfoBox}>
        <Text style={styles.animationType}>{animationType} / </Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode='contain'
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{city}</Text>
        </View>
      </View>

      <View style={styles.ratingContainer}>
          <Text style={styles.eventDetail}>{rating?.toFixed(3)}</Text>
          <Image
            source={icons.star}
            resizeMode='contain'
            style={styles.starIcon}
          />
          <Text style={styles.eventDetail}>({votes})</Text>
        </View>
    </View>
  );
};

export default GeneralEventInfo;

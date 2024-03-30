
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import styles from './routecard.style';
import { checkImageURL } from '../../../../utils';
import { icons } from '../../../../constants';
import { useState } from 'react';

const RouteCard = ({ route, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>

      <View style={styles.textContainer}>
        <View>
          <Text style={styles.eventTitle} numberOfLines={1}>
            {route.title}
          </Text>
        </View>

       {/*  <View style={styles.InfoBox}>
          <View style={styles.locationBox}>
            <Image
              source={icons.location}
              resizeMode='contain'
              style={styles.locationImage}
            />
            <Text style={styles.locationName}>{event.lib_commune} </Text>
          </View>
        </View> */}

      </View>
    </Pressable>
  );
};

export default RouteCard;

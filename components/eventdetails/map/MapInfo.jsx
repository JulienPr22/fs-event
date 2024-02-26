import { View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import styles from './map-info.style';

const INITIAL_REGION = {
  latitude: 48.11,
  longitude: -1.68,
  latitudeDelta: 2,
  longitudeDelta: 2,
};

const MapInfo = ({ coordinate }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ width: 250, height: 250 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        <Marker coordinate={coordinate}></Marker>
      </MapView>
    </View>
  );
};

export default MapInfo;

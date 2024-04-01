import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './map-info.style';

const INITIAL_REGION = {
  latitude: 48.86,
  longitude: 2.3522,
  latitudeDelta: 10,
  longitudeDelta: 10,
};

const MapInfo = ({ coordinate }) => {
  return (
    <View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
      >
        <Marker coordinate={coordinate}></Marker>
      </MapView>
    </View>
  );
};

export default MapInfo;

import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';

import styles from './footer.style';
import { icons } from '../../../constants';

const Footer = ({
  isAdded,
  handleOnAdd,
  userRole,
  ratingModalVisible,
  setRatingModalVisible,
}) => {
  return (
    <View style={styles.actionBtnContainer}>
      <TouchableOpacity style={styles.addBtn} onPress={handleOnAdd}>
        <Image
          source={isAdded ? icons.remove : icons.add}
          resizeMode='contain'
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>

      {userRole == 'visitor' ? (
        <Pressable
          style={styles.ratingBtn}
          onPress={() => {
            setRatingModalVisible(!ratingModalVisible);
          }}
        >
          <Text style={styles.openBtnText}>Noter l'évennement</Text>
        </Pressable>
      ) : (
        <Pressable
          style={styles.ratingBtn}
          /*  onPress={() => {
          router.setParams({
            eventId: event.id,
            eventFilling: 60
          })
          router.navigate('/fillingModal/', {
            eventId: event.id,
            eventFilling: 60
          })
        }} */
        >
          <Text style={styles.openBtnText}>Remplissage</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Footer;

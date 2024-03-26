import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';

import styles from './footer.style';
import { icons } from '../../../constants';

const Footer = ({
  isAdded,
  handleOnAdd,
  userRole,
  modalVisible,
  setModalVisible,
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


        <Pressable
          style={styles.ratingBtn}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={styles.openBtnText}>{userRole == 'visitor' ? "Noter l'évennement" : "Remplissage"}</Text>
        </Pressable>

    </View>
  );
};

export default Footer;

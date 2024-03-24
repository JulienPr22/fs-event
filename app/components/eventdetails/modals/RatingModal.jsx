import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Modal } from 'react-native';
import { AirbnbRating } from '@rneui/themed';
import styles from '../../../styles/modals.style';

export default function RatingModal({
  visible,
  setVisible,
  setUserRating,
  validateRating,
}) {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.ratingModalCenteredView}>
        <View style={styles.ratingModalView}>
          <Text style={styles.modalText}>Veuillez saisir une note</Text>

          <AirbnbRating
            ratingBackgroundColor='#000'
            showRating
            fractions='{0}'
            reviews={['Très mauvais', 'Mauvais', 'Moyen', 'Bien', 'Super']}
            onFinishRating={(rating) => {
              setUserRating(rating);
            }}
          ></AirbnbRating>
          <View style={styles.buttons}>
            <Pressable style={styles.button} onPress={() => setVisible(false)}>
              <Text style={styles.textStyleCancel}>Annuler</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonValidate]}
              onPress={() => {
                validateRating();
              }}
            >
              <Text style={styles.textStyle}>Valider</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

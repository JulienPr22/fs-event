import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import React from 'react';
import { Slider } from '@rneui/themed';
import styles from '../../../styles/modals.style';

const FillingModal = ({
  visible,
  setVisible,
  fillingValue,
  setFillingValue,
  onClose,
  onApply,
}) => {
  const handleApply = () => {
    onApply();
    onClose();
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <Modal visible={visible} onRequestClose={() => setVisible(false)}>
      <View
        style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={styles.headerTitle}>
          Définir le remplissage de l'évennement
        </Text>
        <View style={styles.contentView}>
          <Slider
            value={fillingValue}
            onValueChange={setFillingValue}
            maximumValue={100}
            minimumValue={0}
            step={1}
            minimumTrackTintColor='#34C759'
            maximumTrackTintColor='#eee'
            thumbTintColor='#E2E2E2'
            thumbTouchSize={{ width: 40, height: 40 }}
            thumbStyle={{ height: 20, width: 20 }}
            trackStyle={{ height: 10, borderRadius: 20 }}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.infoLabel}>Remplissage: </Text>
          <Text style={styles.infoValue}>{fillingValue}</Text>
        </View>

        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={handleReset}>
            <Text style={styles.textStyleCancel}>Annuler</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.buttonValidate]}
            onPress={handleApply}
          >
            <Text style={styles.textStyle}>Valider</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default FillingModal;

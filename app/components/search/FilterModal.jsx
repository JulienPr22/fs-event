import { CheckBox } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants';

const FilterModal = ({
  visible,
  onClose,
  onApply,
  onReset,
  checkedItems,
  setCheckedItems,
  minimumRating,
  setMinimumRating
}) => {
  const handleApply = () => {
    onApply();
    onClose();
  };

  const handleReset = () => {
    const updatedItems = checkedItems.map((item) => ({
      ...item,
      checked: false,
    }));
    setCheckedItems(updatedItems);
    onReset();
  };

  const handleCheckboxPress = (label) => {
    const updatedItems = checkedItems.map((item) => {
      if (item.label === label) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setCheckedItems(updatedItems);
  };

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <View style={{ padding: SIZES.medium }}>
          <Text style={styles.headerTitle}>Filtres</Text>
          <Text style={styles.filterTitle}> Type d'animation: </Text>
          {/* AnimationTypeFilter */}
          <View>
            {checkedItems.map((item, index) => (
              <View key={item.label}>
                <CheckBox
                  style={styles.checkbox}
                  title={item.label}
                  checked={item.checked}
                  onPress={() => handleCheckboxPress(item.label)}
                  checkedColor={COLORS.primary}
                />
              </View>
            ))}
          </View>

          {/* MinimumRatingFilter */}

            <Text style={styles.filterTitle}>
              Note minimale (entre 1 et 5):
            </Text>
            <TextInput
              style={styles.input}
              keyboardType='numeric'
              placeholder='Saisir la note minimale'
              value={minimumRating}
              onChangeText={(num) => setMinimumRating(num)}
              returnKeyType="done" // Ajoute cette prop pour afficher OK/Annuler
              returnKeyLabel='Valider'
              onSubmitEditing={() => Keyboard.dismiss()} // Ferme le clavier sur la soumission

            />

          {/* Apply and Reset buttons */}

          <Button title='Apply' onPress={handleApply} />
          <Button title='Reset' onPress={handleReset} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: SIZES.medium
  },
  headerTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginBottom: SIZES.medium,
  },
  filterTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  checkbox: {
    marginVertical: 0,
  },
  input: {
    width: '100%',
    height: 40,
    width: 60,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default FilterModal;

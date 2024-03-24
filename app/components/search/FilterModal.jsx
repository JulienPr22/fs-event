import { CheckBox } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants';

const FilterModal = ({ visible, onClose, onApply, onReset, checkedItems, setCheckedItems }) => {

  const handleApply = () => {
    onApply();
    onClose();
  };

  const handleReset = () => {
    const updatedItems = checkedItems.map(item => ({ ...item, checked: false }));
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
      <SafeAreaView>
        <View style={{ padding: SIZES.medium }}>
          <Text style={styles.headerTitle}>Filtres</Text>
          <Text style={styles.filterTitle}> Type d'animation: </Text>

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

          {/* Apply and Reset buttons */}

          <Button title='Apply' onPress={handleApply} />
          <Button title='Reset' onPress={handleReset} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
});

export default FilterModal;

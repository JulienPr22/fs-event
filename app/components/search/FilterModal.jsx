import React, { useState } from 'react';
import { Modal, View, Text, Button, SafeAreaView } from 'react-native';

const FilterModal = ({ visible, onClose, onApply, onReset }) => {
  const [filters, setFilters] = useState({});

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({});
    onReset();
  };

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <SafeAreaView>
        <View>
          {/* Add your filter options here */}
          <Text>Filtres</Text>

          {/* Apply and Reset buttons */}
          <Button title='Apply' onPress={handleApply} />
          <Button title='Reset' onPress={handleReset} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default FilterModal;

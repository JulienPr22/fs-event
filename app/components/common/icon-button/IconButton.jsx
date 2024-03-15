import { Icon } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';


const IconButton = ({ onPress, iconName, iconType, iconColor, iconSize }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Icon
          name={iconName}
          type={iconType}
          color={iconColor}
          size={iconSize}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconButton;

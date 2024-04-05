import { TouchableOpacity } from 'react-native';
import styles from './screenheader.style';
import { MaterialIcons } from '@expo/vector-icons';

const ScreenMaterialHeaderBtn = ({ iconName, handlePress }) => {
  return (
    <TouchableOpacity style={[styles.btnContainer, {marginRight:25}]} onPress={handlePress}>
      <MaterialIcons
        size={28}
        name={iconName}
        color='black'
      />
    </TouchableOpacity>
  );
};

export default ScreenMaterialHeaderBtn;

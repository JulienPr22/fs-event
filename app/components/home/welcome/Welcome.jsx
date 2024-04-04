import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import styles from './welcome.style';
import { icons } from '../../../constants';
import { UserContext } from '../../../(app)/UserContext';

const Welcome = ({ handleClick }) => {
  const { user, setUser } = useContext(UserContext);
  const [text, setText] = useState('');

  return (
    <View>
      <View style={styles.container}>
        {user && <Text style={styles.userName}>Bonjour {user.name}</Text>}
        <Text style={styles.welcomeMessage}>Trouvez un événement</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={text}
            onChangeText={(text) => setText(text)}
            placeholder='Que recherchez vous ?'
            returnKeyType='search'
            onSubmitEditing={() => handleClick(text) }
          />
        </View>

        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => handleClick(text)}
        >
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}></View>
    </View>
  );
};

export default Welcome;

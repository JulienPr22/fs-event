import { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';

import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';
import { UserContext } from '../../../(app)/UserContext';
import { useSession } from '../../../ctx';
import firestoreService from '../../../(app)/services/fireStoreService';

const dataType = ['Évennements', 'Parcours'];

const Welcome = ({handleClick }) => {
  const { user, setUser } = useContext(UserContext);
  const [text, setText] = useState("")

  return (
    <View>
      <View style={styles.container}>
        {user && <Text style={styles.userName}>Bonjour {user.name}</Text>}
        <Text style={styles.welcomeMessage}>Trouvez un évennement</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={text}
            onChangeText={(text) => setText(text)}
            placeholder='Que recherchez vous ?'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={() => handleClick(text)} >
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {/*  <FlatList
          data={dataType}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        /> */}
      </View>
    </View>
  );
};

export default Welcome;

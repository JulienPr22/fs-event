import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import styles from '../../../styles/modals.style';
import { formatDate } from '../../../utils';



const SlotPickerModal = ({visible, setVisible, slotOptions, addToCalendar}) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={()=>setVisible(false)}>

    <View style={styles.actionsModalCenteredView}>
      <View style={styles.actionsModalView}>
        <Text style={styles.actionText}>Choisissez un créneau</Text>
        {
          slotOptions?.map((slot, index) => (
            <TouchableOpacity key={index} style={styles.actionContainer} onPress={() => addToCalendar(slot)}>
              <View style={styles.textContainer}>
                <Text style={styles.actionText} numberOfLines={1}>
                  {formatDate(slot)}
                </Text>
              </View>
            </TouchableOpacity>
          ))

        }

        <View style={styles.buttons}>
          <Pressable
            style={styles.button}
            onPress={() => {
              setVisible(false)
            }}>
            <Text style={styles.textStyleCancel}>Annuler</Text>
          </Pressable>

        </View>
      </View>
    </View>
  </Modal>
  )
}

export default SlotPickerModal
import { View, Text, Modal, TouchableOpacity, Image, Pressable, Linking } from 'react-native'
import React from 'react'
import styles from '../../../styles/modals.style';

export default function ActionModal({visible, setVisible, toggleModal, slotPickerModal, phoneResevation, mailReservation, eventLink}) {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={() => setVisible(false)}>


    <View  style={styles.actionsModalCenteredView}>
      <View style={styles.actionsModalView}>
        <Text style={styles.actionText}>Plus d'actions</Text>

        <TouchableOpacity style={styles.actionContainer} onPress={slotPickerModal}>
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              source={require("../../../assets/icons/calendar.png")}
              resizeMode='contain'
              style={styles.logImage}
            />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.actionText} numberOfLines={1}>
              {"Ajouter au calendrier"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionContainer} onPress={phoneResevation}>
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              source={require("../../../assets/icons/phone.png")}
              resizeMode='contain'
              style={styles.logImage}
            />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.actionText} numberOfLines={1}>
              {"Appeler pour réserver"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionContainer} onPress={mailReservation}>
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              source={require("../../../assets/icons/mail.png")}
              resizeMode='contain'
              style={styles.logImage}
            />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.actionText} numberOfLines={1}>
              {"Mail de réservation"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionContainer} onPress={() => { Linking.openURL(eventLink) }}>
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              source={require("../../../assets/favicon.png")}
              resizeMode='contain'
              style={styles.logImage}
            />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.actionText} numberOfLines={1}>
              {"Voir sur le site"}
            </Text>
          </View>
        </TouchableOpacity>

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
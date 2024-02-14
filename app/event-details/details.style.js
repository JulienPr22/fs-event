import {
    StyleSheet,
  } from "react-native";
import { COLORS } from "../../constants";

  const styles = StyleSheet.create({
    modalCenteredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor:"rgba(255,255,255,0.7)",
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: COLORS.primary,
      color: "white"
    },
    ModalButtonValidate: {
      backgroundColor: '#2196F3',
    },

    modalButtonCancel: {
    },

    buttons:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cancelTextStyle: {
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    rating: {
        backgroundColor: "transparent"
    }
  });

  export default styles;
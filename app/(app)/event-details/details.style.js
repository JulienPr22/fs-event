import {
  StyleSheet,
} from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";


const styles = StyleSheet.create({
  ratingModalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  ratingModalView: {
    margin: SIZES.large,
    backgroundColor: 'white',
    borderRadius: SIZES.large,
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

  modalText: {
    marginBottom: SIZES.medium,
    textAlign: 'center',
  },
  actionsModalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 100,
  },
  actionsModalView: {
    margin: SIZES.large,
    backgroundColor: 'white',
    borderRadius: SIZES.large,
    padding: 35,
    alignItems: 'center',
    alignSelf: 'center', // Modification ici
    maxWidth: '80%', // Ajout pour limiter la largeur de la modal
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.small, // Ajout pour réduire l'espace vertical
  },
  actionText: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  logoContainer: {
    width: 35,
    height: 35,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logImage: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  buttons: {
    paddingTop: SIZES.medium,
    flexDirection: 'row',
    gap: 20
  },
  button: {
    borderRadius: SIZES.large,
    padding: SIZES.small,
    elevation: 2,
  },
  actionBtnContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.small,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  ratingBtn: {
    flex: 1,
    backgroundColor: "#FE7654",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.small,
    marginLeft: SIZES.medium,
    borderRadius: SIZES.medium,
    bottom: 10
  },
  addBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    bottom: 10
  },
  likeBtnImage: {
    width: "40%",
    height: "40%",
    tintColor: "#F37453",
  },
  openBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
  buttonValidate: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textStyleCancel: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },


   eventDescription: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    paddingHorizontal: 5,
    textTransform: "capitalize",
  },
});


export default styles;
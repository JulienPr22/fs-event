import {
  StyleSheet,
} from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {

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
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  openBtn: {
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

  modalText: {
    marginBottom: SIZES.medium,
    textAlign: 'center',
  },

  // OVERLAY

  overlay : {

    height: 300,

  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 50,
    height: 50,
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

  eventTitle: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
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
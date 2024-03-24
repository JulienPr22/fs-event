import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";


const styles = StyleSheet.create({
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
        alignSelf: 'center',
        maxWidth: '80%',
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
        paddingVertical: SIZES.small,
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
      textStyleCancel: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
      },
});

export default styles;

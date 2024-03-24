import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
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
});

export default styles;

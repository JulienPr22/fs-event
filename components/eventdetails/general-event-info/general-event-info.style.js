import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
  },
  logoBox: {
    width: 350,
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "80%",
    height: "80%",
    borderRadius: SIZES.small,
  },
  eventTitleBox: {
    marginTop: SIZES.small,
  },
  eventTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
    textAlign: "center",
  },
  eventInfoBox: {
    marginTop: SIZES.small / 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  animationType: {
    fontSize: SIZES.medium - 2,
    color: COLORS.primary,
    fontFamily: FONT.medium,
  },
  locationBox: {
    marginLeft: -4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationImage: {
    width: 14,
    height: 14,
    tintColor: COLORS.gray,
  },
  locationName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONT.regular,
    marginLeft: 2,
  },
  eventDetail: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
  ratingContainer: {
    flex: 1,
    alignItems: "center",
    gap: 5,
    flexDirection: "row",
  },

  starIcon: {
    width: SIZES.medium,
    height: SIZES.medium,
  },
});

export default styles;

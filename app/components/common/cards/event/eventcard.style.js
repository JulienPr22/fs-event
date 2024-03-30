import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
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
  ratingContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  eventDescription: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    paddingHorizontal: 5,
    textTransform: "capitalize",
  },
  starIcon: {
    width: SIZES.medium,
    height: SIZES.medium,
  },
  InfoBox: {
    marginTop: SIZES.small / 2,
    flexDirection: "row",
    ustifyContent: "center",
    alignItems: "flex-start",
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "flex-start",
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
});

export default styles;

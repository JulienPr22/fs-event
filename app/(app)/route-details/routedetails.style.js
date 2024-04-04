import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingHorizontal: SIZES.xSmall,
        marginTop: SIZES.xLarge
    },
    eventsContainer: {
        marginTop: SIZES.xLarge,
        height: 450,
    },
    title: {
        justifyContent: "center",
        fontSize: SIZES.xLarge,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    field: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginVertical: 5,
    },
    infoLabel: {
        fontSize: SIZES.large,
        color: COLORS.secondary,
        fontFamily: FONT.bold,
    },
    infoValue: {
        fontSize: SIZES.large,
        color: COLORS.primary,
    },
    cardsContainer: {
        marginTop: SIZES.medium,
        marginHorizontal: SIZES.medium,
        gap: SIZES.small
    },

});

export default styles;
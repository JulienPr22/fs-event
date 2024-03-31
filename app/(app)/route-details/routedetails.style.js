import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.xLarge
    },
    eventsContainer: {
        marginTop: SIZES.xLarge,
        height: 450
    },
    title: {
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
        gap: SIZES.small,
    },
    input: {
        width: '100%',
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: COLORS.primary,
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        marginTop: 10,
        paddingHorizontal: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    tabsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    tab: (activeRole, switchRole) => ({
        paddingVertical: SIZES.small / 2,
        paddingLeft: SIZES.small,
        borderColor: activeRole === switchRole ? COLORS.tertiary : COLORS.gray2,
    }),
    tabText: (activeJobType, switchRole) => ({
        fontFamily: FONT.medium,
        color: activeJobType === switchRole ? COLORS.tertiary : COLORS.gray2,
    }),
});

export default styles;
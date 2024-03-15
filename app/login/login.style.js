import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.large,
    },
    title: {
        fontSize: SIZES.xLarge,
        fontWeight: 'bold',
        marginBottom: 20,
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
    switchText: {
        marginTop: 5,
        color: COLORS.tertiary,
    },
});

export default styles;
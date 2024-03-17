import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link, router, useGlobalSearchParams, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Slider } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { COLORS, FONT, SIZES } from '../constants';
export default function FillingModal() {
    const [value, setValue] = useState(50);

    useEffect(() => {
        // console.log(eventId);
        // console.log(eventFilling);

        // setValue(params.filling);
    }, []);

    const handleChange = () => {
        router.back()
    }

    const isPresented = router.canGoBack();
    return (
        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
            <StatusBar style="light" />
            {!isPresented && <Link href="../">Dismiss</Link>}

            <Text style={styles.headerTitle}>Définir le remplissage de l'évennement</Text>
            <View style={styles.contentView}>
                <Slider value={value}
                    onValueChange={setValue}
                    maximumValue={100}
                    minimumValue={0}
                    step={1}
                    minimumTrackTintColor='#34C759'
                    maximumTrackTintColor='#eee'
                    thumbTintColor='#E2E2E2'
                    thumbTouchSize={{ width: 40, height: 40 }}
                    thumbStyle={{ height: 20, width: 20 }}
                    trackStyle={{ height: 10, borderRadius: 20 }} />
            </View>
            <View style={styles.field}>
                <Text style={styles.infoLabel}>Remplissage: </Text>
                <Text style={styles.infoValue}>{value}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleChange}><Text style={styles.buttonText}> Enregistrer les modifications</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    contentView: {
        padding: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    headerTitle: {
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
    button: {
        backgroundColor: COLORS.primary,
        // width: '100%',
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
});
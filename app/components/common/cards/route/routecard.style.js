import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: (index) => {
    let opacity = 0.3; // Opacité par défaut
    // Ajuster l'opacité en fonction de l'index
    if (index === 0) {
      opacity = 1; // Opacité pour la place numéro 1
    } else if (index === 1) {
      opacity = 0.7; // Opacité pour la place numéro 2
    } else if (index === 2) {
      opacity = 0.5; // Opacité pour la place numéro 3
    }

    return {
      width: 75,
      height: 75,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: `rgba(185, 176, 252, ${opacity})`, // Opacité diminuée en fonction de l'index
      borderRadius: SIZES.medium,
    }
  },
  rank: {
    fontSize: SIZES.xxLarge,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },

});

export default styles;

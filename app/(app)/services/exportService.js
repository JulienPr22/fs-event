
import { GeoPoint, doc, setDoc } from "firebase/firestore";
import fakeData from "../../assets/fr-esr-fete-de-la-science-23.json";
import ngeohash from "ngeohash";
import { FIRESTORE_DB } from "../../../firebaseConfig";

class exportService {

    static randomNumber = (min, max, dec) => {
        const nombreAleatoire = Math.random() * (max - min) + min;
        return parseFloat(nombreAleatoire.toFixed(dec));
      }

      static exportData = async () => {
        const typeAnimationSet = new Set(); // Utilisation d'un Set pour éviter les doublons

        const updatedData = fakeData.map(item => {
          const { identifiant,
            accessibilite_fr,
            adresse,
            annulation,
            code_postal,
            dates,
            departement,
            description_fr,
            description_longue_fr,
            detail_des_conditions_fr,
            detail_des_conditions_scolaire_fr,
            geolocalisation,
            grandpublic_reservation_email,
            grandpublic_reservation_lien_d_inscription,
            grandpublic_reservation_telephone,
            image,
            lib_commune,
            lien,
            lien_canonique,
            modalite,
            nom_du_lieu,
            organisateur,
            organisateur_logo,
            organisateur_url,
            region,
            resume_dates_fr,
            scolaire_reservation_email,
            scolaire_reservation_lien_d_inscription,
            scolaire_reservation_telephone,
            telephone_du_lieu,
            thematiques,
            titre_fr,
            type_animation_project,
            ville } = item

          // Génération du géohash pour la position de l'événement
          let hash = null
          let geoPoint = null
          if (geolocalisation) {
            const { lat, lon } = geolocalisation;
            geoPoint = geolocalisation ? new GeoPoint(lat, lon) : null;

            hash = ngeohash.encode(lat, lon)
          }

          /*   if (type_animation_project) {
              typeAnimationSet.add(type_animation_project); // Ajouter le thème au Set
            } */

          return {
            identifiant,
            accessibilite_fr,
            adresse,
            annulation,
            code_postal,
            dates,
            departement,
            description_fr,
            description_longue_fr,
            detail_des_conditions_fr,
            detail_des_conditions_scolaire_fr,
            "filling": 0,
            "geohash": hash,
            "geopoint": geoPoint,
            geolocalisation,
            grandpublic_reservation_email,
            grandpublic_reservation_lien_d_inscription,
            grandpublic_reservation_telephone,
            image,
            lib_commune,
            lien,
            lien_canonique,
            modalite,
            nom_du_lieu,
            organisateur,
            organisateur_logo,
            organisateur_url,
            region,
            resume_dates_fr,
            scolaire_reservation_email,
            scolaire_reservation_lien_d_inscription,
            scolaire_reservation_telephone,
            telephone_du_lieu,
            thematiques,
            titre_fr,
            type_animation_project,
            ville,
            "rating": this.randomNumber(2.2559, 4.8750, 4),
            "votes": this.randomNumber(48, 250, 0),
          };
        });

        /*  const animationTypeArray = Array.from(typeAnimationSet);
         animationTypeArray.map(typeAnimation => {
           try {
             console.log("Ajout de ", typeAnimation);
             addDoc(collection(FIRESTORE_DB, 'animations-type'), { name: typeAnimation })
           } catch (error) {
             console.error('Erreur lors de l\'exportation des données :', error);
           }
         });
      */
        updatedData.map(event => {
          try {
            console.log("Ajout de ", event.titre_fr);
            const eventRef = doc(FIRESTORE_DB, 'events', event.identifiant)
            setDoc(eventRef, event);
            // addDoc(collection(FIRESTORE_DB, 'events'), event, id: event.identifiant })
          } catch (error) {
            console.error('Erreur lors de l\'exportation des données :', error);
          }
        });
      }
}

export default exportService;
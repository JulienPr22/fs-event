
import { addDoc, collection, doc, getDoc, getDocs, limit, query, setDoc, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import fakeData from "../../assets/fr-esr-fete-de-la-science-23.json"
class firestoreService {

  static fetchData = async (queryOptions, setLoading) => {
    setLoading(true);
    try {

      let dataToFetch;
      if (queryOptions.docId) {
        const docRef = doc(FIRESTORE_DB, "events", queryOptions.docId);
        dataToFetch = await getDoc(docRef);
        setLoading(false);
        setLoading(false);
        return dataToFetch.data().event;
      } else {

        const items = [];
        let collectionRef = collection(FIRESTORE_DB, "events");
        if (queryOptions.limit) {
          collectionRef = query(collectionRef, limit(queryOptions.limit));
        }

        if (queryOptions.minRating) {
          collectionRef = query(
            collectionRef,
            where("event.rating", ">", queryOptions.minRating)
          );
        }

        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data().event });
        });

        setLoading(false);
        return items;
      }
    } catch (error) {

      setLoading(false);
      throw error;
    }
  }

  static updateEventRating = async (event, docId, userRating) => {
    try {
      const docRef = doc(FIRESTORE_DB, "events", docId);

      const updatedRating = (event.rating * event.votes + userRating) / (event.votes + 1);
      const updatedVotes = event.votes + 1;
      const newEvent = { ...event, rating: updatedRating, votes: updatedVotes }

      await setDoc(docRef, {
        newEvent
      });

      return newEvent;

    } catch (error) {
      console.error('Erreur lors de la mise à jour de la note de l\'événement :', error);

    }
  }

  static randomNumber = (min, max, dec) => {
    const nombreAleatoire = Math.random() * (max - min) + min;
    return parseFloat(nombreAleatoire.toFixed(dec));
  }

  static exportData = async () => {
    const updatedData = fakeData.map(item => {
      const { accessibilite_fr,
        adresse,
        annulation,
        code_postal,
        dates,
        departement,
        description_fr,
        description_longue_fr,
        detail_des_conditions_fr,
        detail_des_conditions_scolaire_fr,
        filling,
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
        rating,
        region,
        resume_dates_fr,
        scolaire_reservation_email,
        scolaire_reservation_lien_d_inscription,
        scolaire_reservation_telephone,
        selection,
        telephone_du_lieu,
        thematiques,
        titre_fr,
        type_animation_project,
        ville,
        votes } = item
      return {
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
        filling,
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
        rating,
        region,
        resume_dates_fr,
        scolaire_reservation_email,
        scolaire_reservation_lien_d_inscription,
        scolaire_reservation_telephone,
        selection,
        telephone_du_lieu,
        thematiques,
        titre_fr,
        type_animation_project,
        ville,
        votes,
        "rating": this.randomNumber(2.2559, 4.8750, 4),
        "votes": this.randomNumber(48, 250, 0),
        "filling": 0
      };
    });

    updatedData.map(event => {
      try {
        addDoc(collection(FIRESTORE_DB, 'events'), { event })
      } catch (error) {
        console.error('Erreur lors de l\'exportation des données :', error);
      }
    });
  }

}


export default firestoreService;

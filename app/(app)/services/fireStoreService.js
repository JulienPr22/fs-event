
import { addDoc, collection, doc, endAt, getDoc, getDocs, limit, orderBy, query, setDoc, startAt, where } from "firebase/firestore";
import fakeData from "../../assets/fr-esr-fete-de-la-science-23.json";
import ngeohash from "ngeohash";
import { FIRESTORE_DB } from "../../../firebaseConfig";


class firestoreService {

  static fetchEvents = async (queryOptions, setLoading) => {
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

  static updateEventFilling = async (event, docId, userRating) => {
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

  static fetchUser = async (userId) => {

    try {
      const docRef = doc(FIRESTORE_DB, "users", userId);
      const user = await getDoc(docRef);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  static fetchUserRouteData = async (userId, setLoading) => {
    const items = [];

    setLoading(true);
    try {
      // Récupération du parcours associé
      let routesRef = collection(FIRESTORE_DB, "routes");
      routesRef = query(
        routesRef,
        where("creatorId", "==", userId),
        limit(1)
      );

      const querySnapshot = await getDocs(routesRef);
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      const route = items[0]

      // Récupération des parcours associés (par référence)
      const refEvents = route.relatedEvents || [];

      const eventsPromises = refEvents.map(async (eventRef) => {
        const eventDoc = await getDoc(eventRef)
        return { id: eventDoc.id, ...eventDoc.data().event };
      });

      const eventsData = await Promise.all(eventsPromises);
      console.log("eventsData", eventsData);

      setLoading(false);
      return ({route: route, events: eventsData });

    } catch (error) {

      setLoading(false);
      throw error;
    }
  }

  static fetchUserEventsRouteIds = async (userId, setLoading) => {
    console.log("fetchUserEventsRouteIds", userId);
    const ids = [];
    const items = [];

    setLoading(true);
    try {
      // Récupération du parcours associé
      let routesRef = collection(FIRESTORE_DB, "routes");
      routesRef = query(
        routesRef,
        where("creatorId", "==", userId),
        limit(1)
      );

      const querySnapshot = await getDocs(routesRef);
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      const route = items[0]

      // Récupération des parcours associés (par référence)
      const refEvents = route.relatedEvents || [];

      const eventsPromises = refEvents.map(async (eventRef) => {
        const eventDoc = await getDoc(eventRef)
        return eventDoc.id;
      });


      const eventsData = await Promise.all(eventsPromises);

      setLoading(false);
      return (eventsData);

    } catch (error) {

      setLoading(false);
      throw error;
    }
  }

  static fetchRoute = async (userId, setLoading) => {
    setLoading(true);
    const items = []
    try {

      let routesRef = collection(FIRESTORE_DB, "routes");
      routesRef = query(
        routesRef,
        where("creatorId", "==", userId),
        limit(1)
      );

      const querySnapshot = await getDocs(routesRef);
      querySnapshot.forEach((route) => {
        items.push(route.data());
      });

      setLoading(false);
      console.log("items[0]", items[0]);
      return items[0];

    } catch (error) {

      setLoading(false);
      throw error;
    }
  }


  static randomNumber = (min, max, dec) => {
    const nombreAleatoire = Math.random() * (max - min) + min;
    return parseFloat(nombreAleatoire.toFixed(dec));
  }

  static exportData = async () => {
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
        selection,
        telephone_du_lieu,
        thematiques,
        titre_fr,
        type_animation_project,
        ville } = item

      // Génération du géohash pour la position de l'événement
      let hash
      if (geolocalisation) {
        const { lat, lon } = geolocalisation;
        hash = ngeohash.encode(lat, lon)
        console.log("coords", lat, lon);
      }

      else { hash = null; }

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
        selection,
        telephone_du_lieu,
        thematiques,
        titre_fr,
        type_animation_project,
        ville,
        "rating": this.randomNumber(2.2559, 4.8750, 4),
        "votes": this.randomNumber(48, 250, 0),
      };
    });

    updatedData.map(event => {
      try {
        console.log("identifiant", event.identifiant);
        addDoc(collection(FIRESTORE_DB, 'events'), { event })
      } catch (error) {
        console.error('Erreur lors de l\'exportation des données :', error);
      }
    });
  }

  static getNearbyEvents = async (latitude, longitude) => {

    const bounds = geofire.geohashQueryBounds([latitude, longitude], 25000);
    const promises = [];
    for (const b of bounds) {
      const q = query(
        this.eventsCollectionRef,
        orderBy('geohash'),
        startAt(b[0]),
        endAt(b[1]));

      promises.push(getDocs(q));
    }

    // Collect all the query results together into a single list
    const snapshots = await Promise.all(promises);

    const matchingDocs = [];
    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        const { lat, lng } = doc.get("geolocalisation")

        // We have to filter out a few false positives due to GeoHash
        // accuracy, but most will match
        const distanceInKm = geofire.distanceBetween([lat, lng], center);
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= radiusInM) {
          matchingDocs.push(doc);
        }
      }
    }
    console.log("matchingDocs", matchingDocs);
  }
}


export default firestoreService;

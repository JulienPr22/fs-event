import { FIRESTORE_DB } from "../../../firebaseConfig";
import { collection, doc, endAt, getDoc, getDocs, limit, orderBy, query, startAfter, startAt, updateDoc, where } from "firebase/firestore";
import { distanceBetween, geohashQueryBounds } from "geofire-common";

/**
 * classe de service pour gérer les événements
 */
class eventService {

  static getEventById = async (eventId) => {
    const docRef = doc(FIRESTORE_DB, "events", eventId);
    dataToFetch = await getDoc(docRef);
    return { id: dataToFetch.id, ...dataToFetch.data() };
  }

  static fetchPopularEvents = async (setLoading) => {
    setLoading(true);
    try {

      const items = [];
      let collectionRef = collection(FIRESTORE_DB, "events");

      collectionRef = query(
        collectionRef,
        where("rating", ">=", 4),
        orderBy("identifiant", "desc"),
        limit(50));


      const querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach((doc) => {
        const e = { id: doc.id, ...doc.data() };
        items.push(e);
      });

      setLoading(false);
      return items;

    } catch (error) {

      setLoading(false);
      throw error;
    }
  }
  /**
   * Récupère les événements selon différents critères
   *
   * @param  queryOptions un object contenant différentes option de recherche
   * @param  setLoading référence de méthode pour mettre à jour l'état de chargement
   * @returns un tableau d'événements  correspondants aux critères de recherche ainsi que la référence du dernier objet affiché
   */
  static fetchEvents = async (queryOptions, setLoading) => {
    console.log("queryOptions", queryOptions);
    setLoading(true);
    const items = [];
    const { minRating, animationTypeFilter, searchTerm, lastVisible, maxResults } = queryOptions

    try {
      let collectionRef = collection(FIRESTORE_DB, "events");

      // Recherche par mot clé
      /* if (queryOptions.searchTerm) {
        collectionRef = query(
          collectionRef,
          where("titre_fr", ">=", queryOptions.searchTerm),
          where("titre_fr", "<=", queryOptions.searchTerm + "\uf8ff")
        );
      }
      */

      // Filtre sue une note minimale
      if (minRating) {
        collectionRef = query(
          collectionRef,
          where("rating", ">=", minRating),
        );
      }

      // Filtre sur le type d'animation
      if (animationTypeFilter?.length > 0) {
        collectionRef = query(
          collectionRef,
          where("type_animation_project", "in", animationTypeFilter)
        );
      }

      // Pagination
      if (lastVisible) {
        console.log("Next Page");
        collectionRef = query(collectionRef, orderBy("identifiant", "desc"), startAfter(lastVisible), limit(maxResults));

      } else {
        console.log("First Page");
        collectionRef = query(collectionRef, orderBy("identifiant", "desc"), limit(maxResults));
      }

      const querySnapshot = await getDocs(collectionRef);
      const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      querySnapshot.forEach((doc) => {
        const e = { id: doc.id, ...doc.data() };
        items.push(e);
      });

      setLoading(false);
      return { lastVisible: newLastVisible, items };

    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  /**
   * Recherche tous les événements situé dans une zone
   *
   * @param latitude la latitude du centre de la zone
   * @param longitude la longitude du centre de la zone
   * @param maxDistanceKm le rayon de la zone
   * @returns
   */
  static getNearbyEvents = async (latitude, longitude, maxDistanceKm) => {
    const center = [latitude, longitude];
    const radiusInM = maxDistanceKm * 1000;

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
      const q = query(
        collection(FIRESTORE_DB, "events"),
        orderBy('geohash'),
        startAt(b[0]),
        endAt(b[1]),
        limit(250));

      promises.push(getDocs(q));
    }

    // Collect all the query results together into a single list
    const snapshots = await Promise.all(promises);

    const nearbyEvents = [];
    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        const lat = doc.get('geolocalisation.lat');
        const lng = doc.get('geolocalisation.lon');

        // We have to filter out a few false positives due to GeoHash
        // accuracy, but most will match
        const distanceInKm = distanceBetween([lat, lng], center);
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= radiusInM) {
          nearbyEvents.push({ id: doc.id, ...doc.data() });
        }
      }
    }
    console.log("matchingDocs", nearbyEvents);
    return nearbyEvents;
  }

  static updateEventRating = async (event, userRating) => {
    try {
      const docRef = doc(FIRESTORE_DB, "events", event.id);

      const updatedRating = (event.rating * event.votes + userRating) / (event.votes + 1);
      const updatedVotes = event.votes + 1;

      await updateDoc(docRef, { rating: updatedRating, votes: updatedVotes });

    } catch (error) {
      console.error('Erreur lors de la mise à jour de la note de l\'événement :', error);

    }
  }

  static updateEventFilling = async (event, userFilling) => {
    try {
      const docRef = doc(FIRESTORE_DB, "events", event.id);
      await updateDoc(docRef, { filling: userFilling });

    } catch (error) {
      console.error('Erreur lors de la mise à jour de la note de l\'événement :', error);

    }
  }

}


export default eventService;

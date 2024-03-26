
import { GeoPoint, addDoc, collection, doc, endAt, getDoc, getDocs, limit, orderBy, query, setDoc, startAt, where } from "firebase/firestore";
import fakeData from "../../assets/fr-esr-fete-de-la-science-23.json";
import ngeohash from "ngeohash";
import { FIRESTORE_DB } from "../../../firebaseConfig";


class firestoreService {

  static fetchEvents = async (queryOptions, setLoading) => {
    console.log("queryOptions", queryOptions);
    setLoading(true);
    try {

      let dataToFetch;
      if (queryOptions.docId) { // fetch one
        const docRef = doc(FIRESTORE_DB, "events", queryOptions.docId);
        dataToFetch = await getDoc(docRef);
        setLoading(false);
        setLoading(false);
        return dataToFetch.data();
      } else { // fetch some
        const items = [];
        let collectionRef = collection(FIRESTORE_DB, "events");

        const { maxResults, page } = queryOptions

        /* if (queryOptions.searchTerm) {
          collectionRef = query(
            collectionRef,
            where("titre_fr", ">=", queryOptions.searchTerm),
            where("titre_fr", "<=", queryOptions.searchTerm + "\uf8ff")
          );
        }
 */
        if (queryOptions.minRating) {
          collectionRef = query(
            collectionRef,
            where("rating", ">", queryOptions.minRating)
          );
        }

        if (queryOptions.animationTypeFilter && queryOptions.animationTypeFilter.length > 0) {
          collectionRef = query(
            collectionRef,
            where("type_animation_project", "in", queryOptions.animationTypeFilter)
          );
        }

          // Pagination
          if (page && maxResults) {
            const offset = (page - 1) * maxResults;
            console.log("offset", offset);
            collectionRef = query(collectionRef, orderBy("rating"), startAt(offset), limit(maxResults));
          }

        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach((doc) => {
          const e = { id: doc.id, ...doc.data() };
          items.push(e);
        });

        setLoading(false);
        if (queryOptions.page) {
          console.log("events", items);
        }
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
      console.log("fetched user", user.data());

      return user.data();
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
      let refEvents = []
      if (route) {
        refEvents = route.relatedEvents || [];
      }
      const eventsPromises = refEvents.map(async (eventRef) => {
        const eventDoc = await getDoc(eventRef)
        return { id: eventDoc.id, ...eventDoc.data() };
      });

      const eventsData = await Promise.all(eventsPromises);

      setLoading(false);
      return ({ route: route, events: eventsData });

    } catch (error) {

      setLoading(false);
      throw error;
    }
  }

  static fetchUserEventsRouteIds = async (userId, setLoading) => {
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
      let refEvents = []
      if (route) {
        refEvents = route.relatedEvents || [];
      }

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

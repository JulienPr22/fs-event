
import { GeoPoint, addDoc, collection, doc, endAt, getDoc, getDocs, limit, orderBy, query, setDoc, startAt, where } from "firebase/firestore";
import fakeData from "../../assets/fr-esr-fete-de-la-science-23.json";
import ngeohash from "ngeohash";
import { FIRESTORE_DB } from "../../../firebaseConfig";
import { distanceBetween, geohashQueryBounds } from "geofire-common";


class firestoreService {

  static fetchUser = async (userId) => {

    try {
      const docRef = doc(FIRESTORE_DB, "users", userId);
      const user = await getDoc(docRef);
      return user.data();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static fetchRouteData = async (userId, setLoading) => {
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
        items.push({ ...doc.data(), id: doc.id });
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

}


export default firestoreService;

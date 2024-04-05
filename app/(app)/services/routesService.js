
import { addDoc, collection, doc, getDoc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

/**
 * classe de service pour gérer les parcours des utilisateurs
 */
class routesService {

  static createRoute = async (userId, routeDescription, publishRoute) => {
    try {
      const routesRef = collection(FIRESTORE_DB, "routes");
      const newRouteDoc = await addDoc(routesRef, {
        creatorId: userId, description: routeDescription, published: publishRoute
      })
      const newRouteId = newRouteDoc.id;
      const newRoute = {
        id: newRouteId,
        creatorId: userId,
        description: routeDescription,
        published: publishRoute
      };

      return newRoute;
    } catch (error) {
      throw error;
    }
  }

  static getRoutes = async (setLoading) => {
    setLoading(true);
    const items = [];

    try {
      let collectionRef = collection(FIRESTORE_DB, "routes");
      collectionRef = query(
        collectionRef,
        where("published", "==", true)
      );
      const querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach((doc) => {
        const e = { id: doc.id, ...doc.data() };
        items.push(e);
      });
      setLoading(false)
      return items

    } catch (error) {
      setLoading(false)

      throw error;

    } finally {
      setLoading(false)

    }
  }

  static getRouteByUserId = async (userId) => {
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
        items.push({ ...route.data(), id: route.id });
      });

      return items[0];

    } catch (error) {

      throw error;
    }
  }


  static addEventToUserRoute = async (userId, eventId) => {

    try {
      let userRoute = await this.getRouteByUserId(userId)

      if (userRoute == null) {
        userRoute = await this.createRoute(userId, "", true)
      }

      let events = []

      if (userRoute.relatedEvents) {
        events = userRoute.relatedEvents;
      }

      const eventRef = doc(FIRESTORE_DB, "events", eventId);
      events.push(eventRef);

      const routeRef = doc(FIRESTORE_DB, "routes", userRoute.id)
      await updateDoc(routeRef, { relatedEvents: events })

    } catch (error) {
      throw error;
    }
  }

  static fetchRouteData = async (routeId, setLoading) => {
    console.log("fetchRouteData", routeId);
    setLoading(true);

    try {
      // Récupération du parcours
      const routeRef = doc(FIRESTORE_DB, "routes", routeId);
      const routeSnap = await getDoc(routeRef);
      const route = { id: routeSnap.id, ...routeSnap.data() }
      console.log("route", route);

      // Récupération du créateur du parcours
      const userRef = doc(FIRESTORE_DB, "users", route.creatorId);
      const userSnap = await getDoc(userRef);
      const user = { id: userSnap.id, ...userSnap.data() }

      // Récupération des événements associés (par référence)
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
      return ({ route: route, user: user, events: eventsData });


    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  static fetchUserRouteData = async (userId) => {
    const items = [];

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
      console.log("eventsData", eventsData);

      return ({ route: route, events: eventsData });

    } catch (error) {

      throw error;
    }
  }

  static fetchUserEventsRouteIds = async (userId) => {
    const ids = [];
    const items = [];

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

      return (eventsData);

    } catch (error) {

      throw error;
    }
  }

  static setRoutePublished = async (routeId, published) => {
    console.log("published", routeId, published);
    try {
      const docRef = doc(FIRESTORE_DB, "routes", routeId);
      await updateDoc(docRef, { published: published });

    } catch (error) {
      console.error('Erreur lors de la mise à jour du parcours :', error);
    }
  }

  static setRouteDescription = async (routeId, description) => {
    try {
      const docRef = doc(FIRESTORE_DB, "routes", routeId);
      await updateDoc(docRef, { description: description });

    } catch (error) {
      console.error('Erreur lors de la mise à jour du parcours :', error);
    }
  }
}


export default routesService;

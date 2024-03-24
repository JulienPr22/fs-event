
import { FieldValue, GeoPoint, addDoc, collection, count, doc, endAt, getDoc, getDocs, limit, orderBy, query, setDoc, startAt, updateDoc, where } from "firebase/firestore";
import fakeData from "../../assets/fr-esr-fete-de-la-science-23.json";
import ngeohash from "ngeohash";
import { FIRESTORE_DB } from "../../../firebaseConfig";
import eventService from "./eventService";

/**
 * classe de service pour gérer les parcours des utilisateurs
 */
class routesService {


  static createRoute = async (userId, routeTitle, routeDescription, publishRoute) => {
    console.log("createRoute");
    try {
      const routesRef = collection(FIRESTORE_DB, "routes");
      const newRouteDoc = await addDoc(routesRef, {
        title: routeTitle, creatorId: userId, description: routeDescription, published: publishRoute
      })
      const newRouteId = newRouteDoc.id;
      const newRoute = {
        id: newRouteId,
        title: routeTitle,
        creatorId: userId,
        description: routeDescription,
        published: publishRoute
      };

      return newRoute;
    } catch (error) {
      throw error;
    }
  }

  static fetchRoute = async (userId) => {
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
    console.log("addEventToUserRoute", userId, eventId);

    try {
      let userRoute = await this.fetchRoute(userId)

      if (userRoute == null) {
        userRoute = await this.createRoute(userId, "Nouveau parcours", "", true)
        console.log("new user Route", userRoute);
      } else {
        console.log("fetched userRoute", userRoute);
      }

      let events = []

      if (userRoute.relatedEvents) {
        events = userRoute.relatedEvents;
        console.log("current events", events);
      }

      // const event = await eventService.getEventById(eventId)
      // console.log("new event", event);
      // events.push(event)

      const eventRef = doc(FIRESTORE_DB, "events", eventId);
      const routeRef = doc(FIRESTORE_DB, "routes", userRoute.id)

      events.push(eventRef);

      await updateDoc(routeRef, { relatedEvents: events })

      const updatedRouteRef = doc(FIRESTORE_DB, "routes", userRoute.id)
      const updatedRoute = await getDoc(updatedRouteRef)


      console.log("updatedRoute", updatedRoute.data());

    } catch (error) {
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
}


export default routesService;
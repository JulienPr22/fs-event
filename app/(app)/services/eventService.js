import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

/**
 * classe de service pour gérer les évennements
 */
class eventService {

  static getEventById = async (eventId) => {

    try {
      const eventRef = doc(FIRESTORE_DB, "events", eventId);
      const eventSnap = await getDoc(eventRef);
      return eventSnap;

    } catch (error) {
      throw error;
    }
  }


}


export default eventService;

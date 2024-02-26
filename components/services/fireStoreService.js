
import { collection, doc, getDoc, getDocs, limit, query, setDoc, where } from "firebase/firestore";
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

  static doRateEvent = async (docId, rating) => {
    const docRef = doc(FIRESTORE_DB, "events", docId);
    dataToFetch = await getDoc(docRef);
    const event = dataToFetch.data().event

    setDoc(docRef,  {
      rating: (event.rating * event.votes + rating) / (event.votes + 1),
      votes: event.votes + 1
    })

  }

  randomNumber = (min, max, dec) => {
    const nombreAleatoire = Math.random() * (max - min) + min;
    return parseFloat(nombreAleatoire.toFixed(dec));
  }

  static exportData = async () => {
    const updatedData = fakeData.map(item => {
      return {
        ...item,
        "rating": randomNumber(2.8325, 5, 4),
        "votes": randomNumber(48, 250, 0),
        "filling": 0
      };
    });

    updatedData.map(event => {
      console.log(`rating: ${event.rating} / votes:  ${event.votes}`)
      try {
        addDoc(collection(FIRESTORE_DB, 'events'), { event })
        console.log("ok");
      } catch (error) {
        console.error('Erreur lors de l\'exportation des données :', error);
      }
    });
  }

}


export default firestoreService;

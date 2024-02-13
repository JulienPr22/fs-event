import { useState, useEffect } from "react";
import { addDoc, collection, doc, getDoc, getDocs, limit, query } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import fakeData from "../assets/fr-esr-fete-de-la-science-23.json"

const useFetch = (collectionName, queryOptions ) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let dataToFetch;
      if (queryOptions.docId) {
        // Fetching a single document
        const docRef = doc(FIRESTORE_DB, collectionName, queryOptions.docId);
        dataToFetch = await getDoc(docRef);
        setData(dataToFetch.data().event);
      } else {
        // Fetching multiple documents
        const items = [];
        let collectionRef = collection(FIRESTORE_DB, collectionName);
        if (queryOptions.limit) {
          collectionRef = query(collectionRef, limit(queryOptions.limit));
        }
        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data().event });
        });
        setData(items);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};


const exportData = async () => {
  const updatedData = data.map(item => {
    return {
      ...item,
      "rating": 0,
      "votes": 0
    };

  });

  updatedData.map(event => {
    try {
      addDoc(collection(FIRESTORE_DB, 'events'), { event })
      console.log("ok");
    } catch (error) {
      console.error('Erreur lors de l\'exportation des données :', error);
    }
  });
}

const importData = async () => {
  const querySnapshot = await getDocs(collection(FIRESTORE_DB, "events"));

  querySnapshot.forEach((doc) => {
    events.push(doc.data());
  });

  console.log(events[0]);
  console.log(events.length);
};

const fetchFakeData = async () => {
  const updatedData = fakeData.map(item => {
    return {
      ...item,
      "rating": 0,
      "votes": 0
    };
  });

  updatedData.forEach((obj) => {
    events.push(obj);
  });

  setData(events);
}

export default useFetch;

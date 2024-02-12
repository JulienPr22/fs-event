import { useState, useEffect } from "react";
import { addDoc, collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import fakeData from "../assets/fr-esr-fete-de-la-science-23.json"

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const events = [];

  const fetchFakeData = async() => {
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

  const fetchData = async () => {
    setIsLoading(true);

    try {
      /*   let eventsRef = collection(FIRESTORE_DB, "events");
        const q = query(eventsRef, limit(10));
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
          const obj = (doc.data())
          events.push(obj.event);
        });

        setData(events); */

      fetchFakeData()
      setIsLoading(false);

    } catch (error) {
      setError(error);
      console.log(error)

    } finally {
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
}

export default useFetch;

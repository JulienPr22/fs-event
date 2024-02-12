import { useState, useEffect } from "react";
import { addDoc, collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const events = [];

  const fetchData = async () => {
    setIsLoading(true);


    try {
      let eventsRef = collection(FIRESTORE_DB, "events");
      const q = query(eventsRef, limit(10));
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        const obj = (doc.data())
        events.push(obj.event);
      });

      setData(events);
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

export default useFetch;

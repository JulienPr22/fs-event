import React, { createContext, useEffect, useState } from 'react';
import userService from './services/userService';
import { useSession } from '../ctx';
import * as Location from 'expo-location';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { session } = useSession()
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await userService.fetchUser(session);

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg("L'autorisation d'accéder à la position a été refusée");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setUser({ ...userData, location });

        console.log("user data", { ...userData, location });
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [liked, setLiked] = useState(false);
  const [request, setRequest] = useState(false);
  const [messageAlert, setMessageAlert] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);
  const [storyLoader, setStoryLoader] = useState(null);

  useEffect(() => {
    async function fetchStoredValues() {
      try {
        const [storedToken, storedId] = await Promise.all([
          AsyncStorage.getItem('userToken'),
          AsyncStorage.getItem('userUniqueId1'),
        ]);

        if (storedToken !== null) {
          setToken(JSON.parse(storedToken));
        }

        if (storedId !== null) {
          setUniqueId(JSON.parse(storedId));
        }
      } catch (error) {
        console.log('Error retrieving data from AsyncStorage:', error);
      }
    }

    fetchStoredValues();
  }, []);

  useEffect(() => {
    async function saveValuesToStorage() {
      try {
        await AsyncStorage.setItem('userToken', JSON.stringify(token));
        await AsyncStorage.setItem('userUniqueId1', JSON.stringify(uniqueId));
      } catch (error) {
        console.log('Error saving data to AsyncStorage:', error);
      }
    }

    saveValuesToStorage();
  }, [token, uniqueId]);

  const contextValues = useMemo(
    () => ({
      token,
      setToken,
      liked,
      setLiked,
      request,
      setRequest,
      uniqueId,
      setUniqueId,
      messageAlert,
      setMessageAlert,
      storyLoader,
      setStoryLoader,
    }),
    [
      token,
      setToken,
      liked,
      setLiked,
      request,
      setRequest,
      uniqueId,
      setUniqueId,
      messageAlert,
      setMessageAlert,
      storyLoader,
      setStoryLoader,
    ],
  );

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

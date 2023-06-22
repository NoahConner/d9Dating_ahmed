import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import Loader from '../Components/Loader';
export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [liked, setLiked] = useState(false);
  const [request, setRequest] = useState(false);
  const [messageAlert, setMessageAlert] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);
  const [storyLoader, setStoryLoader] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // async function saveValuesToStorage() {
    //   try {
    //     await AsyncStorage.setItem('userToken', JSON.stringify(token));
    //     await AsyncStorage.setItem('userUniqueId1', JSON.stringify(uniqueId));
    //   } catch (error) {
    //     console.log('Error saving data to AsyncStorage:', error);
    //   }
    // }
    // saveValuesToStorage();
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
      userData,
      setUserData,
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
      userData,
      setUserData,
    ],
  );

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

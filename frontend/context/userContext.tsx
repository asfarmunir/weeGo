import { useContext, createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const userContext = createContext({
  user: null,
  setUser: (user: any) => {},
  loading: true,
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {},
  setLoading: (loading: boolean) => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    return token || null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        await axios
          .post("http://192.168.100.23:3000/auth", {
            token,
          })
          .then((res) => {
            setUser(res.data);
            setIsLoggedIn(true);
          })
          .catch((err) => {
            console.log(err.response.data);
            setIsLoggedIn(false);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    };
    fetchData();
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        loading,
        isLoggedIn,
        setIsLoggedIn,
        setLoading,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};

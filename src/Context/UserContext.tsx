import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { User } from "../types/types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

type Context = {
  user: User | null;
  isLoading: boolean;
};

const defaultValue: Context = {
  user: null,
  isLoading: true,
};

const UserContext = createContext<Context>(defaultValue);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

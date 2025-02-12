import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { User } from "../types/types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const UserContext = createContext<{ user: User | null }>({user: null});

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => setUser(currUser));

    return () => unsubscribe();
  }, []);
  
  return (
    <UserContext.Provider value={{user}}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider };
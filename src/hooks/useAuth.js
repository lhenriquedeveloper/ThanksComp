import { useState, useEffect } from 'react';
import firebase from '../services/firebaseConnection';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unSubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => setCurrentUser(user));
    return unSubscribe;
  }, []);
  return currentUser;
}

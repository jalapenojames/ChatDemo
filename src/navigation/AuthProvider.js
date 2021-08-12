import React, { createContext, useState } from 'react';
// import auth from '@react-native-firebase/auth';
import Firebase from '../../firebaseConfig';


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
        //   login: async (email, password) => {
        //     try {
        //       await auth().signInWithEmailAndPassword(email, password);
        //     } catch (e) {
        //       console.log(e);
        //     }
        //   },
          register: async (email, password) => {
            try {
        //   await auth().createUserWithEmailAndPassword(email, password);
                const auth = Firebase.auth()
                await auth.createUserWithEmailAndPassword(email, password);
                const fireStore = Firebase.firestore()
                await fireStore.collection('Users').add({name:"abc"});
        } catch (e) {
              console.log(e);
            }
          },
        //   logout: async () => {
        //     try {
        //       await auth().signOut();
        //     } catch (e) {
        //       console.error(e);
        //     }
        //   }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
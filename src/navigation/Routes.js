import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import Loading from '../components/Loading';
import { AuthContext } from './AuthProvider';
import Firebase from '../../firebaseConfig';


export default function Routes() {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
        setLoading(false);
    }

    useEffect(() => {
        const auth = Firebase.auth()
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (loading) {
        return <Loading />;
    }

  return (
    <NavigationContainer>
        {user ? <HomeStack /> : <AuthStack />} 
    </NavigationContainer>
  );
}
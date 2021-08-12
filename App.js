import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Firebase from './firebaseConfig';
// import { AuthProvider } from './src/navigation/AuthProvider'

// adding ChatApp
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Routes from './src/navigation/Routes';
import { AuthProvider } from './src/navigation/AuthProvider';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
    accent: 'yellow',
  },
};

export default function App() {

const register = async () => {
  console.log("register");
//   const auth = Firebase.auth()
//  await auth.createUserWithEmailAndPassword("abc@gmail.com", "abc1234");
const fireStore = Firebase.firestore()
await fireStore.collection('Users').add({name:"abc"});
  
}


  return (
    // // This code is registered, come back here to test firestore
    //       <View style={styles.container}>
    //         <Text>Open up App.js to start working on your app!</Text>
    //         <StatusBar style="auto" />
    //         <Button onPress={register} title="Register"></Button>
    //       </View>
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Routes />  
      </AuthProvider>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { IconButton, Title } from 'react-native-paper';
import FormInput from '../components/FormInput';

import Firebase from '../../firebaseConfig';

export default function AddRoomScreen({ navigation }) {
    const [roomName, setRoomName] = useState('');
    // ... Firestore query will come here later

    const handleButtonPress = () => {
        if (roomName.length > 0) {
            Firebase.firestore()
              .collection('THREADS')
              .add({
                name: roomName,
                latestMessage: {
                    text: `You have joined room ${roomName}.`,
                    createdAt: new Date().getTime()
                  }
              })
              .then(docRef => {
                docRef.collection('MESSAGES').add({
                  text: `You have joined the room ${roomName}.`,
                  createdAt: new Date().getTime(),
                  system: true
                });
                navigation.navigate('Home');
              });
          }        
    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.closeButtonContainer}>
            <IconButton
                icon="close-circle"
                size={36}
                color="#6646ee"
                onPress={() => navigation.goBack()}
            />
            </View>
            <View style={styles.innerContainer}>
            <Title style={styles.title}>Create a new chat room</Title>
            <FormInput
                labelName="Room Name"
                value={roomName}
                onChangeText={text => setRoomName(text)}
                clearButtonMode="while-editing"
            />
            <FormButton
                title="Create"
                modeValue="contained"
                labelStyle={styles.buttonLabel}
                onPress={() => handleButtonPress()}
                disabled={roomName.length === 0}
            />
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1
    },
    closeButtonContainer: {
      position: 'absolute',
      top: 30,
      right: 0,
      zIndex: 1
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: 24,
      marginBottom: 10
    },
    buttonLabel: {
      fontSize: 22
    }
  });

{/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Create a new chat room</Text>
    <FormButton
    mode="contained"
    title="Close Modal"
    onPress={() => navigation.goBack()}
    />
</View> */}
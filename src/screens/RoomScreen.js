import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import Firebase from '../../firebaseConfig'

import { AuthContext } from '../navigation/AuthProvider'

export default function RoomScreen({ route }) {
    const { user } = useContext(AuthContext);
    const currentUser = user.toJSON();

    const { thread } = route.params;

    const [messages, setMessages] = useState();

    // helper method that sends a message
    async function handleSend(messages) {
        const text = messages[0].text;
      
        Firebase.firestore()
            .collection('THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: currentUser.uid,
                    email: currentUser.email
                }
            });

        await Firebase.firestore()
            .collection('THREADS')
            .doc(thread._id)
            .set(
                {
                    latestMessage: {
                    text,
                    createdAt: new Date().getTime()
                    }
                },
                { merge: true }
            );
    }

    useEffect(() => {
        const messagesListener = Firebase.firestore()
          .collection('THREADS')
          .doc(thread._id)
          .collection('MESSAGES')
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            const messages = querySnapshot.docs.map(doc => {
              const firebaseData = doc.data();
    
              const data = {
                _id: doc.id,
                text: '',
                createdAt: new Date().getTime(),
                ...firebaseData
              };
    
              if (!firebaseData.system) {
                data.user = {
                  ...firebaseData.user,
                  name: firebaseData.user.email
                };
              }
    
              return data;
            });
    
            setMessages(messages);
          });
    
        return () => messagesListener();
      }, []);

    function renderSystemMessage(props) {
    return (
        <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
        />
    );
    }

    const renderBubble = (props) => {
        return (
        <Bubble
            {...props}
            wrapperStyle={{
            right: {
                // Here is the color change
                backgroundColor: '#6646ee'
            }
            }}
            textStyle={{
            right: {
                color: '#fff'
            }
            }}
        />
        );
    }

    function renderSend(props) {
        return (
        <Send {...props}>
            <View style={styles.sendingContainer}>
            <IconButton icon="send-circle" size={32} color="#6646ee" />
            </View>
        </Send>
        );
    }

    function renderLoading() {
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6646ee" />
        </View>
        );
    }

    function scrollToBottomComponent() {
        return (
        <View style={styles.bottomComponentContainer}>
            <IconButton icon="chevron-double-down" size={36} color="#6646ee" />
        </View>
        );
    }

    useEffect(() => {
        console.log({ user });
      }, []);

    return (
        <GiftedChat
        messages={messages}
        onSend={newMessage => handleSend(newMessage)}
        user={{ _id: currentUser.uid }}
        renderBubble={renderBubble}
        placeholder="Type your message here..."
        showUserAvatar
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderLoading={renderLoading}
        renderSystemMessage={renderSystemMessage}
        />
    );
}

const styles = StyleSheet.create({
    sendingContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    systemMessageText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#6646ee'
    }
  });
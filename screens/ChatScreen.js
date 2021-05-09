import React, { useLayoutEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import firebase from "firebase/app";
import { db, auth } from "../firebase";
const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "chat",
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            color: "white",
          }}
        >
          <Avatar
            rounded
            source={{
              uri: message[0]?.data.photoURL,
            }}
          />
          <Text>{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, message]);
  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };
const  deleteMessage = async (id) =>{

const FieldValue = firebase.firestore.FieldValue;

// Create a document reference
const cityRef = db.collection("chats").doc(route.params.id).collection("messages").doc(id);

// Remove the 'capital' field from the document
const res = await cityRef.update({
      timestamp: FieldValue.delete(),
      message: FieldValue.delete(),
      displayName: FieldValue.delete(),
      email: FieldValue.delete(),
      photoURL: FieldValue.delete(),
});
  }
  useLayoutEffect(() => {
    const unsubscribe = db
    .collection('chats')
    .doc(route.params.id)
    .collection("messages")
    .orderBy("timestamp", "asc")
    .onSnapshot((snapshot) => 
    setMessage(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    );
    return unsubscribe;
  }, [route])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.os === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {/* chat message */}
              {message.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                   
                    <Avatar
                      position="absolute"
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5,
                      }}
                      rounded
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                     <TouchableOpacity onLongPress={()=>deleteMessage(id)} activeOpacity={0.5} >
                    <Text style={styles.recieverText}>{data.message}</Text>
                    <Text style={styles.recieverName}>{data.displayName}</Text>
                
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      position="absolute"
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5,
                      }}
                      rounded
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    
                       <Text style={styles.senderText}>{data.message}</Text>
                      <Text style={styles.senderName}> {data.displayName}</Text>
                   
                   
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onSubmitEditing={sendMessage}
                onChangeText={(text) => setInput(text)}
                placeholder="Signal Message"
                styles={styles.textInput}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" color="#2968E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom:20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    marginLeft: 10,
    fontWeight: "500",
    color: "white",
    marginBottom: 15,
  },
  recieverText: {
    fontWeight: "500",
    color: "black",
    marginBottom: 15,
  },
  senderName: {
    left: 18,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    borderWidth:1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});

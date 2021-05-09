import { ListItem , Avatar} from "react-native-elements";
import React,{useEffect, useState}from "react";
import { StyleSheet, Text, View } from "react-native";
import ReactDOM from 'react-dom';
import { db } from '../firebase'
const CustomListItem = ({id,chatName,enterChat}) => {
  const [chatMessage, setChatMessage] = useState([]);
  useEffect(() =>{
    const unsubscribe= db
    .collection("chats")
    .doc(id)
    .collection("messages")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => 
     setChatMessage(snapshot.docs.map((doc) => doc.data))
     );
     return unsubscribe;
    }, []);
  return (
    <ListItem key={id} bottomDivider key={id} onPress={()=>enterChat(id, chatName)} >
      <Avatar
        rounded
        source={{
          uri:
          chatMessage?.[0]?.photoURL ||
            "https://www.parlerdamour.fr/wp-content/uploads/2020/04/image-damour-1.png",
        }}
      />
      <ListItem.Content>
          <ListItem.Title style={{fontWeight:"800"}}>
              {chatName}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {chatMessage?.[0]?.displayName}
          </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});

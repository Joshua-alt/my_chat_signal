
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements';
import { db } from '../firebase';


const AddChatScreen = ({navigation}) => {
    const [input, setInput]= useState("");
    const createChat = async() =>{
        await db.collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack();
        })
        .catch((error)=> alert(error));
    }
    useLayoutEffect(()=>{
          navigation.setOptions({
              title: "Add a new Chat",
              headerBackTitle:"Chats",
          });
    }, [navigation]);
    return (
        <View style={styles.container}>
          <Input
           placeholder="Enter a chat name"
           value={input}
           onChangeText={(text)=> setInput(text)}
           onSubmitEditing={createChat}
           leftIcon={
               <Icon name="wechat" type="antdesign" size={24} color="black"/>
           }
           />
           <Button disabled={!input} onPress={createChat} title="create new chat"/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{

    },
})

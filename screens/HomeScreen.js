import React, {useEffect, useLayoutEffect, useState} from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import CustomListItem from '../component/CustomListItem'
import { auth, db } from '../firebase'


const HomeScreen = ({navigation}) => {
    const [chat, setChat] = useState([]);
    const signOutUser = () =>{
        auth.signOut().then(()=>{
            navigation.replace("Login");
        })
    }
    useEffect(()=>{
        const unsubscribe= db.collection('chats').onSnapshot((snapshop) =>
            setChat(snapshop.docs.map(doc=>({
                id: doc.id,
                data: doc.data()
            }))
          )
        );
        return unsubscribe;
    }, [])
    useLayoutEffect(() => {
        navigation.setOptions({
            title: auth?.currentUser?.displayName,
            headerStyle:{backgroundColor:'#fff'},
            headerTitleStyle:{color:'black'},
            headerTintColor:"black",
            headerLeft: () => (
                <View style={{marginLeft:20}}>
                    <TouchableOpacity onPress={signOutUser}>
                      <Avatar rounded source={{uri:auth?.currentUser?.photoURL}}/>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{flexDirection: "row",
                justifyContent:"space-around",
                width:80,
                marginRight:20,}}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=> navigation.navigate("AddChat")} activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation])
    const enterChat = (id, chatName) => {
        navigation.navigate("Chat",{
            id: id,
            chatName: chatName,
        })
    }
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    chat.map(({id, data: {chatName}}) =>(
                        <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                    ))
                }
               
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height: "100%",
    }
})

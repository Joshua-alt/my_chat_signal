import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
 import { Button, Input, Image } from "react-native-elements";
const LoginScreen = ({navigation}) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const signIn = () =>{
       auth.signInWithEmailAndPassword(email, password)
       .catch((error) => alert(error));
   };

   useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
         navigation.replace("Home")
         console.log(authUser);
      }
    });
    return unsubscribe;
   }, [])
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="Light" />
      <Image source= {{
          uri: 'https://logos-download.com/wp-content/uploads/2020/06/Signal_Logo.png',
      }}
      style={{width:200, height:200}}/>
      <View style={styles.inputContainer}>
          <Input placeholder="Email"
           autoFocus type="email"
            onChangeText={(text) => setEmail(text)} 
            value={email}/>
          <Input placeholder="Email"
           autoFocus type="password"
           onChangeText={(text) => setPassword(text)} 
           onSubmitEditing={signIn}
            value={password}/>
            <Button containerStyle={styles.Button} onPress={signIn} title="login"/>
            <Button containerStyle={styles.Button} type="outline" onPress={() => navigation.navigate("Register")} title="Register"/>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems:"center",
      justifyContent: "center",
      padding: 10,
      backgroundColor:"white"

    },
    inputContainer: {
        width: 300,
    },
    Button: {
        width: 200,
        marginTop: 10,
        marginLeft:42,
    },
});

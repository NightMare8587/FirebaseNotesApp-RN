import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as SecureStore from 'expo-secure-store'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
const firebaseConfig = {
    apiKey: "AIzaSyAGKPfPIU8GRb3sdm1japx7QaYHLBzHMhw",
    authDomain: "notesapp-rn.firebaseapp.com",
    projectId: "notesapp-rn",
    storageBucket: "notesapp-rn.firebasestorage.app",
    messagingSenderId: "432933602327",
    appId: "1:432933602327:web:4c3dac73d6370bd19e4852",
    measurementId: "G-B7Z8R86K2B"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default function index() {
    const router = useExpoRouter();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState(false);

    if(error) {
        alert('Something went wrong. Try Again Later');
    }
    const loginPressed = async () => {
        setError(false);
        try {
            const result = await signInWithEmailAndPassword(auth,email,password);
            const user = result.user
            
            if(user != null) {
                await SecureStore.setItemAsync("uid", user.uid);
                router.push("../(notes)");
            }
        } catch(e) {
            console.log(e);
            try{
            const createAccount = await createUserWithEmailAndPassword(auth,email,password);
            const credentials = createAccount.user;
            if(credentials != null) {
                await SecureStore.setItemAsync("uid", credentials.uid); 
                router.push("../(notes)");
            }
            } catch(e) {
                console.log(e);
                setError(true);
            }
        }
    }
  return (
    <View style= {styles.container}>
      <Text style = {styles.appName}>Notes App</Text>
      <TextInput
      style={styles.inputStyle}
      value={email}
      placeholder='Enter your email'
      onChangeText={setEmail}/>
      <TextInput
      style={styles.inputStyle}
      value={password}
      placeholder='Enter your password'
      onChangeText={setPassword}/>

      <TouchableOpacity style={styles.buttonStyle} onPress={loginPressed}>
            <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5b7ab',
        flex: 1
    },
    appName: {
        fontSize: 35,
        color: 'black',
        fontWeight: 600,
        textAlign:'center',
        marginTop: 100
    },
    inputStyle: {
        marginHorizontal: 10,
        width: 'auto',
        height: 50,
        backgroundColor: '#f2eeed',
        borderRadius: 12,
        fontSize: 15,
        paddingStart: 10,
        marginVertical: 12,
        borderColor: 'black',
        borderWidth: 1
    },
    buttonStyle: {
        backgroundColor: 'blue',
        height: 50,
        width: 120,
        borderRadius: 30,
        marginHorizontal: 'auto',
        marginVertical: 30
    },
    buttonText: {
        textAlign: 'center',
        marginVertical: 'auto',
        color: 'white',
        fontSize: 18
    }
})
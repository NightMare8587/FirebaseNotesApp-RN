import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as SecureStore from 'expo-secure-store'
import { getFirestore } from "firebase/firestore";
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import { router } from 'expo-router';
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
const db = getFirestore(app);
const auth = getAuth(app);
import { collection, doc, setDoc } from "firebase/firestore";
export default function createNotes() {
    const router = useExpoRouter();
    const [userUID, setUserUID] = useState("");
    const loadUID = async () => {
      const uid = await SecureStore.getItemAsync("uid");
      if(uid != null ) setUserUID(uid)
    }
  
    loadUID()
    const[note, setNote] = useState("");
    const createNotes = async () => {
        if(note == "") {
            return;
        }
        try{
        const timeMillis = Date.now();
        const userData = {
            "note": note
        }
        const userRef = doc(db, "users", userUID, "notes", timeMillis.toString());
        const result = await setDoc(userRef, userData);

        if(router.canGoBack())
            router.goBack();
    } catch(e) {
        alert("Error creating notes");
    }
    }
  return (
    <View style={createStyle.container}>
      <TextInput
      multiline
      style={createStyle.inputStyle}
      value={note}
      maxLength={100}
      onChangeText={setNote}/>

      <TouchableOpacity style={createStyle.createButton} onPress={createNotes}>
            <Text style={createStyle.buttonText}>Add Note</Text>
      </TouchableOpacity>
    </View>
  )
}

const createStyle = StyleSheet.create({
    container: {
        backgroundColor: '#cacaca',
        justifyContent: 'center',
        marginVertical: 'auto',
        flex: 1,
        alignContent: 'center'
    },
    inputStyle: {
        marginHorizontal: 10,
        width: 'auto',
        height: 'auto',
        backgroundColor: '#f2eeed',
        borderRadius: 12,
        fontSize: 15,
        paddingStart: 10,
        marginVertical: 12,
        borderColor: 'black',
        borderWidth: 1
    },
    createButton: {
        marginHorizontal: 'auto',
        borderRadius: 20,
        backgroundColor: 'green',
        height: 40,
        width: 120
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 'auto'
    }
})
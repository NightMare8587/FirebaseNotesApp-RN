import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as SecureStore from 'expo-secure-store'
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
import { useIsFocused } from '@react-navigation/native';
import { collection, doc, getDocs, getFirestore } from 'firebase/firestore';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export default function indes() {
  const router = useExpoRouter();
  const isFocused = useIsFocused();
  const [notes, setNotes] = useState([]);
  const [userUID, setUserUID] = useState("");
  const loadUID = async () => {
    const uid = await SecureStore.getItemAsync("uid");
    if(uid != null ) setUserUID(uid)
  }

  loadUID()

  const nextScreen = () => {
    router.push("createNotes")
  }
  useEffect(() => {
    const fetchNotes = async () => {
      const ref = collection(db, "users", userUID, "notes");

      const result = await getDocs(ref);

      setNotes([]);
      const notesList = [];
      result.forEach((doc) => {
          console.log(doc.data)
      })
    }
    fetchNotes(); 
  },[useIsFocused]);
  if(userUID == null || userUID == "") {return;}
  return (
    <View style={loginStyles.container}>
      <TouchableOpacity style={loginStyles.fab} onPress={nextScreen}>
        <Image
        style={loginStyles.imgStyle}
        source={require("../../assets/images/add.png")}/>
      </TouchableOpacity>
    </View>
  )
}

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cacaca'
  },
  cardContainer: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    width: 'auto'
  },
  fab: {
    zIndex: 2,
    borderRadius: 100,
    backgroundColor: 'blue',
    height: 55,
    width: 55,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 40,
    right: 25
  },
  imgStyle: {
    justifyContent: 'center',
    marginHorizontal: 'auto',
    marginVertical: 'auto'
  }
})
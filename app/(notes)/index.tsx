import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as SecureStore from 'expo-secure-store'
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
export default function indes() {
  const [userUID, setUserUID] = useState("");
  const loadUID = async () => {
    const uid = await SecureStore.getItemAsync("uid");
    if(uid != null ) setUserUID(uid)
  }

  loadUID()

  if(userUID == null || userUID == "") return;
  return (
    <View>
      <Text>Welcome</Text>
    </View>
  )
}
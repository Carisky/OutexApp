import React from "react";
import { View, Image } from "react-native";
import {
  Button,
  Text,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import GoBack from "../components/GoBack";
const SettingsPage = ({ navigation }) => {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <SafeAreaView style={{display:"flex",height:"100%"}}>
      <View style={{display:"flex",height:"100%"}}>
        <GoBack navigation={navigation}></GoBack>
        <Text>Settings</Text>
      </View>
    </SafeAreaView>
  );
};


export default SettingsPage;

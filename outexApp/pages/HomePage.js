import React from "react";
import { View, Image } from "react-native";
import {
  Button,
  Text,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { decode } from "base-64";
import { StyleSheet } from "react-native";
import NavMenu from "../components/NavMenu";
import PageSettingsLayout from "./PageSettigsLayout/PageSettigsLayout";

const HomePage = ({ navigation }) => {
  const user = useSelector((state) => state.userReducer.user);

  const decodedImage = decode(user.profileImage);

  return (
    <SafeAreaView style={{display:"flex",height:"100%"}}>
      <PageSettingsLayout navigation={navigation}>
      <View style={styles.main}>
        <View style={{flexGrow:1}}>
        {decodedImage && (
          <Image
            source={{ uri: decodedImage }}
            style={{
              marginVertical: 20,
              marginLeft: "auto",
              marginRight: "auto",
              width: 200,
              height: 200,
              borderRadius:100
            }}
          />
        )}
        <Text style={styles.text}>{`@${user.username}`}</Text>
        <Text style={styles.text}>{user.description}</Text>
        <Button
          onPress={() => {
            navigation.navigate("ChangeUserData");
          }}
        >
          Change
        </Button>
        </View>
        <NavMenu navigation={navigation}></NavMenu>
      </View>
      </PageSettingsLayout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 20,
  },
  main:{
    display:"flex",
    flexDirection:"column",
    flex: 1,
  flexDirection: "column",
  },
});

export default HomePage;

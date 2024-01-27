import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Training = ({ repeat }) => {
  return (
    <SafeAreaView>
      <Text>{repeat.exercise.name}</Text>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  video: {
    width: 300,
    height: 200,
  },
});

export default Training;
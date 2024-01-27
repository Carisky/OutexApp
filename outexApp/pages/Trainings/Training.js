import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "react-native-video";
const Training = ({ repeat }) => {
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 20 }}>{repeat.exercise.name}</Text>
      <Video
        source={{ uri: repeat.exercise.video_url }}
        style={styles.video}
        controls={true}
      />
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

import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video, ResizeMode } from "expo-av";

const Training = ({ repeat }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <SafeAreaView>
      <View>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: repeat && repeat.exercise.video_url,
          }}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <View>
          <Button
          style={{
            margin:10
          }}
            mode="elevated"
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          >
            {status.isPlaying ? "Pause" : "Play"}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  video: {
    aspectRatio: 16 / 9,
  },
});

export default Training;

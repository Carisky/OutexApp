import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button,ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video, ResizeMode } from "expo-av";

const Training = ({ repeat, setProgress,workoutProgress, workoutSize }) => {



  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [watchedTime, setTime] = React.useState(0);
    useEffect(() => {
    const onPlaybackStatusUpdate = (newStatus) => {
      if (newStatus.isPlaying) {
        // Отслеживаем просмотренное время только при воспроизведении
        setTime(newStatus.positionMillis / 1000); // Преобразуем в секунды
      }
      // Другие действия по обновлению статуса воспроизведения
      setStatus(newStatus);
    };

    video.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    return () => {
      // Очистка события при размонтировании компонента
      video.current.setOnPlaybackStatusUpdate(null);
    };
  }, []);

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
          <Text>{watchedTime}</Text>
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

import React, { useState } from "react";
import { StyleSheet } from "react-native";
import GoBack from "../../components/GoBack";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import NavMenu from "../../components/NavMenu";
import Training from "./Training";
import { Button, Text, ProgressBar } from "react-native-paper";
import { View } from "react-native";

const TrainingsPage = ({ route, navigation }) => {
  const { repeats } = route.params;
  const [repeatIndex, setIndex] = useState(0);
  const [workoutProgress, setProgress] = React.useState(0);
  const goToPrev = () => {
    if (repeatIndex != 0) {
      setIndex(repeatIndex - 1);
    }
  };

  const goToNext = () => {
    if (repeatIndex != repeats.length - 1) {
      setIndex(repeatIndex + 1);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <GoBack navigation={navigation} />
      <Training
        repeat={repeats[repeatIndex]}
        setProgress={setProgress}
        workoutProgress={workoutProgress}
        workoutSize={repeats.length}
      />

      <View style={styles.progress}>
        <Text>Workout Progress</Text>
        <ProgressBar progress={workoutProgress} />
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained-tonal" style={styles.button} onPress={goToPrev}>
          Back
        </Button>
        <Button mode="contained-tonal" style={styles.button} onPress={goToNext}>
          Next
        </Button>
      </View>

      <NavMenu navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  button: {
    width: "45%",
    margin: 10,
  },
  progress: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default connect(null)(TrainingsPage);

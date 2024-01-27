import React, { useState } from "react";
import { StyleSheet } from "react-native";
import GoBack from "../../components/GoBack";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import NavMenu from "../../components/NavMenu";
import Training from "./Training";
import { Button } from "react-native-paper";
import { View } from "react-native";

const TrainingsPage = ({ route, navigation }) => {
  const { repeats } = route.params;
  const [repeatIndex, setIndex] = useState(0);

  const goToPrev = () => {
    if (repeatIndex!=0) {
        setIndex(repeatIndex - 1);
    }
  };

  const goToNext = () => {
    if (repeatIndex!=repeats.length-1) {
        setIndex(repeatIndex + 1);
    }

  };
  return (
    <SafeAreaView style={styles.container}>
      <GoBack navigation={navigation} />
      <Training repeat={repeats[repeatIndex]} />

      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={goToPrev}>
          Back
        </Button>
        <Button style={styles.button} onPress={goToNext}>
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
    display: "flex",
    flexDirection: "row",
  },
  button: {
    width: "50%",
  },
});

export default connect(null)(TrainingsPage);

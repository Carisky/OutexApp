// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import GoBack from "../../components/GoBack";
import APIhendler from "../../api/APIhendler";
import NavMenu from "../../components/NavMenu";

const WorkoutDetailsPage = ({ route, navigation }) => {
  // Extract the workoutId from the route params
  const { workoutId } = route.params;
  const [workoutInfo, setWorkoutInfo] = useState();
  useEffect(() => {
    async function fetchData() {
      const data = await APIhendler.getWorkoutWithExsercises(workoutId);
      setWorkoutInfo(data);
    }
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <GoBack navigation={navigation} />
      <Card
        mode="outlined"
        style={{
          margin: "10px",
        }}
      >
        <Card.Cover source={{ uri: workoutInfo && workoutInfo.image_url }} />
        <Card.Title title={workoutInfo && workoutInfo.description} />

        <Card.Content>
          <Text variant="bodyMedium">{workoutInfo && workoutInfo.info}</Text>
        </Card.Content>
      </Card>
      <Button
        onPress={() => {
          navigation.navigate("TrainingsPage", {
            repeats: workoutInfo && workoutInfo.repeats,
          });
        }}
      >
        Workouts
      </Button>
      <NavMenu navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    flex: 1,
  },
});

export default WorkoutDetailsPage;

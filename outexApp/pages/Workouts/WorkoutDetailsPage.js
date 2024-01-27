// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, Card } from "react-native-paper";
import GoBack from "../../components/GoBack";
import APIhendler from "../../api/APIhendler";

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
    <View>
      <GoBack navigation={navigation} />
      <Card mode='outlined' style={{
        margin:"10px"
      }}>
        <Card.Cover source={{ uri: workoutInfo && workoutInfo.image_url }} />
        <Card.Title title={workoutInfo && workoutInfo.description} />

        <Card.Content>
          <Text variant="bodyMedium">{workoutInfo && workoutInfo.info}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default WorkoutDetailsPage;

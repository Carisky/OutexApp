// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import GoBack from "../../components/GoBack";
import APIhendler from "../../api/APIhendler";

const WorkoutDetailsPage = ({ route, navigation }) => {
  // Extract the workoutId from the route params
  const { workoutId } = route.params;
  const [workoutInfo,setWorkoutInfo] = useState()
  useEffect( () => {
    async function fetchData(){
      const data = await APIhendler.getWorkoutWithExsercises(workoutId)
      setWorkoutInfo(data)
    }
    fetchData()
  }, []);
  return (
    <View>
      <GoBack navigation={navigation}/>
      <Text>Workout Details Page for Workout ID: {workoutId}</Text>
      {workoutInfo && <Text>Info: {workoutInfo.info}</Text>}
    </View>
  );
};

export default WorkoutDetailsPage;

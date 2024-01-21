// Import necessary dependencies
import React from "react";
import { View, Text } from "react-native";
import GoBack from "../../components/GoBack";

const WorkoutDetailsPage = ({ route, navigation }) => {
  // Extract the workoutId from the route params
  const { workoutId } = route.params;
  
  return (
    <View>
      <GoBack navigation={navigation}/>
      <Text>Workout Details Page for Workout ID: {workoutId}</Text>
      {/* Add your workout details rendering logic here */}
    </View>
  );
};

export default WorkoutDetailsPage;

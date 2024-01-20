import React from "react";
import { View, Text } from "react-native";

const WorkoutDetailsPage = ({ route }) => {
  // Extract the workout details from the navigation route
  const { workout } = route.params;

  return (
    <View>
      <Text>Workout Details Page</Text>
      <Text>Title: {workout.title}</Text>
      {/* Add more details as needed */}
    </View>
  );
};

export default WorkoutDetailsPage;

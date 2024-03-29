import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavMenu from "../../components/NavMenu";
import APIhendler from "../../api/APIhendler";
import WorkoutPreview from "./WorkoutPreview";

const WorkoutsPage = ({ navigation }) => {

  const [workouts,setWorkouts] = useState([]);
  
  useEffect(() => {

    async function fetchData(){
      const workouts = await APIhendler.getWorkouts()
      setWorkouts(workouts);
    }

    fetchData();
  }, []);

  return (
      <SafeAreaView style={styles.container}>
      <FlatList
          style={styles.list}
          data={workouts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <WorkoutPreview Workout={item} />}
          contentContainerStyle={styles.flatListContainer}
          numColumns={2}
        />
        <NavMenu navigation={navigation} />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight:'100%',
    flex: 1,
  },
  view:{
    minHeight:'100%',
  },
  workoutItem: {
    marginBottom: 20,
  },
  list:{
    marginTop: 20, 
    marginBottom: 80, 
  },
workoutImage: {
  height: 200,
  width: 200,
  borderRadius: 10,
},
  workoutTitle: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
  },
});

export default connect(null)(WorkoutsPage);

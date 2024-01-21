import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const WorkoutsPreview = ({ Workout }) => {
  const navigation = useNavigation();

  const navigateToWorkoutDetails = () => {
    // Navigate to the WorkoutDetailsPage with the workoutId
    navigation.navigate('WorkoutDetails', { workoutId: Workout.id });
  };

  return (
    <TouchableOpacity
        style={styles.touchLayout}
      onPress={navigateToWorkoutDetails}
    >
      <View style={styles.view}>
        <Image style={styles.workoutImage} source={Workout.image_url} />
        <Text style={{
            fontSize:"20px",
        }}>{Workout.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    width:"100%"
  },
  touchLayout:{
    width:"50%"
  },
  workoutImage: {
    height: "100px",
    width: "100px",
    borderRadius: 10,

  },
});

export default connect(null)(WorkoutsPreview);

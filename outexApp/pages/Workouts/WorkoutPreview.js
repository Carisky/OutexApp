import { View, Image, StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const WorkoutsPreview = ({ Workout }) => {
  const navigation = useNavigation();

  const navigateToWorkoutDetails = () => {
    // Navigate to the WorkoutDetailsPage with the workoutId
    navigation.navigate('WorkoutDetails', { workoutId: Workout.id });
  };

  return (
    <Pressable
        style={styles.touchLayout}
      onPress={navigateToWorkoutDetails}
    >
      <View style={styles.view}>
        <Image style={styles.workoutImage} source={{uri:Workout.image_url}} />
        <Text style={{
            fontSize:20,
        }}>{Workout.name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom:20,
    width:"100%"
  },
  touchLayout: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "45%",
    backgroundColor: "grey",
    borderRadius: 10,
  },
  
  workoutImage: {
    height: 100,
    width: 100,
    borderRadius: 10,

  },
});

export default connect(null)(WorkoutsPreview);

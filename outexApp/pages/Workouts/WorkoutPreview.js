import { View, Image,StyleSheet } from "react-native";
import { connect } from "react-redux";
const WorkoutsPreview = ({Workout}) => {
    return(
        <View style={styles.view}>
        <Image
            style={styles.workoutImage}
            source={{ uri: `http://localhost:3006/${Workout.image_url}` }}
          />
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
      minHeight:'100%',
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    },
    workoutImage: {
      height:"200px",
      width: "200px",
      borderRadius: 10,
      marginTop:"20px"
    },
  });

export default connect(null)(WorkoutsPreview);
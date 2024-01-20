import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
const NavMenu = ({ navigation }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        icon="account-circle"
        mode="contained"
        onPress={() => {
          navigation.navigate("HomePage");
        }}
      >
        Profile
      </Button>
      <Button
        icon="anchor"
        mode="contained"
        onPress={() => {
          navigation.navigate("WorkoutsPage");
        }}
      >
        Workouts
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
});


export default NavMenu;

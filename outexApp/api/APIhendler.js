import axios from "axios";
import { setUser } from "../redux/actions";
import config from "./config";
const host = config.host;

class APIhendler {
  static async checkServer() {
    try {
      const response = await axios.get(
        `${host}/testserverstatus`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  static async userRegister(user, setErrorMessage) {
    try {
      const response = await axios.post(`${host}/user/register`, user);
      console.log(response.data);
    } catch (error) {
      console.error("error in registration:", error);
      setErrorMessage(`email already exist`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 1500);
    }
  }

  static async userLogin(user, setErrorMessage, dispatch,navigation) {
    try {
      const response = await axios.post(`${host}/user/login`, user);
      dispatch(setUser(response.data.user));
        navigation.navigate("HomePage")
    } catch (error) {
      console.error("error in login:", error);
      setErrorMessage(`wrong password or email`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 350);
    }
  }
  static async userChangeData(user) {
    try {
      const response = await axios.post(`${host}/user/changedata`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("error in data change:", error);
    }
  }
  
  static async getWorkouts(){
    try {
      const response = await axios.get(`${host}/workouts`)
      
      const workouts = response.data
      workouts.map((workout)=>{
        workout.image_url = `${host}/${workout.image_url}`
      })
      return workouts;
    } catch (error) {
      console.error("error in data change:", error);
    }
  }

  static async getWorkoutWithExsercises(id){
    try {
      const response = await axios.get(`${host}/workouts/exsercises/${id}`)
      const workout = response.data
      workout.image_url = `${host}/${workout.image_url}`
      return workout;
    } catch (error) {
      console.error("error in data change:", error);
    }
  }
}
export default APIhendler;

// LoginPage.js
import {React, useState, useEffect} from "react";
import { useDispatch,useSelector } from 'react-redux';

import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";

import Messager from "../components/Messager"
import APIhendler from "../api/APIhendler";


const LoginPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);

  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const user = useSelector((state) => state.userReducer.user);
  
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      navigation.navigate("HomePage")
    }
  }, []);

  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.headingStyle}>Login</Text>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: "email",
              name: "email",

              rules: {
                required: {
                  value: true,
                  message: "Email is required",
                },
              },
              textInputProps: {
                label: "Email",
              },
            },
            {
              type: "password",
              name: "password",
              rules: {
                required: {
                  value: true,
                  message: "Password is required",
                },
              },
              textInputProps: {
                label: "Password",
              },
            },
          ]}
        />

        <Button
          mode={"contained"}
          onPress={handleSubmit((data) => {
            APIhendler.userLogin(data,setErrorMessage,dispatch,navigation)
          })}
        >
          Submit
        </Button>
        {errorMessage && (
        <Messager message={errorMessage} visible={true} />
      )}
        <Text style={{textAlign:"center"}}>Dont'have Account?</Text>
        <Button onPress={() => navigation.navigate("Register")}>
          Register
        </Button>
        <Button onPress={() => navigation.navigate("EnterEmail")}>Forget Password?</Button>
      </ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  headingStyle: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
  },
});


export default LoginPage;

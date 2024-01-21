// ExampleComponent.js
import {React, useState} from "react";
import { connect } from "react-redux";
import { setUser } from "../redux/actions";

import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import APIhendler from "../api/APIhendler";
import Messager from "../components/Messager";

const RegisterPage = ({ navigation }) => {

  const [errorMessage, setErrorMessage] = useState(null);

  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.headingStyle}>Register</Text>
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
            {
              type: "password",
              name: "repeatPassword",
              rules: {
                required: {
                  value: true,
                  message: "Password is required",
                },
              },
              textInputProps: {
                label: "Repeat Password",
              },
            },
            {
              type: "text",
              name: "username",
              rules: {
                required: {
                  value: true,
                  message: "Username is required",
                },
              },
              textInputProps: {
                label: "Username",
              },
            },
          ]}
        />
        <Button
          mode={"contained"}
          onPress={handleSubmit((data) => {
            if (data.password===data.repeatPassword) {
              console.log("form data", data);
              APIhendler.userRegister(data,setErrorMessage);
            }else{
              console.log("passwords doesn't match")
            }
            
          })}
        >
          Register
        </Button>
        {errorMessage && (
        <Messager message={errorMessage} visible={true} />
      )}
        <Text style={{ textAlign: "center" }}>Have account?</Text>
        
        <Button onPress={() => navigation.navigate("Login")}>Login</Button>
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




export default connect(null)(RegisterPage);

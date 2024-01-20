import React, { useCallback, useState } from "react";
import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import GoBack from "../components/GoBack";
import { useForm } from "react-hook-form";
import { FormBuilder } from "react-native-paper-form-builder";
import { DatePickerModal } from "react-native-paper-dates";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import APIhendler from "../api/APIhandler";
import { decode } from "base-64";

const ChangeUserDataPage = ({ navigation }) => {
  const user = useSelector((state) => state.userReducer.user);

  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null); // Added state for selected image

  const [decodedImage, setDecoded] = useState(decode(user.profileImage));

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
      setValue("birthdate", params.date);
    },
    [setOpen, setDate, setValue]
  );

  const { control, setFocus, handleSubmit, setValue } = useForm({
    defaultValues: {
      id: user.id,
      username: user.username,
      description: user.description,
      birthdate: user.birthdate,
    },
    mode: "onChange",
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setDecoded(null);

    if (!result.cancelled) {
      setImage(result.uri);
      setValue("profileImage", result.uri); // Set the form value for 'profileImage'
    }
  };

  return (
    <SafeAreaView>
      <GoBack navigation={navigation}>
        <View>
          <Text style={{ textAlign: "center" }}> Change User Data</Text>

          {/* Display selected image */}
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                marginVertical: 20, // Adjust the vertical margin as needed
                marginLeft: "auto",
                marginRight: "auto",
                width: 200,
                height: 200,
              }}
            />
          )}
          {decodedImage && (
            <Image
              source={{ uri: decodedImage }}
              style={{
                marginVertical: 20, // Adjust the vertical margin as needed
                marginLeft: "auto",
                marginRight: "auto",
                width: 200,
                height: 200,
              }}
            />
          )}
          <FormBuilder
            control={control}
            setFocus={setFocus}
            formConfigArray={[
              {
                type: "text",
                name: "username",
                textInputProps: {
                  label: "Name",
                },
              },
              {
                type: "text",
                name: "description",
                textInputProps: {
                  label: "Description",
                },
              },
              {
                type: "date",
                name: "birthdate",
                textInputProps: {
                  label: "Birthdate",
                },
              },
            ]}
          />

          {/* Image selection button */}
          <Button onPress={pickImage} uppercase={false} mode="outlined">
            Select Image
          </Button>

          <Button
            onPress={() => setOpen(true)}
            uppercase={false}
            mode="outlined"
          >
            Pick single date
          </Button>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
          />

          <Button
            mode={"contained"}
            onPress={handleSubmit((data) => {
              // Include image data in the submitted data
              const userData = {
                ...data,
                profileImage: image,
              };
              APIhendler.userChangeData(userData);
            })}
          >
            Submit
          </Button>
        </View>
      </GoBack>
    </SafeAreaView>
  );
};

export default ChangeUserDataPage;

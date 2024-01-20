import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PageSettingsLayout from "../PageSettigsLayout/PageSettigsLayout";
import NavMenu from "../../components/NavMenu";

const WorkoutsPage = ({ navigation }) => {

  return (
    <PageSettingsLayout navigation={navigation}>
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
        <Image
            style={styles.workoutImage}
            source={{
              uri: 'http://localhost:3006/public/uploads/Trainings/Training_1/Training_1.jpg',
            }}
          />
        </View>
        <NavMenu navigation={navigation} />
      </SafeAreaView>
    </PageSettingsLayout>
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
  workoutImage: {
    height:"200px",
    width: "200px",
    height: 200,
    borderRadius: 10,
  },
  workoutTitle: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
  },
});

export default connect(null)(WorkoutsPage);

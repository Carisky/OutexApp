import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

const GoBack = ({ navigation, children }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button mode='elevated' onPress={() => navigation.goBack()}>Go Back</Button>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft:"auto",
    marginRight:"auto",
    marginBottom:20,
    width:"60%"
  },
});
export default GoBack;

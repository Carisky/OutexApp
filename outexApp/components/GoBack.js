import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

const GoBack = ({ navigation, children }) => {
  return (
    <View>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
      {children}
    </View>
  );
};

export default GoBack;

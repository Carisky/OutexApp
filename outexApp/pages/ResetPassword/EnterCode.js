import React from 'react';
import { View } from 'react-native';
import { Text } from "react-native-paper";
import GoBack from '../../components/GoBack';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
const EnterCode = ({ navigation }) => {
  return (
    <SafeAreaView>
    <View>
      <GoBack navigation={navigation}>
        <Text>Enter Code</Text>
        <Button onPress={() => {
          navigation.navigate('SetNewPass');
        }}>
          Next
        </Button>
      </GoBack>
    </View>
    </SafeAreaView>
  );
};

export default EnterCode;

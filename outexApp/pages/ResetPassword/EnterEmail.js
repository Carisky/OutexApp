import React from 'react';
import { Text, View } from 'react-native';
import GoBack from '../../components/GoBack';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const EnterEmail = ({ navigation }) => {
  return (
    <SafeAreaView>
    <View>
      <GoBack navigation={navigation}>
        <Text>Enter Email</Text>
        <Button onPress={() => {
          navigation.navigate('EnterCode');
        }}>
          Next
        </Button>
      </GoBack>
    </View>
    </SafeAreaView>
  );
};

export default EnterEmail;

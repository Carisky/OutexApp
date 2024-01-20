import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const PageSettingsLayout = ({ navigation, children }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Ваши другие компоненты, переданные в children */}
      {children}

      {/* Кнопка поверх других компонентов */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => {
          // Действие при нажатии на кнопку
          navigation.navigate("SettingsPage");
        }}>
        <Text style={{ color: 'white' }}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PageSettingsLayout;

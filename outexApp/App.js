//app js
import { StyleSheet} from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { PaperProvider, DarkTheme, DefaultTheme } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import store from "./redux/store"
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EnterEmail from './pages/ResetPassword/EnterEmail';
import EnterCode from './pages/ResetPassword/EnterCode';
import SetNewPass from './pages/ResetPassword/SetNewPass';
import HomePage from './pages/HomePage';
import WorkoutsPage from './pages/Workouts/WorkoutsPage';
import ChangeUserDataPage from './pages/ChangeUserDataPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {



  return (
    <NavigationContainer>

      <StoreProvider store={store}>
        <PaperProvider>

        <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />

        <Stack.Screen name="EnterEmail" component={EnterEmail} />
        <Stack.Screen name="EnterCode" component={EnterCode} />
        <Stack.Screen name="SetNewPass" component={SetNewPass} />

        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="WorkoutsPage" component={WorkoutsPage} />
        <Stack.Screen name="ChangeUserData" component={ChangeUserDataPage} />
        <Stack.Screen name="SettingsPage" component={SettingsPage} />

      </Stack.Navigator>

        </PaperProvider>
      </StoreProvider>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

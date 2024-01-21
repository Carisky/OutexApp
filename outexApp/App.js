//app js
import { StyleSheet} from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { DefaultTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';

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
import WorkoutDetailsPage from './pages/Workouts/WorkoutDetailsPage';

export default function App() {

  const theme = {
    ...MD3DarkTheme, // Use DarkTheme from react-native-paper
    roundness: 2,
    colors: {
      ...MD3DarkTheme.colors,
      // Customize colors if needed
    },
  };

  return (
    <NavigationContainer theme={theme}>

      <StoreProvider store={store}>
        <PaperProvider theme={theme}>

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


        <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsPage} />


        
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

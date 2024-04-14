import { StyleSheet, Text, View } from "react-native";
import SignIn from "./pages/Signin";
import Verification from "./pages/Verification";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Homepage from "./pages/Homepage";
import Library from "./pages/Library";
import Webinar from "./pages/Webinar";
import Profile from "./pages/Profile";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialBottomTabNavigator();

  const UnAuthentication = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={SignIn} name="SignIn"></Stack.Screen>
        <Stack.Screen
          component={Verification}
          name="Verification"
        ></Stack.Screen>
      </Stack.Navigator>
    );
  };


  return (
    <Provider store={appStore}>
      <NavigationContainer>
        <UnAuthentication/>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

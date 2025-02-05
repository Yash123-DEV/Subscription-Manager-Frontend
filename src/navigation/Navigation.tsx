import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthCheck from "../Screens/AuthCheck";  // Import kiya AuthCheck
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUpScreen";
import GetStartedPage from "../Screens/getStartedPage";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthCheck" screenOptions={{ headerShown: false }}>
      <StatusBar style="auto" />
        <Stack.Screen name="AuthCheck" component={AuthCheck} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="GetStartedPage" component={GetStartedPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

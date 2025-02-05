// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import SignUpScreen from "./src/Screens/SignUpScreen";
// import Login from "./src/Screens/Login";
// import Home from "./src/Screens/Home";
// import GetStarted from "./src/Screens/getStartedPage";

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="GetStarted" component={GetStarted} />
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//         <Stack.Screen name="Home" component={Home} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;



// import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import SignUpScreen from "./src/Screens/SignUpScreen";
// import Login from "./src/Screens/Login";
// import Home from "./src/Screens/Home";
// import GetStarted from "./src/Screens/getStartedPage";

// const Stack = createStackNavigator();

// const App = () => {
//   const [initialRoute, setInitialRoute] = useState<string | null>(null);

//   useEffect(() => {
//     const checkFirstTime = async () => {
//       const isFirstTime = await AsyncStorage.getItem("isFirstTime");
//       setInitialRoute(isFirstTime === null ? "GetStarted" : "Login");
//     };

//     checkFirstTime();
//   }, []);

//   if (!initialRoute) return null;

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={initialRoute}>
//         <Stack.Screen name="GetStarted" component={GetStarted} />
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//         <Stack.Screen name="Home" component={Home} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;



import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GetStarted from "./src/Screens/getStartedPage";
import Login from "./src/Screens/Login";
import SignUpScreen from "./src/Screens/SignUpScreen";
import Home from "./src/Screens/Home";

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isFirstTime = await AsyncStorage.getItem("isFirstTime");
        const token = await AsyncStorage.getItem("authToken");

        if (isFirstTime === null) {
          setInitialRoute("GetStarted"); 
        } else if (token) {
          setInitialRoute("Login"); 
        } else {
          setInitialRoute("SignUp"); 
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setInitialRoute("SignUp");
      }
    };

    checkAuthStatus();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ); 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

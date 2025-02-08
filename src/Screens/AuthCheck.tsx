


import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  GetStartedPage: undefined;
  Login: undefined;
  Home: undefined;
};


const AuthCheck = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        // Agar token nahi milta, toh GetStartedPage pe navigate karenge
        navigation.navigate("GetStartedPage");
      } else {
        // Agar token milta hai, toh login page ya home page pe navigate karenge
        navigation.navigate("Home"); // Ya login page, depending on your logic
      }
    };

    checkAuth();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthCheck;

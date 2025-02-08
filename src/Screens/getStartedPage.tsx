

import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  Home: undefined;
};


const GetStarted = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [index, setIndex] = useState(0);

  const handleContinue = async () => {
    await AsyncStorage.setItem("isFirstTime", "false"); 
    navigation.navigate("Login"); 
  };

  const slides = [
    {
      image: require("../assets/getstarter.png"),
      title: "One app for all your subscriptions",
      description: "Keep an eye on all your subscriptions and take control from one app",
    },
    {
      image: require("../assets/getStarterImg.png"),
      title: "Control your subscription spending",
      description: "Easily calculate and view your total expenses over any period",
    },
    {
      image: require("../assets/getstartfinal.png"),
      title: "Never miss a payment",
      description: "Get alerts and reminders for upcoming subscription payments",
    },
  ];

  return (
    <Swiper loop={false} index={index} onIndexChanged={setIndex} dotStyle={styles.dot} activeDotStyle={styles.activeDot}>
      {slides.map((slide, i) => (
        <View key={i} style={styles.container}>
          <Image source={slide.image} style={styles.image} />
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => (i === slides.length - 1 ? handleContinue() : setIndex(i + 1))}
          >
            <Text style={styles.buttonText}>{i === slides.length - 1 ? "Get Started" : "Next"}</Text>
          </TouchableOpacity>

          {i !== slides.length - 1 && (
            <TouchableOpacity onPress={handleContinue}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4FCFF",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6A5AE0",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  skipText: {
    fontSize: 14,
    color: "#1D1E2C",
    textDecorationLine: "underline",
  },
  dot: {
    backgroundColor: "#ccc",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "#1D1E2C",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});

export default GetStarted;

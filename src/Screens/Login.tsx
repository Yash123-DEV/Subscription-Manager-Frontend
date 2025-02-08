

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Eye, EyeOff } from "lucide-react-native";
import { StackNavigationProp } from "@react-navigation/stack";

interface LoginResponse {
  token?: string;
  error?: string;
}

type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  Home: undefined;
};

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://192.168.50.187:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          await AsyncStorage.setItem("token", data.token);
          Alert.alert("Login Successful", "Welcome back!");
          navigation.navigate("Home");
        } else {
          setError("No token received.");
        }
      } else {
        const errorText = await response.text();
        setError(errorText || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lets Sign you in</Text>
      <Text style={styles.subtitle}>Welcome Back, You have been missed</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email, phone & username"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.eyeIcon}
        >
          {isPasswordVisible ? <EyeOff size={20} color="#000" /> : <Eye size={20} color="#000" />}
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>
      
      <Text style={styles.orText}>or</Text>
      
      
      
      <Text style={styles.registerText}>
        Don&apos;t have an account? <Text style={styles.registerLink} onPress={() => navigation.navigate("SignUp")}>Register Now</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4FCFF",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#6A5AE0", //#6A5AE0
    marginBottom: 20,
  },
  signInButton: {
    width: "100%",
    backgroundColor: "#6A5AE0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  signInText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  orText: {
    marginVertical: 15,
    fontSize: 14,
    color: "#666",
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  registerText: {
    marginTop: 15,
    fontSize: 14,
    color: "#333",
  },
  registerLink: {
    color: "#6A5AE0",
    fontWeight: "bold",
  },
});

export default Login;

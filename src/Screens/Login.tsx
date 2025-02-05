import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Eye, EyeOff } from "lucide-react-native";

interface LoginResponse {
  token?: string;
  error?: string;
}

const Login = () => {
  const navigation = useNavigation();
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
         // Save token to AsyncStorage
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
      <View style={styles.loginCard}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
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
                    {isPasswordVisible ? <EyeOff size={20} color="#190c25" /> : <Eye size={20} color="#190c25" />}
                  </TouchableOpacity></View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Login</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
        <Text style={styles.registerLink}>
          Don&apos;t have an account?{" "}
          <Text
            style={styles.registerLinkText}
            onPress={() => navigation.navigate("SignUp")}
          >
            Create one
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee1f8",
  },
  loginCard: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#190c25",
    marginBottom: 20,
  },
  passwordContainer:{
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 15,
    zIndex: 1,
  },
  input: {
    width: "100%",
    backgroundColor: "#f3f4f6",
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    fontSize: 14,
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#12071a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  errorMessage: {
    textAlign: "center",
    color: "#ef4444",
    marginTop: 10,
    fontSize: 14,
  },
  registerLink: {
    textAlign: "center",
    fontSize: 14,
    color: "#4b5563",
    marginTop: 15,
  },
  registerLinkText: {
    color: "#190c25",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});

export default Login;

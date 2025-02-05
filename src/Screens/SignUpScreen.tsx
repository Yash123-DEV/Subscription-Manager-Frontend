// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Eye, EyeOff } from "lucide-react-native";


// export default function SignUpScreen() {
//   const navigation = useNavigation();

//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (name: string, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch("http://192.168.50.187:5000/users/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const contentType = response.headers.get("Content-Type");
//       let data;

//       if (contentType && contentType.includes("application/json")) {
//         data = await response.json();
//       } else {
//         data = await response.text();
//       }

//       if (response.ok) {
//         Alert.alert("Success", "Registration successful!");
//         navigation.navigate("Login"); // Navigate to login screen
//       } else {
//         Alert.alert("Error", data.error || data || "An error occurred. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       Alert.alert("Error", "Something went wrong. Please check your connection and try again.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.formContainer}>
//         <Text style={styles.title}>
//           Complete Tasks and earn <Text style={styles.head}>money and gifts</Text>
//         </Text>
//         <Text style={styles.subtitle}>Create your account</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Full Name"
//           value={formData.fullname}
//           onChangeText={(text) => handleChange("fullname", text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           keyboardType="email-address"
//           value={formData.email}
//           onChangeText={(text) => handleChange("email", text)}
//         />
//         <View style={styles.inputContainer}>
//   <TextInput
//     style={styles.input}
//     placeholder="Password"
//     secureTextEntry={!isPasswordVisible}  // Toggle secureTextEntry
//     value={formData.password}
//     onChangeText={(text) => handleChange("password", text)}
//   />
  
//   {/* Eye Icon to Toggle Visibility */}
//   <TouchableOpacity
//     onPress={() => setIsPasswordVisible(!isPasswordVisible)}
//     style={styles.eyeIcon}
//   >
//     {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
//   </TouchableOpacity>
// </View>
//         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Create My Account</Text>
//         </TouchableOpacity>
//         <Text style={styles.textCenter}>
//           Already have an account?{" "}
//           <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
//             Please login
//           </Text>
//         </Text>
//       </View>
//     </View>
//   );
// }

// // const styles = StyleSheet.create({
// //    container: {
// //      flex: 1,
// //      justifyContent: "center",
// //      alignItems: "center",
// //      backgroundColor: "#eee1f8",
// //    },
// //    formContainer: {
// //      width: "90%",
// //      maxWidth: 400,
// //      padding: 20,
// //      backgroundColor: "white",
// //      borderRadius: 10,
// //      shadowColor: "#000",
// //      shadowOpacity: 0.1,
// //      shadowOffset: { width: 0, height: 2 },
// //      shadowRadius: 6,
// //      elevation: 4,
// //    },
// //    title: {
// //      fontSize: 24,
// //      fontWeight: "bold",
// //      textAlign: "center",
// //      color: "#2d3748",
// //      marginBottom: 10,
// //    },
// //    subtitle: {
// //      fontSize: 16,
// //      textAlign: "center",
// //      color: "#4a5568",
// //      marginBottom: 20,
// //    },
// //    input: {
// //      width: "100%",
// //      backgroundColor: "#f7fafc",
// //      padding: 10,
// //      marginBottom: 15,
// //      borderWidth: 1,
// //      borderColor: "#e2e8f0",
// //      borderRadius: 8,
// //      fontSize: 14,
// //    },
// //    button: {
// //      width: "100%",
// //      backgroundColor: "#190c25",
// //      padding: 15,
// //      borderRadius: 8,
// //      alignItems: "center",
// //    },
// //    buttonText: {
// //      color: "white",
// //      fontWeight: "600",
// //      fontSize: 14,
// //    },
// //    textCenter: {
// //      textAlign: "center",
// //      fontSize: 14,
// //      color: "#718096",
// //      marginTop: 15,
// //    },
// //    link: {
// //      color: "#190c25",
// //      fontWeight: "500",
// //      textDecorationLine: "underline",
// //    },
// //    head: {
// //      color: "#190c25",
// //    },
   
  
// //  });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#eee1f8",
//   },
//   formContainer: {
//     width: "90%",
//     maxWidth: 400,
//     padding: 20,
//     backgroundColor: "white",
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#2d3748",
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: "center",
//     color: "#4a5568",
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     backgroundColor: "#f7fafc",
//     padding: 12,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: "#e2e8f0",
//     borderRadius: 8,
//     fontSize: 14,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f7fafc",
//     borderWidth: 1,
//     borderColor: "#e2e8f0",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//   },
//   inputField: {
//     flex: 1,
//     paddingVertical: 12,
//     fontSize: 14,
//   },
//   eyeIcon: {
//     padding: 10,
//   },
//   button: {
//     width: "100%",
//     backgroundColor: "#190c25",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "600",
//     fontSize: 14,
//   },
//   textCenter: {
//     textAlign: "center",
//     fontSize: 14,
//     color: "#718096",
//     marginTop: 15,
//   },
//   link: {
//     color: "#190c25",
//     fontWeight: "500",
//     textDecorationLine: "underline",
//   },
//   highlight: {
//     color: "#190c25",
//   },
// });



import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Eye, EyeOff } from "lucide-react-native";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://192.168.50.187:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("Content-Type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (response.ok) {
        Alert.alert("Success", "Registration successful!");
        navigation.navigate("Login"); // Navigate to login screen
      } else {
        Alert.alert("Error", data.error || data || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong. Please check your connection and try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          Complete Tasks and earn <Text style={styles.head}>money and gifts</Text>
        </Text>
        <Text style={styles.subtitle}>Create your account</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={formData.fullname}
          onChangeText={(text) => handleChange("fullname", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
          />
          
          {/* Eye Icon to Toggle Visibility */}
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            {isPasswordVisible ? <EyeOff size={20} color="#190c25" /> : <Eye size={20} color="#190c25" />}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create My Account</Text>
        </TouchableOpacity>
        <Text style={styles.textCenter}>
          Already have an account?{" "}
          <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
            Please login
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee1f8",
  },
  formContainer: {
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
    color: "#2d3748",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#4a5568",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#f7fafc",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    fontSize: 14,
  },
  passwordInputContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 15,
    zIndex: 1,
  },
  button: {
    width: "100%",
    backgroundColor: "#190c25",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  textCenter: {
    textAlign: "center",
    fontSize: 14,
    color: "#718096",
    marginTop: 15,
  },
  link: {
    color: "#190c25",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  head: {
    color: "#190c25",
  },
});

// import React, { useEffect, useState } from "react";
// import { View, ActivityIndicator } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";

// const AuthCheck = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await AsyncStorage.getItem("token");
//       if (token) {
//         navigation.replace("Home");  // Token hai toh Home page pe bhejo
//       } else {
//         navigation.replace("GetStartedPage"); // Token nahi hai toh GetStarted pe bhejo
//       }
//       setLoading(false);
//     };

//     checkAuth();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#190c25" />
//       </View>
//     );
//   }

//   return null;
// };

// export default AuthCheck;




import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AuthCheck = () => {
  const navigation = useNavigation();

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

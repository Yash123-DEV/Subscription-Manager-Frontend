import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
         const token = await AsyncStorage.getItem("token");
         console.log("Retrieved token:", token);
         
        if (!token) {
          Alert.alert("Error", "No token found. Redirecting to login.");
          navigation.navigate("Login");
          return;
        }

        setLoading(true);
        const response = await fetch("http://192.168.50.187:5000/users/api/user/coins", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCoins(data.coins);
        } else {
          Alert.alert("Error", "Failed to fetch coins.");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while fetching coins.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const handleBack = () => {
    navigation.navigate("Login");
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rewards</Text>
        <TouchableOpacity>
          <Text style={styles.optionsButton}>⋮</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Refer your friend & earn 100 points</Text>

      <View style={styles.referralSection}>
        <View style={styles.referralBox}>
          <TextInput
            style={styles.referralInput}
            value="link.gpy/awesomeyour-ref"
            editable={false}
          />
          <TouchableOpacity style={styles.copyButton}>
            <Text>Copy</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pointsSection}>
        <View style={styles.pointsHeader}>
          <Text>Reward Points</Text>
          <Text>{coins} Coins</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${(coins / 500) * 100}%` }]} />
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="activity" size={24} color="black" />
          <Text>Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="card-giftcard" size={24} color="black" />
          <Text>Rewards</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rewardContainer}>
        <Text style={styles.rewardText}>₹10 Google redeem code</Text>
        <Text style={styles.rewardSubText}>1100 points to redeem</Text>
        <TouchableOpacity style={styles.rewardClaimButton}>
          <Text style={styles.rewardClaimButtonText}>Redeem</Text>
        </TouchableOpacity>
      </View>

      {/* Additional rewards */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#eee1f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  optionsButton: {
    fontSize: 24,
    color: "#666",
  },
  subtitle: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  referralSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  referralBox: {
    flexDirection: "row",
    marginBottom: 10,
  },
  referralInput: {
    flex: 1,
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#f3f4f6",
  },
  copyButton: {
    padding: 10,
    backgroundColor: "#fff",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  shareButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#190c25",
    borderRadius: 10,
    alignItems: "center",
  },
  shareButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  pointsSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
  },
  pointsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    marginTop: 10,
  },
  progress: {
    height: "100%",
    backgroundColor: "#27ae60",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  actionButton: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  rewardContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
  },
  rewardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rewardSubText: {
    fontSize: 14,
    color: "#666",
  },
  rewardClaimButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#38043d",
    borderRadius: 10,
    alignItems: "center",
  },
  rewardClaimButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    fontSize: 16,
    color: "#666",
  },
});

export default Home;

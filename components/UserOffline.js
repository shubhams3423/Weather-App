import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { useStore } from "../StoreProvider";
import thunderImage from "../assets/Icons/WeatherIcons/thunder.png";
const UserOffline = () => {
  const { getUserLocation, netWorkError } = useStore();
  const handleIsUserOffline = () => {
    getUserLocation();
  };
  return (
    <View style={styles.wrapper}>
      <View>
        <Image source={thunderImage} />
      </View>
      <View>
        <Text style={styles.title}>Ooops!</Text>
        <View style={styles.subtitleWrapper}>
          <Text style={styles.subtitle}> {netWorkError}</Text>
          <Text style={styles.subtitle}> Check Your Connection</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleIsUserOffline}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserOffline;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#080A2F",
    backgroundColor: " rgba(30, 134, 232, 0.33)",
    borderRadius: 14,
    padding: 50,
    rowGap: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: 2,
  },
  subtitle: {
    color: "rgb(201 198 198)",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    backgroundColor: "#4084DF",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 18,
  },
});

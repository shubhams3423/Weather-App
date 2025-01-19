import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import icon from "../assets/images/icon.png";
const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 500);
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish, fadeAnim]);

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Animated.Text style={[styles.footerText, { opacity: fadeAnim }]}>
        Made With ❤️ By Shubham Shinde
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  footerText: {
    position: "absolute",
    bottom: 40,
    fontSize: 16,
    fontFamily: "IrishGroverRegular",
    color: "#FFFFFF",
  },
});

export default SplashScreen;

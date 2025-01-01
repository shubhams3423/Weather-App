import { View, Text, StyleSheet, SafeAreaView, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import SearchModal from "./SearchModal";
import { useStore } from "../StoreProvider";

const AppHeader = ({ weatherDetails }) => {
  const { getUserLocation, setShowModal, isAnimating } = useStore();
  const [date, setDate] = useState("");

  function handleFormateDate() {
    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(today);
    setDate(formattedDate);
  }

  useEffect(() => {
    handleFormateDate();
  }, []);

  const text = "Updating";
  const animatedValues = useRef(
    text.split("").map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    let animation;
    if (isAnimating) {
      animation = Animated.loop(
        Animated.stagger(
          100,
          animatedValues.map((value, i) =>
            Animated.sequence([
              Animated.timing(value, {
                toValue: -4,
                duration: 350,
                useNativeDriver: true,
              }),
              Animated.timing(value, {
                toValue: 0,
                duration: 350,
                useNativeDriver: true,
              }),
            ])
          )
        )
      );
      animation.start();
    } else {
      Animated.stagger(
        100,
        animatedValues.map((value) =>
          Animated.timing(value, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          })
        )
      ).start();
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [isAnimating]);

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <MaterialIcons
          name="location-on"
          size={25}
          color="white"
          onPress={getUserLocation}
          style={styles.locationIcon}
        />
        <View style={styles.header}>
          <Text style={styles.cityName}>{weatherDetails?.location?.name}</Text>
          <Text style={styles.dateText}>{date}</Text>
          {isAnimating && (
            <View style={styles.updateTextWrapper}>
              <View style={styles.currentUpdate} />
              <View style={styles.container}>
                {text.split("").map((letter, index) => (
                  <Animated.Text
                    key={index}
                    style={[
                      styles.updatingText,
                      { transform: [{ translateY: animatedValues[index] }] },
                    ]}
                  >
                    {letter}
                  </Animated.Text>
                ))}
              </View>
            </View>
          )}
        </View>
        <FontAwesome
          color="white"
          name="search"
          size={25}
          style={styles.icon}
          onPress={() => setShowModal(true)}
        />
      </View>
      <SearchModal />
    </SafeAreaView>
  );
};

export default AppHeader;
const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 4.9,
    marginBottom: 40.47,
    lineHeight: 42.61,
    width: "100%",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "80%",
  },
  cityName: {
    fontSize: 31.98,
    lineHeight: 42.61,
    color: "#FFFFFF",
    fontFamily: "NunitoExtraBold",
    fontWeight: 500,
    textAlign: "center",
  },
  locationIcon: { lineHeight: 42.61 },
  dateText: {
    fontSize: 14.99,
    lineHeight: 27.31,
    // color: "#CACACA",
    color: "#aeaeae",
    fontWeight: 500,
  },
  updateTextWrapper: {
    marginTop: 3,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  currentUpdate: {
    width: 4,
    height: 4,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: "yellow",
  },
  updatingText: {
    fontSize: 11,
    color: "white",
  },
  icon: {
    lineHeight: 42.61,
    width: 30,
    display: "flex",
    justifyContent: "center",
  },
  modalWrapper: {
    backgroundColor: "red",
    flex: 1,
    padding: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

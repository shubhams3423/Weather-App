import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SearchBox from "./SearchBox";
import LocationNotFoundImage from "../assets/images/not_found_image.png";

const LocationNotFound = ({ setIsLocationFound }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <MaterialIcons
          name="keyboard-backspace"
          size={30}
          color="white"
          onPress={() => setIsLocationFound(true)}
          style={styles.backArrow}
        />
        <SearchBox setIsLocationFound={setIsLocationFound} locationFound />
      </View>
      <Text style={styles.text}>Location Not Found</Text>
      <View style={styles.imageWrapper}>
        <Image
          source={LocationNotFoundImage}
          style={styles.imageNotFound}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default LocationNotFound;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  text: {
    color: "#cbc8c8",
    fontWeight: "800",
    fontSize: 25,
    textAlign: "center",
    marginVertical: 20,
  },
  imageWrapper: {
    flex: 1,
    alignItems: "center",
  },
  imageNotFound: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
});

import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useStore } from "../StoreProvider";

const SearchBox = ({
  setShowModal,
  searchModal,
  setIsLocationFound,
  locationFound,
}) => {
  const { getUserLocation, setSearchText } = useStore();

  const [inputText, setInputText] = useState("");
  const handleTextInput = () => {
    if (inputText.trim().length > 0) {
      setSearchText(inputText.trim());
      searchModal && setShowModal(false);
      locationFound && setIsLocationFound(true);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTextInput();
    }
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputContainer}>
        <FontAwesome color="rgba(240, 237,237,0.6)" name="search" size={20} />
        <TextInput
          value={inputText}
          placeholder="Search"
          onChangeText={setInputText}
          onKeyPress={handleKeyPress}
          onSubmitEditing={handleTextInput}
          underlineColorAndroid="transparent"
          placeholderTextColor="rgba(149, 165, 166, 0.8)"
          style={styles.input}
        />
      </View>
      <View style={styles.locationWrapper}>
        <MaterialIcons
          name="location-on"
          style={styles.location}
          size={25}
          onPress={() => {
            getUserLocation();
            searchModal && setShowModal(false);
            locationFound && setIsLocationFound(true);
          }}
        />
      </View>
    </View>
  );
};

export default SearchBox;
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
    color: "rgba(149, 165, 166, 0.9)",
  },
  inputContainer: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: 50,
    paddingHorizontal: 15,
  },
  locationWrapper: {
    display: "flex",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 2,
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  location: {
    color: "rgba(240, 237,237,0.6)", //rgba(0, 0, 0, 0.3)
  },
});

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
const APIModal = ({
  setShowAPIModal,
  APIError,
  getWeatherDetails,
  setUserAPIKey,
}) => {
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [inputError, setInputError] = useState(false);

  const handleTextInput = () => {
    if (inputText.trim().length > 0) {
      setUserAPIKey(inputText);
      setShowAPIModal(false);
    } else setInputError(true);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTextInput();
    }
  };
  const handleTryAgain = () => {
    setShowAPIModal(false);
    getWeatherDetails();
  };
  const inputRef = useRef(null);
  const handleOpenLinkInBrowser = async () => {
    const url = "https://www.weatherapi.com/";
    try {
      const isSupported = await Linking.canOpenURL(url);
      if (isSupported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Navigation Error",
          "The device does not support opening this type of link."
        );
      }
    } catch (error) {
      Alert.alert(error);
    }
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.apiErrorWrapper}>
        <MaterialIcons
          name="error"
          style={styles.warningIcon}
          size={22}
          color="white"
        />
        <Text style={styles.apiKeyError}>{APIError}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <View
          style={[
            styles.inputContainer,
            inputError && styles.inputRequired,
            isFocused && styles.inputFocused,
          ]}
        >
          <TextInput
            value={inputText}
            ref={inputRef}
            onChangeText={setInputText}
            onKeyPress={handleKeyPress}
            onSubmitEditing={handleTextInput}
            underlineColorAndroid="transparent"
            style={styles.input}
            focusable={isFocused}
            onFocus={() => setIsFocused(true)}
            onBlur={() => inputText.trim().length === 0 && setIsFocused(false)}
          />
        </View>
        <Text
          style={[styles.lable, isFocused && styles.labelFocused]}
          onPress={() => inputRef?.current?.focus()}
        >
          Enter API Key
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={handleTextInput}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Continue</Text>
            <MaterialIcons
              name="east"
              style={styles.arrowIcon}
              color="white"
              size={20}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTryAgain}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Try Again</Text>
            <MaterialIcons
              name="replay"
              style={styles.arrowIcon}
              color="white"
              size={20}
            />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleOpenLinkInBrowser}>
        <Text style={styles.generateKey}>Generate your API key here...</Text>
      </TouchableOpacity>
    </View>
  );
};

export default APIModal;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(30, 134, 232, 0.33)",
    borderRadius: 13,
    rowGap: 20,
    padding: 20,
    maxWidth: 330,
    width: "100%",
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    justifyContent: "flex-end",
    height: 45,
    width: "100%",
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
  },
  inputRequired: {
    borderWidth: 2,
    borderColor: "red",
  },
  inputFocused: {
    height: 55,
  },
  input: {
    padding: 10,
    paddingTop: 25,
    width: "100%",
    height: "100%",
    color: "rgb(180 180 180)",
  },
  buttonWrapper: {
    marginTop: 5,
    width: "100%",
    flexDirection: "row",
    marginRight: "auto",
    gap: 20,
  },
  apiKeyError: {
    fontSize: 20,
    flex: 1,
    color: "white",
    marginBottom: 18,
    flexWrap: "wrap",
  },
  button: {
    alignItems: "center",
  },
  arrowIcon: {
    marginLeft: 6,
  },
  buttonContainer: {
    backgroundColor: "#4084DF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
  },
  apiErrorWrapper: {
    gap: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  generateKey: {
    color: "rgb(193 192 192)",
  },

  lable: {
    position: "absolute",
    left: 13,
    top: 11,
    color: "rgba(166, 208, 247, 0.6)",
  },
  labelFocused: {
    top: 3,
  },
  warningIcon: {
    lineHeight: 30,
  },
});

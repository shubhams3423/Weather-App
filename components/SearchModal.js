import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  FlatList,
} from "react-native";
import backgroundImg from "../assets/images/background_img.png";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import SearchBox from "./SearchBox";
import { useStore } from "../StoreProvider";
import SearchHistory from "./SearchHistory";
const SearchModal = () => {
  const { showModal, setShowModal, searchedHistory } = useStore();
  const [searchedCityWeatherDetails, setSearchedWeatherDetails] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (Object.keys(searchedHistory).length > 0) {
      const result = Object.keys(searchedHistory).map(
        (city) => searchedHistory[city]
      );
      setSearchedWeatherDetails(result);
    }
  }, [searchedHistory]);
  return (
    <Modal
      visible={showModal}
      animationType="slide"
      onRequestClose={() => setShowModal(false)}
    >
      <KeyboardAvoidingView style={styles.keyboard}>
        <ImageBackground
          resizeMode="cover"
          style={styles.modalWrapper}
          source={backgroundImg}
        >
          <LinearGradient
            style={styles.linearGradient}
            start={{ x: 1, y: 0 }}
            end={{ x: 0.5, y: 0.5 }}
            colors={[
              "rgba(8, 200, 253, 0.5)",
              "rgba(8, 200, 253, 0.32)",
              "transparent",
            ]}
            locations={[0.22, 0.4, 0.9]}
          />
          <View>
            <MaterialIcons
              name="keyboard-backspace"
              size={30}
              color="white"
              onPress={() => setShowModal(false)}
            />
            <SearchBox setShowModal={setShowModal} searchModal />
          </View>
          <View style={styles.container}>
            <FlatList
              data={searchedCityWeatherDetails}
              renderItem={({ item, index }) => (
                <SearchHistory searchedCityWeather={item} id={index} />
              )}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.flatList}
              columnWrapperStyle={styles.columnWrapper}
              numColumns={2}
            />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SearchModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  columnWrapper: {
    columnGap: 10,
    justifyContent: "space-between",
  },
  location: {
    position: "absolute",
    right: 0,
    top: -17,
    color: "white",
  },
  modalWrapper: {
    backgroundColor: "#04061F",
    flex: 1,
    paddingTop: 25,
    paddingRight: 25,
    paddingLeft: 25,
  },
  keyboard: { flex: 1 },
  linearGradient: {
    position: "absolute",
    width: "130%",
    height: "75%",
    top: -20,
    right: -20,
  },
  historyWrapper: {
    marginTop: 45,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 20,
  },
});

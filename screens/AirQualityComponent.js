import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import GasInfo from "../components/GasInfo";

const AirQualityComponent = ({ weatherDetails }) => {
  const [airQualityConditionText, setAirQualityConditionText] = useState("");
  const aqi = weatherDetails?.current?.air_quality?.["us-epa-index"];
  const handleAirQualityText = () => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Moderate";
      case 3:
        return "Sensitive";
      case 4:
        return "Unhealthy";
      case 5:
        return "Hazardous";
    }
  };
  useEffect(() => {
    setAirQualityConditionText(handleAirQualityText());
  }, [weatherDetails]);

  const gases = ["co", "no2", "o3", "so2"];
  const gasArr = gases.map((gas) => ({
    name: gas,
    qty: weatherDetails?.current?.air_quality[gas],
  }));

  return (
    <ScrollView contentContainerStyle={styles.scrollViewWrapper}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.aqiWrapper}>
            <Text style={[styles.text, styles.airQualityText]}>
              {airQualityConditionText}
            </Text>
            <View style={styles.aqiTextWrapper}>
              <View style={styles.quiTextInner}>
                <Text style={styles.aqiText}>Air Quality Index</Text>
              </View>
              <Text style={styles.aqiText}>{aqi}</Text>
            </View>
          </View>
          <View style={styles.aqiParameters}>
            <FlatList
              contentContainerStyle={styles.gasList}
              data={gasArr}
              renderItem={({ item, key }) => <GasInfo gases={item} key={key} />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AirQualityComponent;

const styles = StyleSheet.create({
  scrollViewWrapper: { flexGrow: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  airQualityText: {
    fontWeight: 800,
    lineHeight: 80,
    fontSize: 50,
    color: "#FFFFFF",
  },
  aqiTextWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  quiTextInner: { marginRight: 4 },
  aqiText: {
    fontSize: 20,
    color: "rgba(185,185,185,1.00)",
  },
  wrapper: {
    flexGrow: 1,
    paddingVertical: 30,
    alignItems: "center",
  },
  aqiWrapper: {
    gap: 4,
    marginBottom: 20,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontFamily: "NunitoExtraBold",
  },
  airIndex: {
    fontSize: 15,
  },
  gasList: {
    flex: 1,
    justifyContent: "space-around",
  },
  airGases: {
    gap: 4,
  },
  aqiParameters: {
    width: "100%",
    borderTopWidth: 2,
    borderTopColor: "gray",
    paddingVertical: 20,
    backgroundColor: "rgba(64, 132, 223, 0.2)",
    borderRadius: 6,
  },
});

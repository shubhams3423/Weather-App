import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import windIcon from "../assets/Icons/wind_icon.png";
import spring_icon from "../assets/Icons/spring_icon.png";
import cloud_icon from "../assets/Icons/cloud_icon.png";
import WeatherIcon from "../components/WeatherIcon";
import Temperature from "../components/Temperature";

const { width } = Dimensions.get("screen");
const ForeCastComponent = ({ weatherDetails }) => {
  const bottomParams = [
    {
      key: "wind_kph",
      icon: windIcon,
      unit: "km/h",
    },
    {
      key: "humidity",
      icon: cloud_icon,
      unit: "%",
    },
    {
      key: "uv",
      icon: spring_icon,
      unit: "of 10",
    },
  ];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.outerWrapper}>
        <View style={styles.weatherWrapper}>
          <WeatherIcon weatherDetails={weatherDetails} forecast={true} />
          <Temperature weatherDetails={weatherDetails} forecast={true} />
        </View>
        <View style={styles.weatherParamsWrapper}>
          <FlatList
            data={bottomParams}
            contentContainerStyle={styles.bottomParamList}
            renderItem={({ item }) => (
              <BottomParams weatherDetails={weatherDetails} item={item} />
            )}
            horizontal
            key={(item) => item.key}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ForeCastComponent;

const BottomParams = ({ weatherDetails, item }) => {
  return (
    <View style={styles.weatherParams} key={item.key}>
      <Image source={item.icon} />
      <Text style={styles.weatherParamText}>
        {weatherDetails?.current?.[item.key]} {item.unit}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: { flex: 1 },
  scrollContainer: { flexGrow: 1, paddingBottom: 30 },
  weatherWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 39.98,
    marginBottom: 30.47,
  },

  weatherParamsWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",
    paddingHorizontal: width * 0.05,
  },
  weatherParams: {
    alignItems: "center",
  },
  weatherParamText: {
    fontSize: 17.49,
    lineHeight: 22.77,
    color: "#FFFFFF",
    marginTop: 12.66,
    fontFamily: "DMSansMedium",
  },
  bottomParamList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
});

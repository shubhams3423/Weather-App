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
import { getWeatherIcon } from "../weatherIcons";

const { width } = Dimensions.get("screen");
const ForeCastComponent = ({ weatherDetails }) => {
  const handleWeatherIcon = () => {
    const isDay = weatherDetails.current?.is_day ? "day" : "night";
    const code = weatherDetails.current?.condition?.code;
    if (getWeatherIcon(isDay, code)) {
      return getWeatherIcon(isDay, code);
    } else {
      return {
        uri: `https:${weatherDetails?.current?.condition?.icon}`,
      };
    }
  };
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
          <View style={styles.iconWrapper}>
            <Image
              resizeMode="contain"
              source={handleWeatherIcon()}
              style={styles.cloudIcon}
            />
          </View>
          <View style={styles.temperatureWrapper}>
            <Text style={styles.temperatureText}>
              {weatherDetails?.current?.temp_c}
            </Text>
            <Text style={styles.degreeIcon}>&#x2da;</Text>
          </View>
          <Text style={styles.tempSubtitle}>
            {weatherDetails?.current?.condition?.text}
          </Text>
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
  cloudIcon: {
    height: "100%",
    width: "100%",
  },
  scrollContainer: { flexGrow: 1, paddingBottom: 30 },
  weatherWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 39.98,
    marginBottom: 30.47,
  },
  temperatureText: {
    fontSize: 79.96,
    fontWeight: 800,
    lineHeight: 109.22,
    color: "#FFFFFF",
    fontFamily: "NunitoExtraBold",
  },
  temperatureWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  degreeIcon: {
    color: "white",
    fontSize: 80,
    fontWeight: 800,
  },
  tempSubtitle: {
    color: "#B9B9B9",
    fontSize: 19.99,
    fontWeight: 500,
    lineHeight: 27.3,
    marginRight: 10,
  },
  weatherParamsWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",
    paddingHorizontal: width * 0.05,
  },
  iconWrapper: {
    width: 237,
    height: 247,
    overflow: "hidden",
    marginBottom: 25.98,
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

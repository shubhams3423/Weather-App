import React  from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ForeCastComponent from "../screens/ForeCastComponent";
import AirQualityComponent from "../screens/AirQualityComponent";
import { View, Text, Dimensions } from "react-native";
const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get("screen").width;
const WeatherTabs = ({ weatherDetails }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        sceneStyle: { backgroundColor: "transparent" },
        tabBarContentContainerStyle: {
          justifyContent: "center",
          margin: "auto",
        },
        tabBarItemStyle: {
          maxHeight: 59.97,
        },
        tabBarStyle: {
          borderRadius: 14.99,
          backgroundColor: "rgba(64, 132, 223, 0.2)",
          marginHorizontal: 20,
          borderBottomWidth: 0,
          elevation: 0, // for android removes the shadow.
          shadowColor: "transparent", // for ios removes the shadow.
          overflow: "hidden",
        },
        tabBarLabel: ({ focused }) => (
          <View
            style={{
              backgroundColor: focused ? "#4084DF" : "transparent",
              width: (screenWidth - 90) / 2,
              height: 59.97,
              justifyContent: "center",
              borderRadius: 14.99,
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Text
              style={{
                fontSize: 19,
                lineHeight: 27.31,
                color: focused ? "#FFFFFF" : "#ffffffa1",
                fontWeight: focused ? "500" : "400",
              }}
            >
              {route.name}
            </Text>
          </View>
        ),
        tabBarIndicatorStyle: {
          height: 0,
          width: 0,
          backgroundColor: "transparent",
        },
      })}
    >
      <Tab.Screen
        name="Forecast"
        children={() => <ForeCastComponent weatherDetails={weatherDetails} />}
      />
      <Tab.Screen
        name="Air Quality"
        children={() => <AirQualityComponent weatherDetails={weatherDetails} />}
      />
    </Tab.Navigator>
  );
};

export default WeatherTabs;

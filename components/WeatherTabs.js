import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ForeCastComponent from "../screens/ForeCastComponent";
import AirQualityComponent from "../screens/AirQualityComponent";
import { View, Text } from "react-native";
const Tab = createMaterialTopTabNavigator();

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
          width: 300,
          margin: "auto",
          borderBottomWidth: 0,
          elevation: 0, // for android removes the shadow.
          shadowColor: "transparent", // for ios removes the shadow.
        },
        tabBarLabel: ({ focused }) => (
          <View
            style={{
              backgroundColor: focused ? "#4084DF" : "transparent",
              width: 150,
              height: 59.97,
              justifyContent: "center",
              paddingHorizontal: 20,
              borderRadius: 14.99,
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                lineHeight: 27.31,
                fontFamily: "NunitoExtraBold",
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

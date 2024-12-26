import { View, Text, StyleSheet } from "react-native";
import React from "react";

const GasInfo = ({ gases }) => {
  return (
    <View style={styles.airGases}>
      <View>
        <Text style={[styles.text, styles.airGasText]}>{gases.name}</Text>
      </View>
      <View>
        <Text style={[styles.text, styles.airGasQty]}>{gases.qty}</Text>
      </View>
      <View>
        <Text style={[styles.text, styles.airGasUnit]}>µg/mp{"\u00B3"}</Text>
      </View>
    </View>
  );
};

export default GasInfo;

const styles = StyleSheet.create({
  airGases: {
    gap: 4,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontFamily: "NunitoExtraBold",
  },
  airGasText: {
    fontSize: 20,
    fontWeight: "500",
  },
  airGasQty: {
    fontWeight: "500",
    fontSize: 20,
    marginTop: 6,
  },
  airGasUnit: {
    fontSize: 15,
    marginTop: 0,
  },
});

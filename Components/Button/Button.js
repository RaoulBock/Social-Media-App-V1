import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Button = ({ title }) => {
  return (
    <TouchableOpacity style={styles.outline}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  outline: {
    backgroundColor: "#0140c2",
    padding: 10,
  },
  title: {
    color: "white",
    fontWeight: "500",
    fontSize: 19,
  },
});

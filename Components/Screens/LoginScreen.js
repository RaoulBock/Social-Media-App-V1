import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity
} from "react-native";
import React from "react";
import { APP_PAGES } from "../../Context/settings";
import { AppContext } from "../../Context/AppContext";

const LoginScreen = () => {
  const { setNavPage } = React.useContext(AppContext);
  return (
    <View style={styles.outline}>
      <View style={styles.header}>
        <Text style={styles.text}>Sign in</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>Welcome Back</Text>
        <Text style={[styles.text, { color: "gray", fontSize: 12 }]}>
          Hello there, sign in to continue!
        </Text>
        <View style={{ marginVertical: 20 }}>
          <View style={styles.input_outline}>
            <Text style={styles.title}>Username or Email</Text>
            <TextInput placeholder={"Someone@something"} style={styles.input} />
          </View>
          <View style={styles.input_outline}>
            <Text style={styles.title}>{"Password"}</Text>
            <TextInput
              placeholder={"••••••••••"}
              secureTextEntry={true}
              style={styles.input}
            />
          </View>
          <TouchableOpacity style={styles.btn_outline}>
            <Text style={styles.btn_title}>{"Sign in"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.options}
            onPress={() => setNavPage(APP_PAGES.APP.REGISTER)}
          >
            <Text>
              Don't have an account{" "}
              <Text style={{ color: "#0041c2", fontWeight: "600" }}>
                Sign up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  outline: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    padding: 10
  },
  text: {
    color: "#0041c2",
    fontWeight: "700",
    fontSize: 22
  },
  body: {
    paddingHorizontal: 10
  },
  input: {
    marginVertical: 20
  },
  title: {
    color: "gray",
    fontWeight: "500",
    fontSize: 12,
    paddingVertical: 10
  },
  input: {
    backgroundColor: "#f8f9fb",
    padding: 10,
    borderRadius: 10
  },
  btn_outline: {
    backgroundColor: "#0140c2",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10
  },
  btn_title: {
    color: "white",
    fontWeight: "700",
    fontSize: 19,
    textAlign: "center"
  },
  options: {
    alignItems: "center",
    marginVertical: 20
  }
});

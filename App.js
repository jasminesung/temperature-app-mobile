import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button, Keyboard, AppState } from "react-native";
import axios from "axios";

import MyTextInput from "./components/TextInput";
import MyPicker from "./components/Dropdown";
import DismissKeyboard from "./components/DismissKeyboard";

export default function App() {

  useEffect(() => {
    console.log("temp", temp);
    console.log("base", base);
    console.log("result", result);
    console.log("unit", unit);

    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  });

  const appState = useRef(AppState.currentState);

  const handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      setClearInput(false);
    } else {
      setDefaultValues();
      setClearInput(true);
      console.log("App is in background.");
    }

    appState.current = nextAppState;
  };

  const [temp, setTemp] = useState(null);
  const [base, setBase] = useState("celsius");
  const [result, setResult] = useState(null);
  const [unit, setUnit] = useState("°F");
  const [clearInput, setClearInput] = useState(false);

  const setDefaultValues = () => {
    setTemp(null);
    setBase('celsius');
    setResult(null);
    setUnit('°F');
  }

  const handleTempChange = (tempValue) => {
    setResult(null);
    const tempFloat = parseFloat(tempValue).toFixed(2);
    setTemp(tempFloat);
  };

  const handleBaseChange = (baseValue) => {
    Keyboard.dismiss();
    setBase(baseValue);
  };

  const getUnit = () => {
    const unit = base === "celsius" ? "°F" : "°C";
    setUnit(unit);
  };

  const onPressConvert = (base, temp) => {
    Keyboard.dismiss();
    setResult(null);
    getUnit();
    axios(`https://us-central1-symmetric-sonar-299910.cloudfunctions.net/convert_temp?base=${base}&temp=${temp}`)
      .then((res) => {
        if (res.data) {
          setResult(res.data);
        } else {
          console.error("failed to convert temperature!");
        }
      })
      .catch((err) => {
        console.error("error", err);
      });
  };

  const Result = () => {
    return (
      <Text style={styles.resultText}>
        {result}&nbsp;{unit}
      </Text>
    );
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Text style={styles.header}>Convert Temperature🌡</Text>
        <View style={styles.tempWrapper}>
          <View style={styles.inputWrapper}>
            <MyTextInput clearInput={clearInput} onInputTemp={handleTempChange} />
          </View>
          <View style={styles.pickerWrapper}>
            <MyPicker onPickBase={handleBaseChange} style={styles.picker} />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            disabled={!temp || isNaN(temp)}
            onPress={() => onPressConvert(base, temp)}
            title="GO"
            color="dodgerblue"
            accessibilityLabel="Convert temperature"
          />
        </View>
        {result && <Result />}
        <StatusBar style="auto" />
      </View>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "40%",
    flexDirection: "column",
  },
  inputWrapper: {
    flex: 0.7,
    alignItems: "center",
  },
  pickerWrapper: {
    flex: 0.3,
    marginTop: "-20%",
  },
  tempWrapper: {
    height: "12%",
    flexDirection: "row",
    marginTop: "10%",
  },
  buttonWrapper: {
    height: "30%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  resultText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  picker: {
    marginTop: "-20%",
  },
});

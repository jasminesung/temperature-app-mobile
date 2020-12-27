import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
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
  });

  const [temp, setTemp] = useState(null);
  const [base, setBase] = useState("celsius");
  const [result, setResult] = useState(null);
  const [unit, setUnit] = useState("°F");

  const handleTempChange = (tempValue) => {
    setResult(null);
    const tempFloat = parseFloat(tempValue).toFixed(2);
    setTemp(tempFloat);
  };

  const handleBaseChange = (baseValue) => {
    setBase(baseValue);
  };

  const getUnit = () => {
    const unit = base === "celsius" ? "°F" : "°C";
    setUnit(unit);
  };

  const onPressConvert = (base, temp) => {
    getUnit();
    axios(`http://127.0.0.1:5000/convert?base=${base}&temp=${temp}`)
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
            <MyTextInput onInputTemp={handleTempChange} />
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

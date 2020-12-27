import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { ImagePropTypes } from "react-native";

const MyPicker = (props) => {
  const [selectedValue, setSelectedValue] = useState("celsius");

  return (
    <Picker
      selectedValue={selectedValue}
      style={{ height: 50 }}
      onValueChange={(value) => {
        setSelectedValue(value);
        props.onPickBase(value);
      }}
    >
      <Picker.Item label="°C" value="celsius" />
      <Picker.Item label="°F" value="fahrenheit" />
    </Picker>
  );
};

export default MyPicker;

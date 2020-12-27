import React from "react";
import { TextInput } from "react-native";

const MyTextInput = (props) => {
  const onInput = (temp) => {
    props.onInputTemp(temp);
  };

  return (
    <TextInput
      style={{
        height: 40,
        width: "80%",
        borderColor: "dodgerblue",
        borderWidth: 0.5,
      }}
      onChangeText={onInput}
      keyboardType="numeric"
    />
  );
};

export default MyTextInput;

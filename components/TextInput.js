import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";

const MyTextInput = (props) => {

  useEffect(() => {
    if (props.clearInput) {
      setInputValue('');
    }
  })

  const [ inputValue, setInputValue ] = useState('');

  const onInput = (temp) => {
    setInputValue(temp);
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
      value={inputValue}
      onChangeText={onInput}
      keyboardType="numeric"
    />
  );
};

export default MyTextInput;

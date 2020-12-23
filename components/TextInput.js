import React, { Component } from 'react';
import { TextInput, Keyboard } from 'react-native';

const MyTextInput = () => {
  const [value, onChangeText] = React.useState('');

  return (
    <TextInput
      style={{ height: 40, width: '80%', borderColor: 'powderblue', borderWidth: 0.5 }}
      onChangeText={text => onChangeText(text)}
      value={value}
      onBlur={() => Keyboard.dismiss()}
      keyboardType='numeric'
    />
  );
}

export default MyTextInput;
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import MyTextInput from './components/TextInput';
import MyPicker from './components/Dropdown';

export default function App() {

  const onPress = (e) => {
    console.log(e);
  }

  return (
    // <View style={styles.container}>
    //   <Text style={styles.header}>hihi</Text>
    // </View>
    <View style={styles.container}>
      <Text style={styles.header}>Convert Temperature🌡</Text>
      <View style={{flex: 1, flexDirection: 'row', marginTop: '10%'}}>
        <View style={styles.inputWrapper}>
        <MyTextInput />
        </View>
        <View style={styles.pickerWrapper}>
        <MyPicker style={styles.picker} />
        </View>
      </View>
       {/* <View style={styles.space64} /> */}
       <View style={{flex: 1}}>
       <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text>Press Here</Text>
      </TouchableOpacity>      
       </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '40%',
    flexDirection: 'column'
  },
  inputWrapper: {
    flex: 0.7,
    alignItems: 'center'
  },
  pickerWrapper: {
    flex: 0.3,
    marginTop: '-20%'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  row: {
    marginTop: '10%'
  },
  picker: {
    marginTop: '-20%'
  },
  space64: {
    height: 64,
    width: '100%'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});

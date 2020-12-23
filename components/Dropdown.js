import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';

const MyPicker = () => {
    const [selectedValue, setSelectedValue] = useState("celsius");
    return (
        <Picker
        selectedValue={selectedValue}
        style={{ height: 50 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="°C" value="celsius" />
        <Picker.Item label="°F" value="fahrenheit" />
      </Picker>
    )
}

export default MyPicker;

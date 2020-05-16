import React, { useState } from 'react';
import { View, Button,StyleSheet, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'react-moment';

const DateComponent = (props) => {

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const styles = StyleSheet.create({
        button: {
            padding: 10,
            width: 200
        }
    });

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || props.date;
        setShow(Platform.OS === 'ios');
        props.setDate(currentDate);
        console.log(currentDate);
        props.setIsScheduled(true);
        console.log('current date :' + props.isScheduled);
      };
    
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return ( 
        <View>
            {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={props.date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        />
            )}
            <View style={styles.button}><Button title='Add date' onPress={showDatepicker}/></View>
            <View style={styles.button}><Button title='Add time' onPress={showTimepicker}/></View>
            {props.isScheduled && <Moment element={Text}>{ props.date }</Moment>}
        </View>
     );
}
 
export default DateComponent;
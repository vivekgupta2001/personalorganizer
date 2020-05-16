import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button, TextInput, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {db} from '../config/firebasConfig';
import { CheckBox, Divider } from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ReminderDeleteAction from './components/reminders/ReminderDeleteAction';
import DateComponent from './components/common/DateComponent';
import Moment from 'react-moment';

const Reminders = (props) => {
    const styles = StyleSheet.create({
        screen: {
            justifyContent: "center",
            alignItems: "stretch",
            flex: 1,
            alignContent: "space-between",
            padding: 5
        },
        diolog: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            paddingTop: 30,
            backgroundColor: 'blue'
        },
        button: {
            padding: 10,
            width: 200
        },
        reminderText: {
            fontSize: 20,
            textAlignVertical: "center"
        }
    });

    const [addReminderVisible, setAddReminderVisible]= useState(false);
    const [reminderText, setReminderText] = useState('');
    const [reminders, setReminders] = useState([]);
    const [date, setDate] = useState(new Date(1598051730000));
    const [isScheduled, setIsScheduled] = useState(false);


    useEffect(() => {
        db.ref('/reminders').on('value', (snapShot) => {
            let data = snapShot.val();
            setReminders(data);
        });
    }, [addReminderVisible]);

    const addReminderHandler = () => {
        db.ref('/reminders').push( {
            reminderShortDesc: reminderText,
            reminderLongDesc: reminderText,
            reminderDate: date,
            completed: 'No'
        });
        console.log('Add reminder completed');
        setAddReminderVisible(false);
    }

    const onCompletion = (reminder, reminderKey) => {
        db.ref('/reminders/' + reminderKey).update({
            completed: 'Yes'
        });
    }

    const deleteHandler = (reminderKey) => {
        console.log('Delete ' + reminderKey);
        db.ref('/reminders/' + reminderKey).remove();
        console.log('Delete successful');
    }

    return ( 
        <View style={styles.screen}>
            {
                reminders !== null && Object.values(reminders).map((reminder, index) => {
                    let reminderKeys = Object.keys(reminders);
                    let reminderKey = reminderKeys[index];
                    return (
                        <View key={index}>
                            <Divider style={{ backgroundColor: 'blue' }} />
                            <Swipeable renderRightActions={
                                (progress, dragX) => {
                                const scale = dragX.interpolate({
                                    inputRange: [-100, 0],
                                    outputRange: [0.7, 0]
                                })
                                return (
                                    <>
                                    <TouchableOpacity onPress={deleteHandler.bind(this, reminderKey)}>
                                        <View
                                        style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', width: 150 }}>
                                        <Animated.Text
                                            style={{
                                            color: 'white',
                                            paddingHorizontal: 10,
                                            fontWeight: '600',
                                            transform: [{ scale }]
                                            }}>
                                            Delete
                                        </Animated.Text>
                                        </View>
                                    </TouchableOpacity>
                                    </>
                                )
                                }
                            }>
                                <View style={{flexDirection: 'row', alignItems: "stretch"}}>
                                    <CheckBox checked={reminder.completed === 'Yes' ? true : false}
                                    onPress={onCompletion.bind(this, reminder, reminderKey)}/>
                                    <View style={{flexDirection: "column"}}>
                                        <Text style={styles.reminderText}>{reminder.reminderShortDesc}</Text>
                                        {isScheduled ? <Moment element={Text} fromNow>{ reminder.reminderDate }</Moment> : <Text></Text>}
                                    </View>
                                </View>
                            </Swipeable>
                            <Divider style={{ backgroundColor: 'blue' }} />
                        </View>
                        
                    )
                })
            }
            <TouchableOpacity onPress={() => setAddReminderVisible(true)}
                style={{
                    borderWidth:1,
                    borderColor:'rgba(0,0,0,0.2)',
                    alignItems:'center',
                    justifyContent:'center',
                    width:70,
                    position: 'absolute',                                          
                    top: 30,                                                    
                    right: 10,
                    height:70,
                    backgroundColor:'#fff',
                    borderRadius:100,
                    }}
                >
                <Icon name="plus"  size={30} color="#01a699" />
            </TouchableOpacity>
            {   addReminderVisible &&
                <View style={styles.diolog}>
                    <Modal animationType="slide" transparent={false}
                        onRequestClose={() => {Alert.alert("Modal has been closed.");}}>
                        <Text>Add Reminder</Text>
                        <TextInput placeholder='Enter reminder text' multiline={true} onChange={(e) => {setReminderText(e.nativeEvent.text)}}/>
                        <DateComponent date={date} setDate={setDate} setIsScheduled={setIsScheduled} isScheduled={isScheduled}/>
                        <View style={styles.button}><Button title='Save' onPress={addReminderHandler}/></View>
                    </Modal>
                </View>
            }
        </View>
     );
}
 
export default Reminders;
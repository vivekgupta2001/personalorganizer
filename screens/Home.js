import React, { useEffect } from 'react';
import { View, StyleSheet,Text, Button } from 'react-native';
import { useSelector } from 'react-redux';


const Home = (props) => {
    const auth = useSelector(state => state.AuthenticationReducer);
    
    return ( 
    <View style={styles.screen}>
        <Text style={styles.text}>Welcome {auth.name}</Text>
        <View style={styles.button}><Button title='Reminders' onPress={() => props.navigation.navigate('Reminders')}/></View>
        <View style={styles.button}><Button title='Expenses' onPress={() => props.navigation.navigate('Expenses')}/></View>
        <View style={styles.button}><Button title='Budget' onPress={() => props.navigation.navigate('Budget')}/></View>
    </View> );
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        alignContent: "space-between"
    },
    button: {
        padding: 10,
        width: 200
    },
    text: {
        fontSize: 20,
        padding: 20
    }
});
 
export default Home;
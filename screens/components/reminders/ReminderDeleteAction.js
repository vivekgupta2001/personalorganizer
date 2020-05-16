import React from 'react';
import {TouchableOpacity, View, Animated} from 'react-native';

const ReminderDeleteAction = (progress, dragX) => {
 const scale = dragX.interpolate({
   inputRange: [-100, 0],
   outputRange: [0.7, 0]
 })
 return (
   <>
     <TouchableOpacity onPress={() => console.log("Delete me")}>
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

export default ReminderDeleteAction;
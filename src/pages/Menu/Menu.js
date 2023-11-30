import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

export default function Menu ({username}){
    const navigation = useNavigation();
    return(
        <View style={styles.containerMenu}>
                <TouchableOpacity style={styles.containerButtonMenu} onPress={()=>navigation.navigate('Feed', {username})}>
                    <Icon name="home" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerButtonMenu} onPress={()=>navigation.navigate('MyAcount',{username})}>
                    <Icon name="user-circle" size={40} color="black" />
                </TouchableOpacity>
            </View>
        )
}

const styles = StyleSheet.create({
    containerMenu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    containerButtonMenu: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: '5%',
        marginEnd: '5%'
    },

})

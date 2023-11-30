import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Principal() {
    const [isLogged, setIslogged] = useState(false)
    const navigation = useNavigation();
    useEffect(()=>{
        const getData = async () => {
            const jsonValue = await AsyncStorage.getItem('isLogged');
            const value = JSON.parse(jsonValue);           
            const username = value.username;
            const isLoggedIn = value.isLogged;
            setIslogged(isLoggedIn);        
            if(isLoggedIn === true){
                navigation.navigate('Feed', {username});
            }
        }
        
        getData();
    },[isLogged]);
        
        return (
            <View style={styles.container}>

            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="flipInY"
                    source={require('../../assets/img/icon/logosalao.jpg')}
                    style={{ width: '100%' }}
                    resizeMode='contain'
                />
            </View>

            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Bem Vindo. Agradecemos pelo seu Feedback</Text>             

                <TouchableOpacity onPress={()=> navigation.navigate('Logar')} style={styles.button}>
                    <Text style={[styles.buttonText, { color: '#fff' }]}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('CadastrarLogin')} style={styles.buttonCadastro}>
                    <Text style={[styles.buttonText, { color: '#fff' }]}>Cadastre</Text>
                </TouchableOpacity>
            </Animatable.View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    containerLogo: {
        flex: 2,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#ffc0cb',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
    },
    text: {
        color: '#fdfd',
        fontSize: 18
    },
    button: {
        position: 'absolute',
        backgroundColor: '#000000',
        borderRadius: 8,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '35%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonCadastro: {
        position: 'absolute',
        backgroundColor: '#000000',
        borderRadius: 8,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '17%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function CadastrarLogin() {
    const [username, setUsername] = useState('')
    const [senha, setSenha] = useState('');
    
    const data = {
        username:username,
        senha:senha
    };
    const navigation = useNavigation();

    

    const cadastrarUsuario = async () =>{
        if(!username || !senha ){
            Alert.alert('Preencher campos', 'Existem campos que não foram preenchidos');
        }
        else{
            try {
                const jsonValue = JSON.stringify(data);
                await AsyncStorage.setItem(username, jsonValue);
                Alert.alert('Cadastro efetuado com sucesso!')
                navigation.navigate('Logar');
            } catch (error) {
                console.error(e)
            }
        }
    }

    return(
        <View style={styles.container}>
            <Animatable.View animation={"fadeInLeft"} delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Cadastro de Usuário(a)</Text>
            </Animatable.View>

            <Animatable.View animation={'fadeInUp'} style={styles.containerForm}>
                <ScrollView style={{marginTop: 15}} showsVerticalScrollIndicator={false}>

                    <Text style={styles.title}>Usuário(a)</Text>
                    <TextInput placeholder='Digite usuário(a)' style={styles.input}  value={username} onChangeText={setUsername}></TextInput>

                    <Text style={styles.title}>Senha</Text>
                    <TextInput placeholder='Digite a senha' style={styles.input} secureTextEntry={true} value={senha} onChangeText={setSenha}></TextInput>
                  
                    <TouchableOpacity style={styles.button} onPress={cadastrarUsuario}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                </ScrollView>

            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffc0cb'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },
    containerForm: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 20,
        marginTop: 28,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    picker:{
        fontSize:40
    },  
    button: {
        backgroundColor: 'black',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        marginBottom: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }

})

import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logar() {
    const [senha, setSenha] = useState('');
    const [username, setUsername] = useState('');
    let toggle = true;
    
    

    const onSubmit = async ()=>{
        if(!username){
            alert('Digite o usuário(a)!');
        }
        else{

            try {
                const jsonValue = await AsyncStorage.getItem(username);
                const data = JSON.parse(jsonValue);
                
                if(data === null){
                    Alert.alert('Credenciais', 'Usuário não cadastrado');
                    return;
                }
                else if(!senha){
                    alert('Digite a senha!');
                }
                else if (data.senha === senha) {
                  
                    setUsername(data.username);
                    let loggedIn = {
                        isLogged: true,
                        username: username
                    };
                    const jsonValue = JSON.stringify(loggedIn);
                    await AsyncStorage.setItem('isLogged', jsonValue);                   
                    navigation.navigate('Feed',{username,toggle});
                }
                else{
                    Alert.alert('Credenciais', 'Senha incorreta');
                }
            } 
            catch (error) {
                console.log(error);
            }
        }       
    }
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Animatable.View animation={"fadeInLeft"} delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Olá...</Text>
            </Animatable.View>

            <Animatable.View animation={"fadeInUp"} style={styles.containerForm}>
                <Text style={styles.title}>Usuário(a)</Text>
                <TextInput placeholder="Digite seu usuário(a)" style={styles.input} value={username} onChangeText={setUsername}></TextInput>

                <Text style={styles.title}>Senha</Text>
                <TextInput secureTextEntry={true} value={senha} onChangeText={setSenha} placeholder="Digite sua senha" style={styles.input}></TextInput>

                <TouchableOpacity style={styles.button} onPress={()=>{onSubmit()}}>                   
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('CadastrarLogin')} style={styles.buttonRegistre}>
                    <Text style={styles.buttonTextRegistre}>Primeiro cadastro? Favor se Cadastrar</Text>
                </TouchableOpacity>

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
        paddingStart: '5%'
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
        paddingEnd: '5%'
    },
    title:{
        fontSize: 20,
        marginTop:28,
    },
    input: {
        borderBottomWidth: 1,
        height:40,
        marginBottom:12,
        fontSize:16
    },
    button:{
        backgroundColor: 'black',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegistre:{
        marginTop: 14,
        alignSelf: 'center',
    },
    buttonTextRegistre:{
        color: '#a1a1a1'
    }
    
})

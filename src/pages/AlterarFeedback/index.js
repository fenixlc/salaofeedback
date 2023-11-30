import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';


export default function AlterarFeedback({route}) {
    const {username,itemId, itemprestador, itemavaliacao,itemcomentario, toggle} = route.params;

    const [selecionaprestador, setselecionaprestador]  = useState(itemprestador); 

    const [selecionaavaliacao, setselecionaavaliacao]  = useState(itemavaliacao)
    
    const [comentario, setcomentario] = useState(itemcomentario)       
  
    const navigation = useNavigation();
    const untoggle = !toggle;

    

    const alterar = async () =>{
       
        if(!selecionaprestador || !selecionaavaliacao){
            Alert.alert('Preencher campos', 'Existem campos que não foram preenchidos');
        }
        else{
            try {
            
                const jsonArray = await AsyncStorage.getItem('feedback' + username);
                const convertedArray = JSON.parse(jsonArray);
                let array = [];
                for(let i = 0; i < convertedArray.length; i++){

                    if(convertedArray[i].id === itemId){

                        convertedArray[i].prestador= selecionaprestador;
                        convertedArray[i].avaliacao = selecionaavaliacao;
                        convertedArray[i].comentario = comentario;                
                    }

                    array.push(convertedArray[i]);
                }

                const jsonValue = JSON.stringify(array);
                const response = await AsyncStorage.setItem('feedback' + username, jsonValue);
                
                if(response !== null) {
                    Alert.alert('Modificação efetuado com sucesso!');
                    navigation.navigate('Feed', {username, untoggle});
                };
                
                
            } catch (error) {
                console.error(error);
            }
        }
    }
    return(
        <View style={styles.container}>
        <Animatable.View animation={"fadeInLeft"} delay={500} style={styles.containerHeader}>
            <Text style={styles.message}> Alterar FeedBack</Text>
        </Animatable.View>
        <Animatable.View animation={'fadeInUp'} style={styles.containerForm}>
            <ScrollView style={{marginTop: 15}} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Selecione o Prestador:</Text>
                    <Picker
                        selectedValue={selecionaprestador}
                        onValueChange={(itemValue, itemIndex) =>
                            setselecionaprestador(itemValue)
                        }>
                        <Picker.Item label="Escolha..." value={null} />
                        <Picker.Item label="Leonardo" value="Leonardo" />
                        <Picker.Item label="Juliete" value="Juliete" />
                        <Picker.Item label="Lorena" value="Lorena" />
                        <Picker.Item label="Brenda" value="Brenda" />
                    </Picker>                    
                    <Text style={styles.title}>Selecione a Avaliação:</Text>
                    <Picker
                        selectedValue={selecionaavaliacao}
                        onValueChange={(itemValue, itemIndex) =>
                            setselecionaavaliacao(itemValue)
                        }>
                        <Picker.Item label="Escolha..." value={null} />
                        <Picker.Item label="Excelente" value="Excelente" />
                        <Picker.Item label="Bom" value="Bom" />
                        <Picker.Item label="Regular" value="Regular" />
                        <Picker.Item label="Ruim" value="Ruim" />
                    </Picker>

                    <Text style={styles.title}>Comentário</Text>
                    <TextInput placeholder='Digite o comentário' style={styles.input}  value={comentario} onChangeText={setcomentario}></TextInput>
                
                <TouchableOpacity style={styles.button} onPress={() =>{alterar()}}>
                    <Text style={styles.buttonText}>Alterar FeedBack</Text>
                </TouchableOpacity>
            </ScrollView>
        </Animatable.View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffc0cb',
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

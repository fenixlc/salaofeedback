import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Menu from '../Menu/Menu';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Feed ({route}) {

    const navigation = useNavigation();
    const {username} = route.params;
    let {toggle, untoggle} = route.params;
    const[info, setInfo] = useState(null); 
    toggle = untoggle;
     
    useEffect(()=>{
        const getData = async (username) =>{
           try {
                let data = await AsyncStorage.getItem('feedback' + username);
                if(data === undefined || data === null){
                    data = '[]';
                }
                if(data.length > 0 || data[0] !== '['){
                    data = `${data}`;
                }
                setInfo(JSON.parse(data));
           } catch (error) {
                console.log('Erro no carregamento dos Feedback');
           }
        }
        getData(username);
    },[untoggle])

    const Excluir = async (itemId)=>{
        navigation.navigate('Excluir', {itemId, username, toggle});
    }

    const Alterar = (itemId, itemprestador,itemavaliacao, itemcomentario) =>{
        navigation.navigate('AlterarFeedback', {username, itemId, itemprestador, itemavaliacao, itemcomentario, toggle});
    }


    return (
        <View style={styles.container}>
            <Animatable.View style={styles.containerHeader} delay={600} animation={'fadeInLeft'}>
                <Text style={styles.message}>Feedback</Text>
            </Animatable.View>

            <Animatable.View style={styles.containerPasseios} animation={'fadeInUp'}>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('CadastrarFeedback', {username, toggle})}>
                    <Text style={styles.buttonText}>Cadastrar Feedback</Text>
                </TouchableOpacity>
                <FlatList
                    style={styles.title}
                    data={info}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <>
                            <Animatable.View animation={'bounceIn'} delay={600} style={styles.passeioText}>
                                <Text>Nome Prestador: {item.prestador}</Text>
                                <Text>Avaliação: {item.avaliacao}</Text>
                                <Text>Comentário: {item.comentario}</Text>
                              
                            </Animatable.View>
                            <View style={{display: 'flex',flexDirection: 'row-reverse', justifyContent:'space-between'}}>
                            <TouchableOpacity onPress={()=> Excluir(item.id)}>
                                <Text style={{color:'red'}}>Excluir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>Alterar(item.id, item.prestador,item.avaliacao, item.comentario)}>
                                <Text style={{color:'green'}}>Alterar</Text>
                            </TouchableOpacity>
                            </View>
                        </>
                    )}
                    />
            </Animatable.View>
            
            <Menu username ={username}/>
        </View>
    )
}
export const styles = StyleSheet.create({
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
    containerPasseios: {
        backgroundColor: '#fff',
        flex: 10,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        marginTop: 28,
    },
    passeioText: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#a1a1',
        borderRadius: 10,
        marginTop: 3,
        marginBottom: 3,
        paddingTop: "3%",
        paddingBottom: "3%",
        paddingStart: "5%"
    },
    button: {
        backgroundColor: 'black',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        marginBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

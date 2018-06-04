import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    SafeAreaView,

} from 'react-native';


import { Card, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Expo, {SQLite} from 'expo';

const db = SQLite.openDatabase('db.db');

const datasource=[];

export default class cadCliente extends React.Component {
    
    constructor(props){
        super(props)
        const params = this.props.navigation.state.params;
        if(params == undefined){
            this.state={
                codClie:'',
                nomeClie :'',
                emailClie:'',
                telefoneClie:'',
                idAtualizaCli:''
            } 
        }else{
            this.state={
                codClie:params.key.toString(),
                nomeClie : params.nomeCli,
                emailClie : params.emailCli,
                telefoneClie : params.telefoneCli,
                idAtualizaCli: params.key.toString()
            }
            
        }
    }   
    
    insertOuUpdateCli(){
        if(this.state.idAtualizaCli == '' || this.state.idAtualizaCli == null){
            this.Inserir(this.state.codClie, this.state.nomeClie, this.state.emailClie, this.state.telefoneClie);    
        }else{
            this.atualizaCliente(this.state.nomeClie, this.state.emailClie, this.state.telefoneClie, this.state.codClie)
        }
    }


    atualizaCliente(nomeClie,emailClie,telefoneClie,codClie){
        const{navigate} = this.props.navigation;
        db.transaction(
            tx=>{
                tx.executeSql('UPDATE clientes2 SET nomeCli = (?), emailCli = (?), telefoneCli = (?) WHERE codCli = (?)',[nomeClie,emailClie,telefoneClie,codClie]);
            }
        )
        navigate('listaClientes'); 
    }

    componentDidMount(){
        db.transaction(tx=>{
            tx.executeSql(
                'create table if not exists clientes2 (codCli integer, nomeCli text, emailCli text, telefoneCli text)'
            );
        });
    }
   
    Inserir(codClie, nomeClie, emailClie, telefoneClie) {
  
        const {navigate} = this.props.navigation;
        if(codClie == null || codClie == '' || nomeClie == null || nomeClie == ''||
           emailClie == null || emailClie == '' || telefoneClie == null || telefoneClie == ''){
            alert('Favor preencher todos os campos');
        }else{
            db.transaction(
                tx => {
                  tx.executeSql('insert into clientes2 (codCli, nomeCli, emailCli, telefoneCli) values (?, ?, ?, ?)', [codClie, nomeClie, emailClie, telefoneClie]);               
              },
            );
            
            navigate('listaClientes')
        }
      }


    static navigationOptions = ({navigation})=>({
        title: 'Cadastro de Clientes',
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#34495e',
          borderBottomColor: '#3498db',
          borderBottomWidth: 3,
        },
        headerTitleStyle: {
          fontSize: 18,
        },
    });
    
    render() { 
        return (
        <ScrollView>
            <View style={estilo.alinhamento}>
                <View style={estilo.alinhamentoComponentes}>
                    <TextInput
                        style={estilo.inputs}
                        placeholder='Digite o Código do Cliente'
                        value = {this.state.codClie}
                        onChangeText = {(codClie)=>this.setState({codClie})}
                    />
                </View>
                <View style={estilo.alinhamentoComponentes}> 
                    <TextInput
                        style={estilo.inputs}
                        placeholder='Digite o Nome do Cliente'
                        value = {this.state.nomeClie}
                        onChangeText = {(nomeClie)=>this.setState({nomeClie})}
                    />
                </View>
                <View style={estilo.alinhamentoComponentes}>  
                    <TextInput
                        style={estilo.inputs}
                        placeholder='Digite o Email do Cliente'
                        value = {this.state.emailClie}
                        onChangeText = {(emailClie)=>this.setState({emailClie})}
                    />
                </View>
                <View style={estilo.alinhamentoComponentes}> 
                    <TextInput
                        style={estilo.inputs}
                        placeholder='Digite o Telefone do Cliente'
                        value = {this.state.telefoneClie}
                        onChangeText = {(telefoneClie)=>this.setState({telefoneClie})}
                    />
                </View>  
            </View>
            <View style={estilo.alinhaBotao}>
                <TouchableOpacity style={estilo.botao}
                    onPress={()=> 
                        this.insertOuUpdateCli(
                            this.state.codClie, 
                            this.state.nomeClie, 
                            this.state.emailClie, 
                            this.state.telefoneClie,
                            
                            this.setState({codClie:null}),
                            this.setState({nomeClie:null}), 
                            this.setState({emailClie:null}), 
                            this.setState({telefoneClie:null}),

                            alert('Dados Inseridos com Sucesso'),
                            
                    )}
                >   
                    <Text style={estilo.textoBotao}> Cadastrar </Text>
                </TouchableOpacity>            
            </View>
        </ScrollView>
    )
  }
}

estilo = StyleSheet.create({
    alinhamento:{
        paddingTop:20,
        paddingHorizontal:20,       
    },
    inputs:{
        height:40,
        borderWidth:1,
        borderColor:'#2980b9',
        borderBottomWidth:2,
        borderRadius: 10,
        
        
    },
    botao:{
        flex:1,
        backgroundColor:'#34495e',
        paddingHorizontal:5,
        paddingVertical:10,
        marginTop:10,
        width:150,
        borderRadius: 30,
    },
    textoBotao:{
        textAlign:'center',
        fontSize:25,
        color:'#fff',
    },
    alinhaBotao:{
        flex:1,
        paddingTop:20,
        paddingHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
        justifyContent:'space-between',
    },
    alinhamentoComponentes:{
        flex:1,
        paddingTop:20,
    },
    listItem: {
        backgroundColor: '#3498db',
        marginTop: 20,
        padding: 30,
        
      },
      
      
})


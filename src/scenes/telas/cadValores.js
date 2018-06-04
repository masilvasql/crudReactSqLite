import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput 
} from 'react-native';

import EXPO,{SQLite} from 'expo';

const db = SQLite.openDatabase('db.db');

const dataSource=[];

export default class cadValores extends Component {

    static navigationOptions = {
        title: 'Cadastro de Valores',
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#34495e',
          borderBottomColor: '#3498db',
          borderBottomWidth: 3,
        },
        headerTitleStyle: {
          fontSize: 18,
        },
    };
    constructor(){
        super()
        this.state={
            codProduto:'1',
            descProduto:'1',
            precoCompra:'1',
            precoVenda: 17.90,
        }
    }  

    componentDidMount(){
        db.transaction(tx =>{
           tx.executeSql(
               'create table if not exists valores (codProd integer, qtd integer , valor numeric (10,15) , total numeric(10,15))'
           ); 
        });    
    }

    inserirProduto(codProduto, descProduto, precoCompra, precoVenda){
        const {navigate} = this.props.navigation;
        if(codProduto == '' || codProduto == null || descProduto == '' || descProduto == null
           || precoCompra == '' || precoCompra == null || precoVenda == '' || precoVenda == null){
                alert("Favor preencher todos os campos")    
           }else{
                db.transaction(
                    tx =>{
                        tx.executeSql('INSERT INTO valores (codProd, qtd, valor, total) values (1,9999999999,22,999999999)');
                    }    
                )
                navigate('listaValores');    // alterar aqui a tela
           }   
    }

  render() {
    return (
      <ScrollView>
        <View style={estiloProd.alinhamento}>
            <View style={estiloProd.alinhamentoComponentes}>
                <TextInput
                    style={estiloProd.inputs}
                    placeholder='Digite o Código do Valor'
                    onChangeText ={(codProduto)=>this.setState({codProduto})}
                    value = {this.state.codProduto}    
                />
            </View>
            <View style={estiloProd.alinhamentoComponentes}> 
                <TextInput
                    style={estiloProd.inputs}
                    placeholder='Digite a qtd'
                    onChangeText ={(descProduto)=>this.setState({descProduto})}
                    value = {this.state.descProduto}
                />
            </View>
            <View style={estiloProd.alinhamentoComponentes}>  
                <TextInput
                    style={estiloProd.inputs}
                    placeholder='Digite o valor'
                    onChangeText = {(precoCompra)=> this.setState({precoCompra})}
                    value = {this.state.precoCompra}
                />
            </View>
            <View style={estiloProd.alinhamentoComponentes}> 
                <TextInput
                    style={estilo.inputs}
                    placeholder='Digite o Preço de Venda do Produto'
                    onChangeText = {(precoVenda)=> this.setState({precoVenda})}
                    value = {this.state.precoVenda}
                />
            </View>
            
            <View style={estiloProd.alinhamentoComponentes}> 
            
                <TextInput
                    value = {(this.state.precoVenda )}    // descproduto
                />
            </View>   
        </View>
        <View style={estiloProd.alinhaBotao}>
            <TouchableOpacity style={estilo.botao}
                onPress={()=>
                    this.inserirProduto(
                        this.state.codProduto,
                        this.state. descProduto,
                        this.state.precoCompra,
                        this.state.precoVenda,
                        
                        this.setState({codProduto:null}),
                        this.setState({descProduto:null}),
                        this.setState({precoCompra:null}),
                        this.setState({precoVenda:null}),

                        alert('Dados Inseridos com Sucesso')
                    )   
                }
            >
                <Text style={estilo.textoBotao}> Cadastrar </Text>
            </TouchableOpacity>
        </View>
        
      </ScrollView>
    )
  }
}

estiloProd = StyleSheet.create({
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
    }
})


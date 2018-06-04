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

export default class cadProduto extends Component {

    static navigationOptions = {
        title: 'Cadastro de Produtos',
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

            
    constructor(props){
        
        super(props)
        const params = this.props.navigation.state.params;
 
        if(params == undefined){
            this.state={
                codProduto:'',
                descProduto:'',
                precoCompra:'',
                precoVenda: '',
                idEditavel : true,
            }
        }else{
            this.state={
                codProduto:params.key,
                descProduto:params.descProd,
                precoCompra:params.precoComp,
                precoVenda: params.precoVend,
                idAtualizar:params.key,
                idEditavel: false
            }        
        }
    }  

    componentDidMount(){
        db.transaction(tx =>{
           tx.executeSql(
               'create table if not exists produtos (codProd integer, descProd text, precoComp text, precoVend text)'
           ); 
        });    
        
    }

    insertOuUpdate(){
        if(this.state.idAtualizar == '' || this.state.idAtualizar == null){
            this.inserirProduto(this.state.codProduto, this.state.descProduto, this.state.precoCompra, this.state.precoVenda);    
        }else{
            this.atualizaProduto(this.state.descProduto, this.state.precoCompra, this.state.precoVenda, this.state.codProduto)
        }
    }

    inserirProduto(codProduto, descProduto, precoCompra, precoVenda){
        const {navigate} = this.props.navigation;
        if(codProduto == '' || codProduto == null || descProduto == '' || descProduto == null
           || precoCompra == '' || precoCompra == null || precoVenda == '' || precoVenda == null){
                alert("Favor preencher todos os campos")    
           }else{
                db.transaction(
                    tx =>{
                        tx.executeSql('INSERT INTO produtos (codProd, descProd, precoComp, precoVend) values (?,?,?,?)',[codProduto,descProduto,precoCompra,precoVenda]);
                    }    
                )
               
                navigate('listaProdutos');    
           }   
    }

    atualizaProduto(descProduto,precoCompra,precoVenda,codProduto){
        const{navigate} = this.props.navigation;
        db.transaction(
            tx=>{
                tx.executeSql('UPDATE produtos SET descProd = (?), precoComp = (?), precoVend = (?) WHERE codProd = (?)',[descProduto, precoCompra, precoVenda,codProduto]);
            }
        )
        navigate('listaProdutos'); 
    }

  render() {
    
    return (
      <ScrollView>
        <View style={estiloProd.alinhamento}>
            <View style={estiloProd.alinhamentoComponentes}>
                <TextInput
                    style={estiloProd.inputs}
                    placeholder='Digite o Código do Produto'
                    onChangeText ={(codProduto) => this.setState({codProduto})}
                    value = {this.state.codProduto}   
                    editable ={this.state.idEditavel} 
                />
            </View>
            <View style={estiloProd.alinhamentoComponentes}> 
                <TextInput
                    style={estiloProd.inputs}
                    placeholder='Digite a Descrição do Produto'
                    onChangeText ={(descProduto)=>this.setState({descProduto})}
                    value = {this.state.descProduto}
                />
            </View>
            <View style={estiloProd.alinhamentoComponentes}>  
                <TextInput
                    style={estiloProd.inputs}
                    placeholder='Digite o Preço de Compra do Produto'
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
        </View>
        <View style={estiloProd.alinhaBotao}>
         
            <TouchableOpacity style={estilo.botao}
                // onPress={()=>
                //     this.inserirProduto(
                        // this.state.codProduto,
                        // this.state. descProduto,
                        // this.state.precoCompra,
                        // this.state.precoVenda,
                        // this.setState({codProduto:null}),
                        // this.setState({descProduto:null}),
                        // this.setState({precoCompra:null}),
                        // this.setState({precoVenda:null}),

                //         alert('Dados Inseridos com Sucesso')
                //     ) 
                // }
                onPress={()=>
                    {
                        this.insertOuUpdate(
                            this.state.codProduto,
                            this.state. descProduto,
                            this.state.precoCompra,
                            this.state.precoVenda,
                            this.setState({codProduto:null}),
                            this.setState({descProduto:null}),
                            this.setState({precoCompra:null}),
                            this.setState({precoVenda:null}),
                        );
                    } 
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


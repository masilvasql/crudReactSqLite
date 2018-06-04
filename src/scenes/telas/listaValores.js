import React, { Component } from 'react'
import { 
  Text, 
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    SafeAreaView,
    TouchableHighlight
} from 'react-native'

import { Card, ListItem, Button,SearchBar  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Expo, {SQLite} from 'expo';

const db = SQLite.openDatabase('db.db');

dataSource = [];

export default class listaValores extends Component {

  constructor(){
    super()
    this.state={
      codProduto:'',
      descProduto:'',
      precoCompra:'',
      precoVenda:''
    }
  }

  static navigationOptions = ({navigation})=>({
    title: 'Lista de valores',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#34495e',
      borderBottomColor: '#3498db',
      borderBottomWidth: 3,
    },
    headerTitleStyle: {
      fontSize: 18,
    },
    headerRight:
      <TouchableOpacity onPress={()=>navigation.navigate("cadValores")}>  
        <Text style={{color:'#fff', fontSize:30}}>  + </Text>
      </TouchableOpacity>,
  });

  componentDidMount(){
    db.transaction(tx =>{
       tx.executeSql(
           'create table if not exists valores (codProd integer, qtd integer , valor numeric (10,15) , total numeric(10,15))'
       ); 
    });    
}

  listarProdutos(){
    db.transaction((tx)=>{
      tx.executeSql('SELECT codProd as key, qtd, valor, total FROM valores',[],(tx,results)=>{
        var len =  results.rows.length;
        
        if( len > 0){
          var row = results.rows._array;
          dataSource = row;
          this.setState({row});
        }        
      })
    })  
  }

  renderItem = (source)=>{
    dataSource=[];
    return(
      <TouchableOpacity
      onPress={()=>this.capturaDadosProduto(source.item)}
      >
        <Card>
          <View style={estiloListaCli.container}>
          
          <Icon name="archive" type="font-awesome" style={estiloListaCli.icones} > </Icon>
          <Text style={estiloListaCli.nomeCliente}> => cod {source.item.codProd} </Text>

          <Text style={estiloListaCli.nomeCliente}> {source.item.qtd} </Text>

          <Text style={estiloListaCli.nomeCliente}> {source.item.valor} </Text>

          <Text style={estiloListaCli.nomeCliente}> {source.item.total} </Text>

          <Text style={estiloListaCli.nomeCliente}> {source.item.key} </Text>

          </View> 

          <View style={estiloListaCli.alinhaEmail}> 
            <Text style={estiloListaCli.emailCliente} > {source.item.precoVend} </Text>
          </View> 

        </Card>
      </TouchableOpacity>  
    )
  }

  render() {
    if(this.state.descProduto == '' || this.state.descProduto==null){
      this.listarProdutos();
    }else{
      this.lerProdFiltro(this.state.descProduto) 
    }
    return (
      <ScrollView >
        <SearchBar
          lightTheme
          searchIcon={{ size: 24 }}
          placeholder='Pesquise aqui...' 
          onChangeText={(texto)=> this.setState({descProduto:texto}) }
          value = {this.state.descProduto}
          onPress={()=>
            this.lerProdFiltro(this.state.descProduto)
          }
          />
        <View >
          <SafeAreaView >
            <FlatList 
              contentContainerStyle={estiloListaCli.list}
              style={{ marginTop: 15 }}
              data= {dataSource}
              renderItem={this.renderItem}
            >
            </FlatList>
          </SafeAreaView>
        </View>
      </ScrollView>
    )
  }
}
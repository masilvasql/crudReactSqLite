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
    TouchableHighlight

} from 'react-native';


import { Card, ListItem, Button,SearchBar  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Expo, {SQLite} from 'expo';

const db = SQLite.openDatabase('db.db');

const datasource=[];

export default class listaClientes extends Component {
  constructor(){
    super()
    this.state={
      codCliente:'',
      nomeCliente:'',
      emailCliente:'',
      telefoneCliente:'',
    }
  }
  
  
    
    static navigationOptions = ({navigation})=>({
          title: 'Lista de Clientes',
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
          <TouchableOpacity onPress={()=>navigation.navigate("cadCliente")}>  
              <Text style={{color:'#fff', fontSize:30, fontWeight:'bold'}}>  + </Text>
          </TouchableOpacity>,
    });

    componentDidMount(){
      db.transaction(tx=>{
          tx.executeSql(
              'create table if not exists clientes2 (codCli integer, nomeCli text, emailCli text, telefoneCli text)'
          );
      });
    }

    ler(){
      db.transaction((tx)=>{
          tx.executeSql('Select codCli as key, nomeCli, emailCli, telefoneCli from clientes2',[],(tx,results)=>{
            var len = results.rows.length;
            datasource=[];
              if(len > 0 ){
                  var row = results.rows._array;
                  datasource = row ;
                  this.setState({row});
              }
          })
      })
    }

  lerComFiltro(nomeCliente){
    
    db.transaction((tx)=>{
        tx.executeSql('Select codCli as key, nomeCli, emailCli, telefoneCli from clientes2 where nomeCli like "%' + nomeCliente+'%"',[],(tx,results)=>{
            var len2 = results.rows.length;
            datasource=[];
            if(len2 > 0 ){
                var row2 = results.rows._array;
                datasource = row2 ;
                this.setState({row2});
            } 
        })
    })

}
  
  capturaDados = (itens)=>{
    this.props.navigation.navigate('infoCliente',itens)
  }
 
  renderItem = (source) => {
    
    datasource=[];
    
      return (
        
      <TouchableOpacity
        onPress={()=>this.capturaDados(source.item)}
      >
        <Card >
          <View style={estiloListaCli.container}> 

              <Icon name="user-circle" type="font-awesome" style={estiloListaCli.icones} > </Icon> 
              
              <Text style={estiloListaCli.nomeCliente}> {source.item.nomeCli} </Text>
              <Text style={estiloListaCli.emailCliente} > {source.item.key} </Text>
             
          </View>
          <View style={estiloListaCli.alinhaEmail}> 
                  <Text style={estiloListaCli.emailCliente} > {source.item.emailCli} </Text>
              </View> 
      </Card>
      </TouchableOpacity>
      )
    }
  

  render() {
    
    if(this.state.nomeCliente == '' || this.state.nomeCliente==null){
       this.ler();
    }else{
      this.lerComFiltro(this.state.nomeCliente) 
    }
    
    
    return (
      
      <ScrollView >
        <SearchBar
          lightTheme
          searchIcon={{ size: 24 }}
          placeholder='Pesquise aqui...' 
          onChangeText={(nomeCliente) => this.setState({nomeCliente:nomeCliente})}
        />

        <View >
          <SafeAreaView >
            <FlatList 
              contentContainerStyle={estiloListaCli.list}
              style={{ marginTop: 15 }}
              data= {datasource}
              renderItem={this.renderItem}
            >
            </FlatList>

          </SafeAreaView>
        </View>
      </ScrollView>
    )
    
  }
}

estiloListaCli = StyleSheet.create({
  icones:{
    color:'#34495e',
    fontSize:35,
    width:50,
  },
  nomeCliente:{
      fontWeight:'bold',
      fontSize:15,
  },
  emailCliente:{
    fontSize:15,
  },
  container:{  
    flexDirection:'row',

    justifyContent:'space-between',
    alignItems:'center',
  },
  alinhaEmail:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  list: {
    paddingHorizontal: 2,   
  },
})
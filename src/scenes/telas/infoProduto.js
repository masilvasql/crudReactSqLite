import React, { Component } from 'react'
import { Text, View,StyleSheet,ScrollView,Alert } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-circular-action-menu';


import listaProdutos from './listaProdutos';
import Expo, {SQLite} from 'expo';
const db = SQLite.openDatabase('db.db');

export default class infoProduto extends Component {



    componentDidMount() {
        db.transaction(tx=>{
          tx.executeSql(
            'create table if not exists produtos (codProd integer, descProd text, precoComp text, precoVend text)'
          );  
        });
      }

    static navigationOptions = ({navigation})=>({
        title: 'Dados do Produto',
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
    
    ShowAlertDialogDelete = (codProd) =>{
        Alert.alert(
          // Título
          'Deletar!',
          // Mensagem do Alert
          'Tem certeza que deseja excluir este Produto?',
          [
            // Primeiro botão = Botão de SIM
            {text: 'Sim', onPress: () => this.deletarProduto(codProd)},
            // Segundo botão = Botão de NÃO
            {text: 'Cancelar', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel'},
          ]
        )
    }

    ShowAlertDialogEditar = (codProd, descProd, precoComp, precoVend) =>{
        Alert.alert(
          // Título
          'Editar!',
          // Mensagem do Alert
          'Tem certeza que deseja editar este produto?',
          [
            // Primeiro botão = Botão de SIM
            {text: 'Sim', onPress: () => this.navegaParaEditar(codProd,descProd,precoComp,precoVend)},
            // Segundo botão = Botão de NÃO
            {text: 'Cancelar', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel'},
          ]
        )  
    }

    deletarProduto(codProduto){
        const {navigate} = this.props.navigation;
        db.transaction(
            tx =>{
                tx.executeSql('DELETE FROM produtos WHERE codProd = ?',[codProduto]);
            }    
        )
        navigate('listaProdutos');            
    }

    navegaParaEditar(item){
        this.props.navigation.navigate('cadProduto',item);
        console.log(item)  
    }


  render() {
    const params = this.props.navigation.state.params;
    return (
      <View>
            <Card title='Informações do Produto'  >
                <View style={estiloInfo.componentes}>
                    <Text style={estiloInfo.textos}> Codigo -> {params.key} </Text>
                    <Text style={estiloInfo.textos}> Descrição -> {params.descProd} </Text>
                    <Text style={estiloInfo.textos}> Preço de Compra -> {params.precoComp} </Text>
                    <Text style={estiloInfo.textos}> Preço de Venda -> {params.precoVend} </Text> 
                </View>
                
                <ActionButton buttonColor="rgba(41, 128, 185,1.0)" position='right'
                    icon={<Icon name="bars" type="font-awesome" style={estiloInfo.actionButtonIcon} > </Icon>}
                >
                    <ActionButton.Item buttonColor='#1abc9c' title="Excluir" onPress={() =>this.ShowAlertDialogDelete(params.key)}>
                        <Icon name="trash" type="font-awesome" style={estiloInfo.actionButtonIconFilho} > </Icon>
                    </ActionButton.Item>

                    <ActionButton.Item buttonColor='#1abc9c' title="Atualizar" onPress={() => this.ShowAlertDialogEditar(params)}>
                      <Icon name="edit" type="font-awesome" style={estiloInfo.actionButtonIconFilho} > </Icon>
                    </ActionButton.Item>                 
                </ActionButton>
            </Card >
      </View>
      
    )
  }
}

estiloInfo = StyleSheet.create({
    componentes:{
        flexDirection:'column',
        justifyContent:'space-around',
        
        backgroundColor:'#EDE7F6',
        flexWrap:'wrap',
    },
    textos:{
        fontSize:25
    },
    actionButtonIcon: {
        fontSize: 30,
        alignItems:'center',
        color: '#fff',
    },
    actionButtonIconFilho: {
        fontSize: 20,
        alignItems:'center',
        color: '#fff',
    }
    
})


import React, { Component } from 'react'
import { Text, View,StyleSheet,ScrollView,Alert } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import listaProdutos from './listaClientes';
import Expo, {SQLite} from 'expo';
const db = SQLite.openDatabase('db.db');

export default class infoCliente extends Component {

    constructor(props){
        super(props)
    } 

    static navigationOptions = ({navigation})=>({
        title: 'Dados do Cliente',
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
    
    ShowAlertDialogDeleteCliente = (codCli) =>{
        Alert.alert(
          // Título
          'Deletar!',
          // Mensagem do Alert
          'Tem certeza que deseja excluir este Cliente?',
          [
            // Primeiro botão = Botão de SIM
            {text: 'Sim', onPress: () => this.deletarCliente(codCli)},
            // Segundo botão = Botão de NÃO
            {text: 'Cancelar', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel'},
          ]
        )
    }

    ShowAlertDialogEditarCliente = (key, nomeCli, emailCli, telCli) =>{
        Alert.alert(
          // Título
          'Editar!',
          // Mensagem do Alert
          'Tem certeza que deseja editar este produto?',
          [
            // Primeiro botão = Botão de SIM
            {text: 'Sim', onPress: () => this.buscaDadosEditarCli(key, nomeCli, emailCli, telCli)},
            // Segundo botão = Botão de NÃO
            {text: 'Cancelar', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel'},
          ]
        )  
    }

    deletarCliente(codCli){
        const {navigate} = this.props.navigation;
        db.transaction(
            tx =>{
                tx.executeSql('DELETE FROM clientes2 WHERE codCli = ?',[codCli]);
            }    
        )
        navigate('listaClientes');            
    }

    buscaDadosEditarCli(itens){
        this.props.navigation.navigate('cadCliente',itens);    
    }

  render() {
    const params = this.props.navigation.state.params;
    return (
      <ScrollView>
            <Card title='Informações do Cliente'  >
            <View style={estiloInfo.componentes}>
                <Text style={estiloInfo.textos}> {params.key} </Text>
                <Text style={estiloInfo.textos}> {params.nomeCli} </Text>
                <Text style={estiloInfo.textos}> {params.emailCli} </Text>
                <Text style={estiloInfo.textos}> {params.telefoneCli} </Text>
            </View>
            <ActionButton buttonColor="rgba(41, 128, 185,1.0)" position='right'
                    icon={<Icon name="bars" type="font-awesome" style={estiloInfo.actionButtonIcon} > </Icon>}
                >
                    <ActionButton.Item buttonColor='#1abc9c' title="Excluir" onPress={() =>this.ShowAlertDialogDeleteCliente(params.key)}>
                        <Icon name="trash" type="font-awesome" style={estiloInfo.actionButtonIconFilho} > </Icon>
                    </ActionButton.Item>

                    <ActionButton.Item buttonColor='#1abc9c' title="Atualizar" onPress={() => this.ShowAlertDialogEditarCliente(params)}>
                      <Icon name="edit" type="font-awesome" style={estiloInfo.actionButtonIconFilho} > </Icon>
                    </ActionButton.Item>                 
                </ActionButton>
            </Card >
       
      </ScrollView>
    )
  }
}

estiloInfo = StyleSheet.create({
    componentes:{
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#EDE7F6'
    },
    textos:{
        fontSize:25
    },
    
})
import React, { Component } from 'react'

import { 
    Text, 
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

export default class MenuPrincipal extends Component {

    static navigationOptions = {
        title: 'Menu Principal',
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

  render() {
    
    const {navigate} = this.props.navigation;

    return (
      <View style ={styles.alinhamentoIcones}>
      
          <Icon name="cart-plus" style={styles.icones} onPress={()=>{navigate('listaProdutos')}} > 
            <Text style={styles.texto}>  Produtos </Text>
          </Icon>
          
          <Icon name="user-plus" style={styles.icones} onPress={()=>{navigate('listaClientes')}}> 
            <Text style={styles.texto}> Clientes </Text> 
          </Icon> 

          <Icon name="credit-card" style={styles.icones} onPress={()=>{navigate('listaValores')}}> 
            <Text style={styles.texto}> Preços </Text> 
          </Icon> 

      </View>
    )
  }
}

styles = StyleSheet.create({
    icones:{
        color:'#34495e',
        fontSize:90,
        alignItems:'center',
        paddingLeft:35,
        paddingBottom:45,
        width:150,
        textAlign: 'center',
      },
      alinhamentoIcones:{
          flex:1,
          height:60,
          paddingTop:20,
          paddingHorizontal:20,
          flexDirection:'row',
          alignItems:'center',
          // flexWrap:'wrap',
          justifyContent:'space-between',
      },
      texto:{
        fontSize:14,
      }
});
import React, { Component } from 'react';
import RestClient from 'react-native-rest-client';
import axios from 'axios';
import { ListItem,Card, Button  } from 'react-native-elements';
import { 
    Text, 
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    List,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Expo ,{SQLite} from 'expo';

const db = SQLite.openDatabase('db.db');

export default class listaSinc extends Component {

  static navigationOptions = {
    title: 'Lista Sinc',
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

   constructor() {
    super();
    this.state = {
      items: ""
    };
  }


  componentDidMount(){
    db.transaction(tx =>{
      tx.executeSql(
        'create table if not exists selectPatrick (codSelect int, ATIVO text, CDCLIFOR int, CDUF text, CPFCNPJ text, DEBAIRRO text, DEENDERECO text, DEOBS text, DEPRAZO text, NMCID text, NMCLIFOR text, NMFANTASIA text, NUFONE text, TPSTATUS text, VLSALDO numeric, VLSALDODEV numeric)'
      )
    })
  }

  componentWillMount () {
    axios.get('http://10.1.1.24:3000/adm')
    .then(resp => {
      // console.log(resp.data.result)
      this.setState({ items : resp.data.result })
    }).catch(e => console.log('error no catch: ', e))
  }

  parseData() {
    if (this.state.items) {
      console.log('tem registros');
      return this.state.items.map((data, i) => {      	 
        return (      
          <View style={styles.datalista}>
            <TouchableOpacity>
              <Card>
                <Text style={styles.textButton} key={i}>CDCLIFOR : {data.CDCLIFOR}</Text>                        
                <Text style={styles.textButton} >CDUF : {data.CDUF}</Text>                        
                <Text style={styles.textButton} >CPFCNPJ : {data.CPFCNPJ}</Text>    
              </Card>       
            </TouchableOpacity>             
          </View>
        );
      });
    }
  }
//if not exists (select * from selectPatrick where CDCLIFOR =${data2.CDCLIFOR}) begin
  insereDadosAxiosBanco(){
    if(this.state.items){
      return this.state.items.map((data2, id)=>{
          db.transaction(tx=>{
            tx.executeSql(`insert into selectPatrick (codSelect, ATIVO, CDCLIFOR, CDUF, CPFCNPJ, DEBAIRRO, DEENDERECO, DEOBS, DEPRAZO, NMCID, NMCLIFOR, NMFANTASIA, NUFONE, TPSTATUS, VLSALDO, VLSALDODEV) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `,[data2.CDCLIFOR, data2.ATIVO, data2.CDCLIFOR, data2.CDUF, data2.CPFCNPJ, data2.DEBAIRRO, data2.DEENDERECO, data2.DEOBS, data2.DEPRAZO, data2.NMCID, data2.NMCLIFOR, data2.NMFANTASIA, data2.NUFONE, data2.TPSTATUS, data2.VLSALDO, data2.VLSALDODEV]);
          })
          console.log('Dados inseridos com sucesso');
      });
    }
  }

  selectDadosSync(){
    db.transaction(tx =>{
      tx.executeSql("Select codSelect as key, ATIVO, CDCLIFOR, CDUF, CPFCNPJ, DEBAIRRO, DEENDERECO, DEOBS, DEPRAZO, NMCID, NMCLIFOR, NMFANTASIA, NUFONE, TPSTATUS, VLSALDO, VLSALDODEV From selectPatrick",[],(tx,result)=>{
        var len = result.rows.length;
        datasource = [];
        if(len > 0){
          var row = result.rows._array;
          datasource = row;
          this.setState({row});
        }
        console.log(datasource)
      });
    })
  }

  droparTabela(){
    db.transaction(tx =>{
      tx.executeSql("drop table selectPatrick");
    })
    console.log("tabela dropada com sucesso")
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      
      <View style ={styles.alinhamentoIcones}>
      <View style={estilo.alinhaBotao}>
      <TouchableOpacity
      style={estilo.botao}
        onPress={()=> this.selectDadosSync()}
      >
          <Text>
            Select 
          </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilo.botao}
        onPress={()=> this.insereDadosAxiosBanco()}
      >
          <Text>
             Inserir Dados
          </Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={estilo.botao}
        onPress={()=> this.droparTabela()}
      >
          <Text>
            dropar Tabela
          </Text>
      </TouchableOpacity>
      </View>
      
        {/* <ScrollView>
          {this.parseData()}
        </ScrollView>  */}

      </View>
    )  
  }
}

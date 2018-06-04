import { createStackNavigator } from 'react-navigation';

import MenuPrincipal from './scenes/telas/index';
import cadCliente from './scenes/telas/cadCliente';
import cadProduto from './scenes/telas/cadProduto';
import listaClientes from './scenes/telas/listaClientes';
import listaProdutos from './scenes/telas/listaProdutos';
import infoCliente from './scenes/telas/infoCliente';
import infoProduto from './scenes/telas/infoProduto'
import cadValores from './scenes/telas/cadValores';
import listaValores from './scenes/telas/listaValores'

const App2 = createStackNavigator({
  MenuPrincipal:{screen: MenuPrincipal},
  cadCliente:{screen:cadCliente},
  cadProduto:{screen:cadProduto},
  listaClientes:{screen:listaClientes},
  listaProdutos:{screen:listaProdutos},
  infoCliente:{screen:infoCliente},
  infoProduto:{screen:infoProduto},
  cadValores:{screen:cadValores},
  listaValores:{screen:listaValores},
});

export default App2;

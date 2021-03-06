import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';

import HomePage from './components/pages/HomePage';
import FoodManagePage from './components/pages/FoodManagePage';
import MenuManagePage from './components/pages/MenuManagePage';

import FoodStats from './components/statistics/FoodStats';

import MenuForm from './components/menu/forms/MenuForm';
import MenuView from './components/menu/menu/MenuView';
import MenuEditForm from './components/menu/forms/MenuEditForm';
import MenuDeleteForm from './components/menu/forms/MenuDeleteForm';

import OrderManagePage from './components/pages/OrderManagePage';
import OrderForm from './components/orders/forms/OrderForm';

import FoodForm from './components/foods/forms/FoodForm';

function App() {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />

      {/* Statistics */}
      <Route path="/statistics/food" exact component={FoodStats} />

      {/* Menu path */}
      <Route path="/menu/manage" component={MenuManagePage} />
      <Route path="/menu/create" component={MenuForm} />
      <Route path="/menu/:menuId/view" component={MenuView} />
      <Route path="/menu/:menuId/edit" component={MenuEditForm} />
      <Route path="/menu/:menuId/delete" component={MenuDeleteForm} />

      {/* Food paths */}
      <Route path="/food/manage" exact component={FoodManagePage} />
      <Route path="/food/create" exact component={FoodForm} />
      <Route path="/food/:foodId/edit" exact component={FoodForm} />

      {/* Order paths */}
      <Route path="/order/manage" component={OrderManagePage} />
      <Route path="/order/create" exact component={OrderForm} />
      <Route path="/order/:orderId/edit" exact component={OrderForm} />

    </Router>
  );
}

export default App;

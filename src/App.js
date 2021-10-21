import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';

import HomePage from './components/pages/HomePage';
import FoodManagePage from './components/pages/FoodManagePage';
import MenuManagePage from './components/pages/MenuManagePage';
import OrderManagePage from './components/pages/OrderManagePage';

import FoodForm from './components/foods/forms/FoodForm';

function App() {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />

      {/* Menu path */}
      <Route path="/menu/manage" component={MenuManagePage} />

      {/* Food paths */}
      <Route path="/food/manage" exact component={FoodManagePage} />
      <Route path="/food/create" exact component={FoodForm} />

      {/* Order paths */}
      <Route path="/order/manage" component={OrderManagePage} />

    </Router>
  );
}

export default App;

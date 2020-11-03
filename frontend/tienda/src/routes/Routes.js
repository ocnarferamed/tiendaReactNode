import  React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Signup from '../pages/Signup';
import Details from'../pages/Details';
import Cart from'../pages/Cart';

function Routes(){
  
    return (
      <BrowserRouter>
        <Switch>
          <Route  exact path="/" component={Login}/>
          <Route  exact path="/main" component={Main}/>
          <Route  exact path="/signup" component={Signup}/>
          <Route   path="/details/:id" component={Details}/>
          <Route   path="/cart/:cart" component={Cart}/>
        </Switch>
      </BrowserRouter>
      
     
    );
   
}
export default Routes;

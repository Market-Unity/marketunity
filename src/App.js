import React, { Component } from 'react';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Search from './components/Search.jsx';
import ProductList from './components/ProductList.jsx';
import { Route, Switch } from 'react-router-dom';
import {Container} from 'reactstrap';

import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      query : '',
      products : [
        {
          name: 'Batteries',
          url: 'www.amazon.com',
          price: 15,
          image: 'www.amazon.com/image',
          description: 'Just batteries'
        },
        {name: 'Playstation 4', price: 300}
      ]
    }
  }

  handleQuery = (event) => {
    event.preventDefault;
    this.setState({
      query : event.target.value
    });
    console.log(event.target.value);
    //POST request for searching products
    // axios.post('/search', {query : this.state.query}).then(function(response){
    //   this.setState = {products : response};
    // })
  }

  render() {
    return (
      <div className="App">
        <Navbar></Navbar>
        <Container>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/' render = {(props) =>
              <Search handleQuery = {this.handleQuery.bind(this)}></Search>
              }/>
            <Route path='/' render = {(props) =>
              <ProductList products = {this.state.products}></ProductList>
              }/>
            <Route path='/' component={ProductList}/>
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;

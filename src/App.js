import React, { Component } from 'react';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Search from './components/Search.jsx';
import ProductList from './components/ProductList.jsx';
import Product from './components/Product.jsx';
import FavoriteList from './components/FavoriteList.jsx';
import { Route, Switch } from 'react-router-dom';
import {Alert, Container} from 'reactstrap';

import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      products: [],
      favorites: [],
      visible: true,
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }
  
  getFavorites() {
    if ( window.sessionStorage.token) {
      axios.post('/getfavorites', { username: window.sessionStorage.username, token: window.sessionStorage.token})
        .then((res) => {
          this.setState({
            favorites: res.data
          });
        });
    }
  }

  changeQueryState(event) {
    event.preventDefault;
    this.setState({
      query: event.target.value
    });
  }

  sendQuery() {
    axios.post('/search', { query: this.state.query })
      .then((res) => {
        this.setState({
          products: res.data
        });
      });
  }

  sortItems() {
    this.setState({
      products: this.state.products.reverse()
    });
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  onFavAlert() {
    this.setState({ visible: 'block' });
  }

  saveItem(product) {
    axios.post('/saveitem', {
      username: window.sessionStorage.username,
      product: product,
      token: window.sessionStorage.token
    })
      .then((res) => {
        axios.post('/getfavorites', { username: window.sessionStorage.username, token: window.sessionStorage.token })
          .then((res) => {
            this.setState({
              favorites: res.data
            });
          });
      });
  }

  unsaveItem(product) {
    axios.post('/unsaveitem', { product: product, username: window.sessionStorage.username, token: window.sessionStorage.token })
      .then((res) => {
        this.setState({
          favorites: res.data
        });
      }).catch((err) => {
        console.log(err); 
      });
  }

  render() {
    return (
      <div className="App">
        <Alert id= "favAlert" color="warning" isOpen={this.state.visible} toggle={this.onDismiss} style={{display: this.state.visible}}>
          Please log in to add favorites
        </Alert>
        <Navbar></Navbar>
        <Container>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/favorites/' render = {(props) =>
              <FavoriteList favorites={this.state.favorites} unsaveItem={this.unsaveItem.bind(this)} saveItem={this.saveItem.bind(this)}></FavoriteList>
            }/>
            <Route path='/' render = {(props) =>
              <div>
                <Search
                  changeQueryState={this.changeQueryState.bind(this)}
                  sendQuery={this.sendQuery.bind(this)}>
                </Search>
                <ProductList favorites={this.state.favorites} unsaveItem = {this.unsaveItem.bind(this)} saveItem = {this.saveItem.bind(this)} sortItems = {this.sortItems.bind(this)} products = {this.state.products} onFavAlert = {this.onFavAlert.bind(this)}>
                </ProductList>
              </div>
            }/>
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;

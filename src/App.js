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
      products: [
        {
          name: 'Samsung - Galaxy J3 with 16GB Memory Cell Phone - Silver (AT&T)',
          url: 'https://api.bestbuy.com/click/-/5887123/pdp',
          price: 179.99,
          image: 'https://img.bbystatic.com/BestBuy_US/images/products/5887/5887123_sd.jpg',
          description: 'Android 7.0 Nougat4G LTE5" HD touch screenBluetooth'
        },
        {
          name: 'Samsung - Book Cover for Samsung Galaxy Tab S2 8 - Black',
          url: 'https://api.bestbuy.com/click/-/4346001/pdp',
          price: 59.99,
          image: 'https://img.bbystatic.com/BestBuy_US/images/products/4346/4346001_sd.jpg',
          description: 'Compatible with Samsung Galaxy Tab S2 8; polyurethane material; auto on/off function; 3 viewing angles'
        },
        {
          name: 'Samsung - Case for Samsung Galaxy S8 - Blue/clear',
          url: 'https://api.bestbuy.com/click/-/5851701/pdp',
          price: 19.99,
          image: 'https://img.bbystatic.com/BestBuy_US/images/products/5851/5851701_sb.jpg',
          description: 'Compatible with Samsung Galaxy S8'
        }
      ],
      favorites: [
        {
          name: 'Samsung - Galaxy J3 with 16GB Memory Cell Phone - Silver (AT&T)',
          url: 'https://api.bestbuy.com/click/-/5887123/pdp',
          price: 179.99,
          image: 'https://img.bbystatic.com/BestBuy_US/images/products/5887/5887123_sd.jpg',
          description: 'Android 7.0 Nougat4G LTE5" HD touch screenBluetooth'
        }
      ],
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
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

  getFavorites() {
    axios.get('/favorites')
      .then((res) => {
        this.setState({
          favorites: res.data
        });
      });
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  onFavAlert() {
    this.setState({ visible: 'block' });
  }

  saveItem(product) {
    axios.post('/saveitem', { product : product, token : window.sessionStorage.token })
      .then((res) => {
        this.setState({
          favorites: res.data
        });
      });
  }

  unsaveItem(product) {
    axios.post('/unsaveitem', { product : product, token : window.sessionStorage.token })
      .then((res) => {
        this.setState({
          favorites: res.data
        });
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
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/favorites/' render = {(props) =>
              <FavoriteList favorites = {this.state.favorites}></FavoriteList>
            }/>
            <Route path='/' render = {(props) =>
              <div>
                <Search
                  changeQueryState={this.changeQueryState.bind(this)}
                  sendQuery={this.sendQuery.bind(this)}>
                </Search>
                <ProductList unsaveItem = {this.unsaveItem.bind(this)} saveItem = {this.saveItem.bind(this)} sortItems = {this.sortItems.bind(this)} products = {this.state.products} onFavAlert = {this.onFavAlert.bind(this)}>
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

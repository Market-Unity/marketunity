import React, { Component } from 'react';
import Login from './components/Login.jsx';
import Search from './components/Search.jsx';
import Navbar from './components/Navbar.jsx';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      query : '',
      products : []
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
        <Login></Login>
        <Search handleQuery = {this.handleQuery.bind(this)}></Search>
      </div>
    );
  }
}

export default App;

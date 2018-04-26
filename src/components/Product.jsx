import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import "./css/ProductList.css"
import Product from './components/Product.jsx';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListGroup>
        <Product></Product>
      </ListGroup>
    );
  }
}

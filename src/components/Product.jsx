import React from 'react';
import {Badge, ListGroupItem} from 'reactstrap';
import "./css/Product.css"

export default class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListGroupItem className="justify-content-between">{this.props.product.name}<Badge pill>{this.props.product.price}</Badge></ListGroupItem>
    );
  }
}

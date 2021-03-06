import React from 'react';
import { Card, CardImg, CardText, CardBody, CardHeader, CardTitle, CardSubtitle, Button, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';
import './css/ProductList.css';
import Product from './Product.jsx';


export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      sortButtonName: 'Sort By Price: Low to High',
    };
  }

  toggle() {
    if (this.state.sortButtonName === 'Sort By Price: Low to High') {
      this.setState({
        sortButtonName: 'Sort By Price: High to Low'
      });
    } else {
      this.setState({
        sortButtonName: 'Sort By Price: Low to High'
      });
    }
  }

  buttonOnClick(e) {
    this.props.sortItems();
    this.toggle();
  }

  render() {
    return (
      <div>
        <CardHeader>
          <Row>
            <Col xs="6">Results:</Col>
            <Col xs="6"><Button size="sm" onClick={this.buttonOnClick.bind(this)}>{this.state.sortButtonName}</Button></Col>
          </Row>
        </CardHeader>
        {JSON.stringify(this.props.products) === '[]' ? //if the array is empty
          <h3>Search to see results from eBay and BestBuy!</h3> //show this prompt
          : 
          this.props.products.map((product) => { //else display results
            return <Product favorites={this.props.favorites} unsaveItem = {this.props.unsaveItem} saveItem = {this.props.saveItem} onFavAlert = {this.props.onFavAlert} product={product}/>;
          })
        }
      </div>
    );
  }
}

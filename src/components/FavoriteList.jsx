import React from 'react';
import { Alert, Row, Col, CardHeader, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './css/ProductList.css';
import Product from './Product.jsx';

export default class FavoriteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div>
        <CardHeader>
          <Row>
            <Col xs="6">Favorites:</Col>
          </Row>
        </CardHeader>
        {
          this.props.favorites.length > 0 ?
            this.props.favorites.map((product) => {
              return <Product unsaveItem={this.props.unsaveItem} saveItem={this.props.saveItem} onFavAlert={this.props.onFavAlert} product={product} />;
            })
            :
            <Alert color="primary" isOpen={this.state.visible} toggle={this.onDismiss}>
                Add some favorites!
            </Alert>
        }
      </div>
    );
  }
}

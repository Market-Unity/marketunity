import React from 'react';
import { Alert, Row, Col, CardHeader, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './css/ProductList.css';

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
            this.props.favorites.map((product) =>
              <Card>
                <CardImg top width="100%" src={product.image} alt="Card image cap" />
                <CardBody>
                  <CardTitle>{product.name}</CardTitle>
                  <CardSubtitle>{product.price}</CardSubtitle>
                  <CardText>{product.description}</CardText>
                  <Button href={product.url} color="primary">Buy</Button>
                </CardBody>
              </Card>
            )
            :
            <Alert color="primary" isOpen={this.state.visible} toggle={this.onDismiss}>
                Add some favorites!
            </Alert>
        }
      </div>
    );
  }
}

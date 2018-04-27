import React from 'react';
import { Row, Col, CardHeader, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./css/ProductList.css";

export default class FavoriteList extends React.Component {
  constructor(props) {
    super(props);
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
          this.props.favorites.map((product) => {
            return (
              <Card>
                <CardImg top width="100%" src={product.image} alt="Card image cap" />
                <CardBody>
                  <CardTitle>{product.name}</CardTitle>
                  <CardSubtitle>{product.price}</CardSubtitle>
                  <CardText>{product.description}</CardText>
                  <Button color="primary">Buy</Button>
                </CardBody>
              </Card>
            )
          })
        }
      </div>
    );
  }
}

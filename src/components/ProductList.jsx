import React from 'react';
import { Card, CardImg, CardText, CardBody, CardHeader, CardTitle, CardSubtitle, Button, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';
import './css/ProductList.css';
import StarOutline from 'react-icons/lib/md/star-outline';
import Star from 'react-icons/lib/md/star';


export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      sortButtonName: 'Sort By Price: Low to High'
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

  starOnClick(e) {
    var star = document.getElementByClass("star");
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
        {
          this.props.products.map((product) => {
            return <Card>
              <CardImg top width="100%" src={product.image} alt="Card image cap" />
              <CardBody>
                <CardTitle>{product.name}</CardTitle>
                <CardSubtitle>{product.price}</CardSubtitle>
                <CardText>{product.description}</CardText>
                <Button href={product.url}color="primary">Buy</Button>
                <Button onClick={this.starOnClick.bind(this)} color="warning" className="star"><StarOutline/></Button>
              </CardBody>
            </Card>;
          })
        }
      </div>
    );
  }
}

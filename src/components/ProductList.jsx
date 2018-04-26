import React from 'react';
import { Card, CardImg, CardText, CardBody, CardHeader, CardTitle, CardSubtitle, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./css/ProductList.css";

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <div>
        <CardHeader>
          Results
          <Dropdown group size="sm" direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              Sort By
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Price: Low to High</DropdownItem>
              <DropdownItem>Price: High to Low</DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
              </CardBody>
            </Card>
          })
        }
      </div>
    );
  }
}

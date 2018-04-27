import React from 'react';
import { Card, CardImg, CardText, CardBody, CardHeader, CardTitle, CardSubtitle, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './css/ProductList.css';

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


  render() {
    return (
      <div>
        <CardHeader>
          <div className="results">Results:</div>
          <Button className="float-right" onClick={this.buttonOnClick.bind(this)}>{this.state.sortButtonName}</Button>
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
            </Card>;
          })
        }
      </div>
    );
  }
}

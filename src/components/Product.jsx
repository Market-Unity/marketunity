import React from 'react';
import { Card, CardImg, CardText, CardBody, CardHeader, CardTitle, CardSubtitle, Button, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';
import './css/ProductList.css';
import StarOutline from 'react-icons/lib/md/star-outline';
import Star from 'react-icons/lib/md/star';


export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starFilled: false
    };
  }

  starOnClick(e) {
    //if user is logged in aka if session exists
    if (window.sessionStorage.token) {
      //toggle the star animation
      this.setState({
        starFilled: !this.state.starFilled
      });
    } else {
      alert('Please log in to add favorites');
    }
  }

  render() {
    return (
      <Card>
        <CardImg top width="100%" src={this.props.product.image} alt="Card image cap" />
        <CardBody>
          <CardTitle>{this.props.product.name}</CardTitle>
          <CardSubtitle>{this.props.product.price}</CardSubtitle>
          <CardText>{this.props.product.description}</CardText>
          <Button href={this.props.product.url} color="primary">Buy</Button>
          <Button onClick={this.starOnClick.bind(this)} color="warning" className="star">{this.state.starFilled ? <Star /> : <StarOutline />}</Button>
        </CardBody>
      </Card>
    );
  }
}

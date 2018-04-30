import React from 'react';
import { Alert, Card, CardImg, CardText, CardBody, CardHeader, CardTitle, CardSubtitle, Button, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';
import './css/ProductList.css';
import StarOutline from 'react-icons/lib/md/star-outline';
import Star from 'react-icons/lib/md/star';
import $ from 'jquery';



export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starFilled: false,
      favoritesString: this.props.favorites.map((obj) => { return JSON.stringify(obj); })
    };
    this.starOnClick = this.starOnClick.bind(this);
  }

  componentDidMount() {
    this.starAutoFill(this.props.product);
  }

  //on render, checks to see if the item's url is  in favoritesURL (this is an array of all
  //urls in the favorites basically acting as the primary key) if so, it completes the star animation
  starAutoFill(url) {
    if (this.state.favoritesString.indexOf(JSON.stringify(url)) !== -1) {
      this.setState({
        starFilled: true
      });
    }
  }

  starOnClick(product) {
    //if user is logged in aka if session exists
    if (window.sessionStorage.token) {
      //toggle the star animation
      this.setState({
        starFilled: !this.state.starFilled
      });
      this.props.saveItem(product);
    } else {
      //alert the user that they need to login
      this.props.onFavAlert();
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
          <Button onClick={() => this.starOnClick(this.props.product)} color="warning" className="star">{this.state.starFilled ? <Star /> : <StarOutline />}</Button>
        </CardBody>
      </Card>
    );
  }
}

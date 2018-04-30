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
    console.log(this.props.favorites);
  }

  //on render, checks to see if the item object stringified is in favoritesString 
  //(this is an array of all items stringified) if so, it completes the star animation
  //Within the favorites list, all items will be stared. In the product list, it depends on item
  starAutoFill(obj) {
    if (this.state.favoritesString.indexOf(JSON.stringify(obj)) !== -1) {
      this.setState({
        starFilled: true
      });
    }
  }

  starOnClick(product) {
    //if user is logged in aka if session exists
    if (window.sessionStorage.token) {
      //if the item has already been saved
      if (this.state.starFilled) {  
        //unsave
        this.props.unsaveItem(product);
        //changes star to unfilled
        this.setState({
          starFilled: false
        });
      } else {
        //save
        this.props.saveItem(product);
        //change star to filled
        this.setState({
          starFilled: true
        });
      }
      
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

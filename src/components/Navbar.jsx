import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import './css/Navbar.css';

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: window.sessionStorage.token
    };
    this.displayLogout = this.displayLogout.bind(this);
  }

  displayLogout() {
    console.log('Logged Out!');
    delete window.sessionStorage.token;
    this.props.history.push("/");
    this.setState({
      session: false
    });
    alert('Logged Out!');
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">
            <img src="https://image.ibb.co/cvsaP7/logo.png" className="nav-logo" alt="Armadillo"></img>Market-Unity
          </NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              {this.state.session ? <NavLink tag={Link} to="/favorites">Favorites</NavLink> : <NavLink tag={Link} to="/login">Favorites</NavLink>}
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
<<<<<<< HEAD
              {this.state.session ?
                <NavLink onClick={this.displayLogout}>Logout</NavLink>
                :
                <NavLink tag={Link} to="/login">Login</NavLink>
              } 
=======
              {this.state.session ? <NavLink onClick={this.displayLogout} tag={Link} to="/">Logout</NavLink> : <NavLink tag={Link} to="/login">Login</NavLink>}
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/signup">Sign Up</NavLink>
>>>>>>> 7abee262654cc0b7ff797d1581ac737e769de86f
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

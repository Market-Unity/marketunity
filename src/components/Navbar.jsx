import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
    this.setState({
      session: false
    });
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
              <NavLink tag={Link} to="/favorites">Favorites</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {this.state.session ?
                <NavLink onClick={this.displayLogout}>Logout</NavLink>
                :
                <NavLink tag={Link} to="/login">Login</NavLink>
              } 
            </NavItem>
            {this.state.session ? 
              <div></div> 
              : 
              <NavItem>
                <NavLink tag={Link} to="/signup">Sign Up</NavLink>
              </NavItem>
            }
          </Nav>
        </Navbar>
      </div>
    );
  }
}

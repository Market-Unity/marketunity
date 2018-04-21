import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import './css/Navbar.css';

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <img src="https://image.ibb.co/cvsaP7/logo.png" className="nav-logo" alt="Armadillo"></img>Market-Unity
          </NavbarBrand>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/favorites/">Favorites</NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/login/">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup/">Sign Up</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}

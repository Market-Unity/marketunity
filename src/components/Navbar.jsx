import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/Navbar.css';

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">
            <img src="https://image.ibb.co/cvsaP7/logo.png" className="nav-logo" alt="Armadillo"></img>Market-Unity
          </NavbarBrand>
<<<<<<< HEAD
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
=======
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/favorites">Favorites</NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/signup">Sign Up</NavLink>
              </NavItem>
            </Nav>
>>>>>>> 81fcd64fa8af66bd6c61148cd207b0ee2690586e
        </Navbar>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }
  render() {
    return(
      <div>
        <Navbar dark expand="md">
          <div className="justify-content-fluid">
            <NavbarToggler onClick={this.toggleNav} />
              <Collapse isOpen={this.state.isNavOpen} navbar>
                <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='logo' /></NavbarBrand>
                  <Nav navbar>
                    <NavItem>
                      <NavLink className="nav-link"  to='/'><span className="fa fa-users"></span> Nhân Viên</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to='/department'><span className="fa fa-address-card-o"></span> Phòng Ban</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link"  to='/salary'><span className="fa fa-money"></span> Bảng Lương</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
            </div>
         </Navbar>
      </div>
    );
  }
}

export default Header;
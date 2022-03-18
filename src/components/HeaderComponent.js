import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

  constructor(props) {
    super(props);

    
    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleLogin(event) {
    this.toggleModal();
    alert("Username: " + this.username.value + " Password: " + this.password.value
        + " Remember: " + this.remember.checked);
    event.preventDefault();
}

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
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
                  <Nav className="ml-auto" style={{ float: "right" }}navbar>
                    <NavItem>
                      <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                    </NavItem>
                  </Nav>
         </Navbar>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
              <ModalBody>
              <Form onSubmit={this.handleLogin}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" name="username"
                        innerRef={(input) => this.username = input} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" name="password"
                        innerRef={(input) => this.password = input}  />
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="remember"
                        innerRef={(input) => this.remember = input}  />
                        Remember me
                    </Label>
                </FormGroup>
                <Button type="submit" value="submit" color="primary">Login</Button>
              </Form>
              </ModalBody>
            </Modal>
      </div>
      
    );
  }
}

export default Header;
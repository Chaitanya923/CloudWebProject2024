import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Form,
  Input,
  Button,
} from 'reactstrap';
import { Outlet, Link } from "react-router-dom";
import PathConstants from './routes/PathConstants';
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isWebShopOpen, setIsWebShopOpen] = useState(false);
  const toggleWebShop = () => setIsWebShopOpen(!isWebShopOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" fixed="top" className="bg-body-tertiary">
        <div className="container-fluid">
        <NavbarBrand className='d-md-none' href="#">WebShop </NavbarBrand>
          <NavbarToggler onClick={toggleWebShop} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
                <NavItem><NavbarBrand href="#">WebShop</NavbarBrand></NavItem>
              <NavItem>
                <NavLink href={PathConstants.HOME}>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={PathConstants.PRODUCTS}>Product</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={PathConstants.ABOUT}>Contact</NavLink>
              </NavItem>
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle nav caret>
                  Categories
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="#">Men</DropdownItem>
                  <DropdownItem href="#">Female</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#">Accesories</DropdownItem>
                  <DropdownItem href="#">Shoes</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <Form className="d-flex" inline>
              <Input
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="me-2"
              />
              <Button color="outline-success" type="submit">Search</Button>
            </Form>
          </Collapse>
        </div>
      </Navbar>
      
      <Offcanvas isOpen={isWebShopOpen} toggle={toggleWebShop} direction="end">
        <OffcanvasHeader toggle={toggleWebShop}>
          WebShop
        </OffcanvasHeader>
        <OffcanvasBody>
          <Nav navbar className="justify-content-end flex-grow-1 pe-3">
          <NavItem>
                <NavLink href={PathConstants.HOME}>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={PathConstants.PRODUCTS}>Product</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={PathConstants.ABOUT}>Contact</NavLink>
              </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Dropdown
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="#">Action</DropdownItem>
                <DropdownItem href="#">Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#">Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Form className="d-flex mt-3" inline>
            <Input
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="me-2"
            />
            <Button color="outline-success" type="submit">Search</Button>
          </Form>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}

export default Header;

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
function Header({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isWebShopOpen, setIsWebShopOpen] = useState(false);
  const toggleWebShop = () => setIsWebShopOpen(!isWebShopOpen);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
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
            </Nav>
            <Form className="d-flex" inline  onSubmit={handleSearchSubmit}>
              <Input
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="me-2"
              value={searchTerm}
              onChange={handleSearchChange}
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

import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import StickySidebar from 'sticky-sidebar';
import './css/FilterSidebar.css'; 

const FilterSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.classList.add('overflow-hidden', 'vh-100');
    } else {
      document.body.classList.remove('overflow-hidden', 'vh-100');
    }
  }, [isMobile, isSidebarOpen]);

  return (
    <div>
      <div className={`overlay ${isSidebarOpen ? 'show' : ''}`}></div>
      <Container className="search-section">
        <Row className="main-content ml-md-0">
          <Col md={3} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar__inner">
              <h1 className="border-bottom filter-header d-flex d-md-none p-3 mb-0 align-items-center">
                <span className="mr-2 filter-close-btn" onClick={toggleSidebar}>
                  X
                </span>
                Filters
                <span className="ml-auto text-uppercase">Reset Filters</span>
              </h1>
              <div className="filter-body">
                {/* Seating Options */}
                <h2 className="border-bottom filter-title">Seating Options</h2>
                <div className="mb-30 filter-options">
                  <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="Indoor" defaultChecked />
                    <label className="custom-control-label" htmlFor="Indoor">Indoor</label>
                  </div>
                  <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="Outdoor" />
                    <label className="custom-control-label" htmlFor="Outdoor">Outdoor</label>
                  </div>
                </div>

                {/* Cuisines */}
                <h2 className="font-xbold body-font border-bottom filter-title">Cuisines</h2>
                <div className="mb-3 filter-options">
                  {['Chinese', 'Italian', 'Mexican', 'Thai', 'Gujarati', 'Panjabi', 'South-Indian'].map((cuisine) => (
                    <div className="custom-control custom-checkbox mb-3" key={cuisine}>
                      <input type="checkbox" className="custom-control-input" id={cuisine} />
                      <label className="custom-control-label" htmlFor={cuisine}>{cuisine}</label>
                    </div>
                  ))}
                </div>

                {/* Price Range */}
                <h2 className="font-xbold body-font border-bottom filter-title">Price Range</h2>
                <div className="mb-3 filter-options">
                  <input type="range" className="form-control-range" />
                  <div className="d-flex justify-content-between">
                    <span>$100</span>
                    <span>$10,000</span>
                  </div>
                </div>

                {/* Services */}
                <h2 className="border-bottom filter-title">Services</h2>
                <div className="mb-3 filter-options">
                  {['Breakfast', 'Lunch', 'Donner', 'Cafe', 'Brunch', 'Other'].map((service) => (
                    <div className="custom-control custom-checkbox mb-3" key={service}>
                      <input type="checkbox" className="custom-control-input" id={service} />
                      <label className="custom-control-label" htmlFor={service}>{service}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>

          <Col md={9} className="content">
            <div className="d-flex justify-content-between border-bottom align-items-center">
              <h2 className="title">Products</h2>
              <div className="filters-actions d-flex align-items-center">
                <Button className="btn filter-btn d-md-none" onClick={toggleSidebar}>Filter</Button>
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="sort-drop">
                  <DropdownToggle className="btn btn-transparent body-clr p-0 py-1 sm-font fw-400 sort-toggle">
                    <span className="mr-2 d-md-none">Sort</span>
                    <span className="d-md-inline-block ml-md-2 font-semibold">Newest First</span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem header>Sort by</DropdownItem>
                    <DropdownItem>Newest First</DropdownItem>
                    <DropdownItem>Lowest First</DropdownItem>
                    <DropdownItem>Highest First</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <Row className="row-grid">
              {[...Array(10)].map((_, index) => (
                <Col key={index} md={6} lg={4} xl={4}>
                  <Card>
                    <img src={`https://dummyimage.com/300X400/000/fff`} alt="Product" />
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FilterSidebar;

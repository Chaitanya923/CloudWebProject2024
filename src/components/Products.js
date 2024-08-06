import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import './css/FilterSidebar.css';
import ProductCard from './ProductCard';
import { get } from './ApiServices';

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

  //Data Fetching
  const [products, setProducts] = useState([]);
  var [filteredData, setfilteredData] = useState([]);

  const endpoints = '/products';
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await get(endpoints); // Call the API utility
        setProducts(data);
        setfilteredData(data);
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };

    fetchProducts();
  }, []);

  //Categories Selection & Filtering
  // State to track selected categories
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        // If category is already selected, remove it
        return prevSelected.filter((item) => item !== category);
      } else {
        // Otherwise, add it to the selected categories
        // filteredData = products.filter(item => selectedCategories.includes(item.category));
        return [...prevSelected, category];
      }
    });

  };

  // Function to handle filtering based on selected categories
  const handleFilter = () => {
    filteredData = products.filter(item => selectedCategories.includes("Kitchen"));
    console.log('Selected Categories:', selectedCategories,filteredData);
  };

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

                {/* Categories */}
                <h2 className="font-xbold body-font border-bottom filter-title">Categories</h2>
                <div className="mb-3 filter-options">
                  {['Kitchen', 'Bedroom', 'Living Room', 'Study Room'].map((categories) => (
                    <div className="custom-control custom-checkbox mb-3" key={categories}>
                      <input type="checkbox" className="custom-control-input" id={categories}
                        checked={selectedCategories.includes(categories)}
                        onChange={() => {
                          handleCheckboxChange(categories);
                          handleFilter(); // Call filter function when checkbox changes
                        }} />
                      <label className="custom-control-label" htmlFor={categories}>{categories}</label>
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
              </div>
            </div>
          </Col>

          <Col md={9} className="content">
            <div className="d-flex justify-content-between border-bottom align-items-center">
              <h2 className="title">Products</h2>
              <div className="filters-actions d-md-none d-flex align-items-center">
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
              {products.map((product, index) => (
                <Col lg="3" md="6" sm="12" key={index} className="mb-3 ">
                  <ProductCard
                    productAll={product}
                    imgSrc={product.image}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                  />
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

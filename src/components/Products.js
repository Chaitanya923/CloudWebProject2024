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
import { useOutletContext } from "react-router-dom";

const Products = () => {
  const { searchTerm } = useOutletContext();
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

  // Data Fetching
  const [products, setProducts] = useState([]);

  const endpoints = '/products';
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await get(endpoints); // Call the API utility
        setProducts(data);
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Categories Selection & Filtering
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([100, 10000]); // Initialize the price range

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((item) => item !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPriceRange([100, value]);
  };

  useEffect(() => {
    const filterProducts = () => {
      let filtered = products;

      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCategories.length > 0) {
        filtered = filtered.filter((product) =>
          selectedCategories.includes(product.category)
        );
      }

      filtered = filtered.filter((product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [searchTerm, selectedCategories, priceRange, products]);

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
                  {['Kitchen', 'Bedroom', 'Living Room', 'Study'].map((category) => (
                    <div className="custom-control custom-checkbox mb-3" key={category}>
                      <input type="checkbox" className="custom-control-input" id={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => {
                          handleCheckboxChange(category);
                        }} />
                      <label className="custom-control-label" htmlFor={category}>{category}</label>
                    </div>
                  ))}
                </div>

                {/* Price Range */}
                <h2 className="font-xbold body-font border-bottom filter-title">Price Range</h2>
                <div className="mb-3 filter-options">
                  <input 
                    type="range" 
                    className="form-control-range" 
                    min="100" 
                    max="10000" 
                    value={priceRange[1]} 
                    onChange={handlePriceChange} 
                  />
                  <div className="d-flex justify-content-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
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
              {filteredProducts.map((product, index) => (
                <Col lg="3" md="6" sm="12" key={index} className="mb-3">
                  <ProductCard
                    productAll={product}
                    imgSrc={product.ImageUrl}
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

export default Products;

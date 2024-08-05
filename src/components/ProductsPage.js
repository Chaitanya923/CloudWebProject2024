import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import FilterSidebar from './FilterSidebar';
import ProductsPageCard from './ProductsPageCard';
import './css/ProductsPage.css'; 

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTableView, setIsTableView] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <Row>
        <Col md="3">
          <FilterSidebar />
        </Col>
        <Col md="9">
          <div className="tools">
            <div className="settings">
              <Button id="view" onClick={() => setIsTableView(!isTableView)}>
                Switch View
              </Button>
            </div>
          </div>
          <div className={`products ${isTableView ? 'products-table' : ''}`}>
            {products.map((product) => (
              <ProductsPageCard key={product.id} product={product} isTableView={isTableView} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;

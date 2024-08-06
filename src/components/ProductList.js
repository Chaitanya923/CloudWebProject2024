import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ProductCard from './ProductCard';
import './css/ProductCard.css'; 
import { get } from './ApiServices';

const ProductList = ({category}) => {
  const [products, setProducts] = useState([]);

  const endpoints= '/products/category/' + category;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await get(endpoints); // Call the API utility
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <Row>
        {products.map((product, index) => (
          <Col lg="3" md="6" sm="12" key={index} className="mb-4">
            <ProductCard
              productAll= {product}
              imgSrc={product.ImageUrl}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;

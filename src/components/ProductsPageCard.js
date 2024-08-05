import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ProductsPageCard = ({ product, isTableView }) => (
  <Card className={isTableView ? 'd-flex flex-row' : 'mb-4'}>
    <div className={isTableView ? 'product-img-table' : 'product-img'}>
      <CardImg top width="100%" src={product.image} alt={product.title} />
    </div>
    <CardBody className={isTableView ? 'd-flex flex-column justify-content-center' : ''}>
      <CardTitle tag="h5">{product.title}</CardTitle>
      <CardText className="price">${product.price}</CardText>
      <CardText className="genre">DVD Rental</CardText>
    </CardBody>
  </Card>
);

ProductsPageCard.propTypes = {
  product: PropTypes.object.isRequired,
  isTableView: PropTypes.bool.isRequired,
};

export default ProductsPageCard;

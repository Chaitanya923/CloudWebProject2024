// src/components/ProductCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import './css/ProductCard.css'; 
import PathConstants from './routes/PathConstants';

const ProductCard = ({ productAll, imgSrc, title, description, price }) => {

  const handleCardClick = (id) => {
    window.location.href = PathConstants.PRODUCTDETAIL.replace(":id",productAll.id)
  };
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(PathConstants.CART, { state: { productAll } });
  };

  return (
    <div className="cont">
      <Card className="product-card">
        <div className="product-card__image" onClick={handleCardClick}>
          <CardImg
            top
            width="100%"
            src={imgSrc}
            alt="Red Nike Shoes"
          />
        </div>
        <CardBody className="product-card__info">
          
          <CardTitle tag="h2" className="product-card__title"  onClick={handleCardClick}>{title}</CardTitle>
          <CardText className="product-card__description"  onClick={handleCardClick}>
            {description}
          </CardText>
          <div className="product-card__price-row">
            <span className="product-card__price">${price}</span>
            {/* <a href={PathConstants.CART} > */}
            <Button color="primary" className="product-card__btn" onClick={handleBuyNow}>Buy Now</Button>
            {/* </a> */}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductCard;

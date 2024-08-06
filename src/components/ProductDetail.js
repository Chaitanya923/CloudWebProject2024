import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'reactstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaPinterest, FaStar, FaStarHalfAlt, FaShoppingCart } from 'react-icons/fa';
import './css/ProductDetail.css';
import { useParams , useNavigate } from 'react-router-dom';
import { get } from './ApiServices'; 
import PathConstants from './routes/PathConstants';

const ProductDetail = () => {
    const { id } = useParams();
  const [products, setProducts] = useState([]);
    const [imgId, setImgId] = useState(1);
    const images = [
        "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg",
        "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg",
        "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg",
        "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg"
    ];

    useEffect(() => {
        const handleResize = () => slideImage();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [imgId]);

    const slideImage = () => {
        const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
        document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    };

    useEffect(() => {
        slideImage();
    }, [imgId]);

    
  const endpoints= `/products/${id}` ;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await get(endpoints); // Call the API utility
        setProducts(data);
        
  console.log({products})
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };

    fetchProducts();
  }, []);

  const navigate = useNavigate();
  const productAll = products
  const handleBuyNow = () => {
    navigate(PathConstants.CART, { state: { productAll } });
  };
    return (
        <Container className="card-wrapper">
            <div className='card'>
                <Row >
                    <Col md="6" className="product-imgs">
                        <div className="img-display">
                            <div className="img-showcase">
                                    <img src={products.ImageUrl} alt={'image'} />
                                
                            </div>
                        </div>
                        {/* <div className="img-select">
                            {images.map((img, index) => (
                                <div className="img-item" key={index}>
                                    <a href="#" onClick={(e) => { e.preventDefault(); setImgId(index + 1); }}>
                                        <img src={img} alt={`shoe thumbnail ${index + 1}`} />
                                    </a>
                                </div>
                            ))}
                        </div> */}
                    </Col>
                    <Col md="6" className="product-content">
                        <h2 className="product-title">{products.title}</h2>
                        {/* <a href="#" className="product-link">Visit Nike Store</a> */}
                        <div className="product-rating">
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                            <span>{products.rate}</span>
                        </div>
                        <div className="product-price">
                            {/* <p className="last-price">Old Price: <span>$257.00</span></p> */}
                            <p className="new-price">New Price: <span>${products.price} </span></p>
                        </div>
                        <div className="product-detail">
                            <h2>About this item:</h2>
                            <p>{products.description}</p>
                            <ul>
                                <li>Available: <span>In stock</span></li>
                                <li>Category: <span>{products.category}</span></li>
                                <li>Shipping Area: <span>All over the world</span></li>
                                <li>Shipping Fee: <span>Free</span></li>
                            </ul>
                        </div>
                        <div className="purchase-info">
                            {/* <input type="number" min="0" value="1" /> */}
                            <Button className="btn btn-primary" color="primary" onClick={handleBuyNow}>
                                Buy Now<FaShoppingCart />
                            </Button>
                            {/* <Button color="danger">Compare</Button> */}
                        </div>
                        <div className="social-links">
                            <p>Share At:</p>
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><FaTwitter /></a>
                            <a href="#"><FaInstagram /></a>
                            <a href="#"><FaWhatsapp /></a>
                            <a href="#"><FaPinterest /></a>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default ProductDetail;

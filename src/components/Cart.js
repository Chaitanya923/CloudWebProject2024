import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Input,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Cart.css";
import { useLocation } from 'react-router-dom';
import PayPalButton from "./PayPalButton";
import { post } from "./ApiServices";
import axios from "axios";


function Cart() {

  const location = useLocation();
  const product = location.state?.productAll;
  // var quantity = 1;
  const [amount, setAmount] = useState((product.price + 30).toFixed(2)); // Initial amount with default quantity 1

  useEffect(() => {
    setAmount((quantity * product.price + 30).toFixed(2));
  }, [quantity, product.price]);

  const handlePaymentSuccess = async (order) => {
    // Handle successful payment here
    console.log('Payment was successful!', order);
        // Gather order data
        const orderData = {
          name: document.getElementById('firstname').value,
          lastname: document.getElementById('lastname').value,
          email: document.getElementById('email').value,
          address: document.getElementById('adress').value+","+document.getElementById('city')+","+document.getElementById('country')+","+document.getElementById('postcode'),
          paymentid: order.id, // Assuming PayPal returns an ID in the order object
          quantity: quantity,
          productid: product.id, // Assuming the product object has an ID
          amount: amount,
          orderdate: new Date().toISOString().split('T')[0] // Get current date in YYYY-MM-DD format
        };
    
        try {
          const response = await axios.post('http://localhost:3000/api/orders', orderData);
          console.log('Order insertion response:', response.data);
        } catch (error) {
          console.error('Error inserting order:', error);
        }
      };

  var [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleRemoveProduct = () => {
    // Implement product removal logic here
    console.log("Product removed");
  };

  // const handleCheckOut = () => {
  //   const price = (quantity * product.price + 30).toFixed(2);
  // }

  return (
    <Container className="cart-page mt-5">
      <Row>
        <Col md="8" className="cart-details">
          <h1>Cart Details</h1>
          <Table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Sub Total</th>
                <th>Remove Product</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={product.ImageUrl}
                    alt="Product"
                    className="img-fluid"
                  />
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>
                  <div className="quantity-form d-flex align-items-center">
                    <Button
                      className="quantity-button"
                      onClick={handleDecrement}
                    >
                      -
                    </Button>
                    <Input
                      type="text"
                      id = "quantity"
                      className="quantity mx-2 text-center"
                      value={quantity}
                      readOnly
                      style={{ width: "50px" }}
                    />
                    <Button
                      className="quantity-button"
                      onClick={handleIncrement}
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td>₹ {(quantity * product.price).toFixed(2)}</td>
                <td>
                  <Button
                    color="danger"
                    className="remove-button"
                    onClick={handleRemoveProduct}
                  >
                    ✖ Remove
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>

          <form>
				<div className="form-row">
					<div className="col-md-6 form-group">
						<label for="firstname">First Name</label>
						<input type="text" className="form-control" id="firstname" placeholder="First Name"/>
						<div className="invalid-feedback">
							Valid first name is required.
						</div>
					</div>

					<div className="col-md-6 form-group">
						<label for="lastname">Last Name</label>
						<input type="text" className="form-control" id="lastname" placeholder="Last Name"/>
						<div className="invalid-feedback">
							Valid last name is required.
						</div>
					</div>
				</div>

				<div className="form-group">
						<label for="email">Email</label>
						<input type="email" className="form-control" id="email" placeholder="you@example.com" required/>
				</div>

				<div className="form-group">
					<label for="adress">Address</label>
					<input type="text" className="form-control" id="adress" placeholder="1234 Main Street" required/>
					<div className="invalid-feedback">
						Please enter your shipping address.
					</div>
				</div>

				<div className="form-group">
					<label for="address2">Address 2
						<span className="text-muted">(Optional)</span>
					</label>
					<input type="text" className="form-control" id="adress2" placeholder="Flat No"/>
				</div>

				<div className="row">
					<div className="col-md-4 form-group">
						<label for="country">Country</label>
						<select type="text" className="form-control" id="country">
							<option value>Choose...</option>
							<option>United Kingdom</option>
						</select>
						<div className="invalid-feedback">
							Please select a valid country.
						</div>
					</div>

					<div className="col-md-4 form-group">
						<label for="city">City</label>
						<select type="text" className="form-control" id="city">
							<option value>Choose...</option>
							<option>London</option>
						</select>
						<div className="invalid-feedback">
							Please provide a valid city.
						</div>
					</div>
						
					<div className="col-md-4 form-group">
						<label for="postcode">Postcode</label>
						<select type="text" className="form-control" id="postcode">
							<option value>Choose...</option>
							<option>NW6 2LS</option>
						</select>
						<div className="invalid-feedback">
							Postcode required.
						</div>
					</div>
				</div>
			</form>
        </Col>
        <Col md="4" className="cart-summary">
          
          <p>Total Products: ${(quantity * product.price).toFixed(2)}</p>
          <p>Delivery charges: $30</p>
          <h3>Grand Total: ${(quantity * product.price + 30).toFixed(2)}</h3>
          {/* <Button color="success" className="checkout-button mt-3" onClick={handleCheckOut}>
            Checkout
          </Button> */}
          
      <PayPalButton amount={(quantity * product.price + 30)} onSuccess={handlePaymentSuccess} />
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
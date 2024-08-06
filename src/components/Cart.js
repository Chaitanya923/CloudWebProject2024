import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Row, Col, Table, Button, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Cart.css";
import { useLocation } from 'react-router-dom';
import PayPalButton from "./PayPalButton"; // Ensure PayPalButton is imported

function Cart() {
  const location = useLocation();
  const product = location.state?.productAll;

  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState((product.price + 30).toFixed(2)); // Initial amount with default quantity 1

  useEffect(() => {
    setAmount((quantity * product.price + 30).toFixed(2));
  }, [quantity, product.price]);

  const handleIncrement = useCallback(() => setQuantity(prevQuantity => prevQuantity + 1), []);
  const handleDecrement = useCallback(() => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  }, []);

  const handleRemoveProduct = () => {
    // Implement product removal logic here
    console.log("Product removed");
  };

  const handlePaymentSuccess = (order) => {
    // Handle successful payment here
    console.log('Payment was successful!', order);
  };

  const memoizedPayPalButton = useMemo(() => (
    <PayPalButton amount={amount} onSuccess={handlePaymentSuccess} />
  ), [amount]);

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
                <label htmlFor="firstname">First Name</label>
                <input type="text" className="form-control" id="firstname" placeholder="First Name" />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>

              <div className="col-md-6 form-group">
                <label htmlFor="lastname">Last Name</label>
                <input type="text" className="form-control" id="lastname" placeholder="Last Name" />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="adress">Address</label>
              <input type="text" className="form-control" id="adress" placeholder="1234 Main Street" required />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address2">Address 2
                <span className="text-muted">(Optional)</span>
              </label>
              <input type="text" className="form-control" id="adress2" placeholder="Flat No" />
            </div>

            <div className="row">
              <div className="col-md-4 form-group">
                <label htmlFor="country">Country</label>
                <select type="text" className="form-control" id="country">
                  <option value>Choose...</option>
                  <option>United Kingdom</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>

              <div className="col-md-4 form-group">
                <label htmlFor="city">City</label>
                <select type="text" className="form-control" id="city">
                  <option value>Choose...</option>
                  <option>London</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid city.
                </div>
              </div>

              <div className="col-md-4 form-group">
                <label htmlFor="postcode">Postcode</label>
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
          <h3>Grand Total: ${amount}</h3>
          {memoizedPayPalButton}
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;

import React, { useContext, useEffect, useState } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotal, token, food_list, cartitems, url } = useContext(StoreContext); 
  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  // Handler for input changes
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to place the order
  const placeorder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    if (food_list && food_list.length > 0) {
      food_list.map((item) => {
        let itemID = item._id.toString();
        if (cartitems[itemID] && cartitems[itemID] > 0) {
          let itemInfo = { ...item };
          itemInfo["quantity"] = cartitems[itemID]; 
          orderItems.push(itemInfo);  
        }
      });
    }

    // Only proceed if there are order items
    if (orderItems.length === 0) {
      alert("No items in the cart to place the order.");
      return;
    }

    // Prepare the order data
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotal() + 2,
    };

    try {
      // Make the API request to place the order
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url); // Redirect to payment session
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      alert("Failed to place the order. Please try again.");
    }
  };
const navigate = useNavigate();
useEffect(() => {
  if(!token){
    navigate("/cart")
  }else if(getTotal() === 0){
    navigate("/cart")
  }
},[token])
  return (
    <form className='place-order' onSubmit={placeorder}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" placeholder='First Name' name='firstname' onChange={onChangeHandler} value={data.firstname} />
          <input required type="text" placeholder='Last Name' name='lastname' onChange={onChangeHandler} value={data.lastname} />
        </div>
        <input required type="email" placeholder='Email' name='email' onChange={onChangeHandler} value={data.email} />
        <input required type="text" placeholder='Street' name='street' onChange={onChangeHandler} value={data.street} />
        <div className="multi-fields">
          <input required type="text" placeholder='Country' name='country' onChange={onChangeHandler} value={data.country} />
          <input required type="text" placeholder='City' name='city' onChange={onChangeHandler} value={data.city} />
        </div>
        <div className="multi-fields">
          <input required type="text" placeholder='ZIP-CODE' name='zipcode' onChange={onChangeHandler} value={data.zipcode} />
          <input required type="text" placeholder='Phone Number' name='phone' onChange={onChangeHandler} value={data.phone} />
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotal()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotal() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotal() === 0 ? 0 : getTotal() + 2}</b>
            </div>
          </div>
          <button type='submit'>Proceed To Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

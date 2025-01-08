import React, { useContext } from 'react'
import "./Cart.css"
const Cart = () => {
  const{cartitems, food_list, removeFromCart, getTotal, url} = useContext(StoreContext)
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index)=>{
          if(cartitems[item._id] > 0){
            return (
              <>
              <div className='cart-items-title cart-items-item'>
              <img src={url+"/images/"+item.image} alt="" />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{cartitems[item._id]}</p>
              <p>${item.price * cartitems[item._id]}</p>
              <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>
            </div>
            <hr />
              </>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
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
              <p>${getTotal()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotal()===0?0:getTotal() + 2}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>Proceed To Checkout</button>
        </div>
        <div className="promo">
          <div>
            <p>Enter Promo</p>
            <div className='cart-promo-input'>
                <input type="text" placeholder='promo code'/>
                <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
export default Cart

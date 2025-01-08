import React, { useContext } from 'react'
import "./FoodItem.css"
const FoodItem = ({id, name, price, description, image}) => {
  const {cartitems,addToCart,removeFromCart,url} = useContext(StoreContext);
  return (
    <div className='food-item'>
      <div className="food-item-container">
        <img src={url+"/images/"+image} alt={name} className='food-item-image'/>
        {!cartitems[id]
        ?<img src={assets.add_icon_white} className='add' onClick={() =>addToCart(id)}/>
        :<div className='food-item-counter'>
            <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)}/>
            <p>{cartitems[id]}</p>
            <img src={assets.add_icon_green} onClick={()=>addToCart(id)}/>
            </div>}
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
            <p>{name}</p>
            <img src={assets.rating_starts}/>
        </div>
        <p className="food-item-desription">{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>
    </div>
  )
}
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
export default FoodItem

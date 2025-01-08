import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
  const [image, setimage] = useState(false);
  const [data, setdata] = useState({
    name:'',
    description:'',
    price:'',
    category:'Salad',
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata(data=> ({
      ...data,[name]:value
    }))
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image",image);
    const response = await axios.post(`${url}/api/food/add`, formData)
    if(response.data.success){
      setdata({
        name:'',
        description:'',
        price:'',
        category:'Salad',
      })
      setimage(false)
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  }
  
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input type="file" id='image' hidden required onChange={(e)=>setimage(e.target.files[0])} />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input type="text" name='name' placeholder='type here' onChange={onChangeHandler} value={data.name}/>
        </div>
        <div className='add-product-description flex-col'>
          <p>Product Description</p>
          <textarea name="description" rows="6" placeholder='write content' onChange={onChangeHandler} value={data.description} required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category"  onChange={onChangeHandler}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Veg">Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input type="Number"  onChange={onChangeHandler} value={data.price} name='price' placeholder='$20'/>
          </div>
        </div>
        <button type='submit' className='add-button'>ADD</button>
      </form>
      
    </div>
  )
}

export default Add

import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category, setcategory}) => {    
  return (
    <div className='ExploreMenu' id="ExploreMenu">
        <h1>Explore Our Menu</h1>
        <p className='ExploreMenuText'>Choose from a diverse menu of cuisines</p>
        <div className='ExploreMenuList'>
            {menu_list.map((item, index) => {
                return (
                    <div key = {index}className='ExploreMenuListItem' onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)}>
                        <img src={item.menu_image} alt="menu image" className={category===item.menu_name?"active":""}/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}
export default ExploreMenu

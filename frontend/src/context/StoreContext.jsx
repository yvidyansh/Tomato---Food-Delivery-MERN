import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {
    const [cartitems, setcartitems] = useState({})
    const [token, settoken] = useState("");
    const [food_list, setfood_list] = useState([])
    const url = "https://tomato-food-delivery-mern-backendd.onrender.com"
    const addToCart = async(itemID) =>{
        if(!cartitems[itemID]){
            setcartitems((prev) => ({...prev,[itemID]:1}))
        }else{
            setcartitems((prev) => ({...prev,[itemID]:prev[itemID]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add", {itemID}, {headers: {token}})
        }
    }
    const removeFromCart = async(itemID) =>{
        setcartitems((prev) => ({...prev,[itemID]:prev[itemID]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove", {itemID}, {headers: {token}})
        }
    }
    
    const getTotal = () => {
        let total = 0;
        for(const item in cartitems){
            if(cartitems[item] > 0){
                let iteminfo = food_list.find((product) => product._id===item)
                total+=iteminfo.price * cartitems[iteminfo._id]
            }

        }
        return total;
    }
    const fetchFoodList = async () => {
        const response = await axios.get(url+'/api/food/list');
        setfood_list(response.data.data)
    }
    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get", {}, {headers: {token}});
        setcartitems(response.data.cartData);
    }
    useEffect(() =>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                settoken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])
    const contextValue = {
        food_list,
        cartitems,
        setcartitems,
        addToCart,
        removeFromCart,
        getTotal,
        url,
        token,
        settoken
    }
    return (
        <StoreContext.Provider value = {contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider

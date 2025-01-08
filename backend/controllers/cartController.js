import usermodel from "../models/userModel.js";

// add to cart

const addToCart = async (req, res) => {
    try{
        let userData = await usermodel.findOne({_id: req.body.userId})
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemID]){
            cartData[req.body.itemID] = 1;
        }else{
            cartData[req.body.itemID] += 1;
        }
        await usermodel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Added to cart"})
    }catch(error){
        console.log(error);
        res.json({success: false, message: "Something Went Wrong in cartController.js"})
    }
}

// remove from cart

const removeFromCart = async (req, res) => {
    try{
        let userData = await usermodel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(cartData[req.body.itemID] > 0){
            cartData[req.body.itemID] -= 1;
        }
        await usermodel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Removed from cart"})
    }catch (error){
        console.log(error);
        res.json({success: false, message: "Something Went Wrong in cartController.js"})
    }
}

// get cart info

const getCart = async (req, res) => {
    try {
        let userData = await usermodel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success: true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Couldn't fetch your cart"})
    }
}

export {addToCart, removeFromCart, getCart}
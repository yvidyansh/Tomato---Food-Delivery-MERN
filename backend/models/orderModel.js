import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: {type: String, required: true},
    items:{type:Array, required:true},
    amount:{type: Number, required: true},
    address : {type: Object, required: true},
    status : {type: String, required: true, default:"Food Processing"},
    date: {type: Date, default:Date.now()},
    payement:{type: Boolean, default: false}
})

const ordermodel = mongoose.models.order || mongoose.model("order", orderSchema);

export default ordermodel;
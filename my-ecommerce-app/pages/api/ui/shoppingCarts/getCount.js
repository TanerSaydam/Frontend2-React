import dbConnect from "@/database/mongodb";
import ShoppingCart from "@/models/ShoppingCart";
import request from "@/services/request";

export default function handle(req,res){
    request(res, async()=> {
        dbConnect();
        const {userId} = req.body;

        const shoppingCarts = await ShoppingCart.find({userId: userId});
        res.json({count: shoppingCarts.length});
        res.json();
    })
}
import dbConnect from "@/database/mongodb";
import Order from "@/models/Order"
import Product from "@/models/Product";
import ShoppingCart from "@/models/ShoppingCart";
import request from "@/services/request"
import {v4 as uuidv4} from 'uuid';

export default function handle(req,res){
    request(res,async()=> {
        dbConnect();
        const {userId} = req.body;
        const shoppingCarts = await ShoppingCart.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                }
            },
            {
                $match: {userId:userId}
            }
        ]);

        for(let x of shoppingCarts){
            const product = await Product.findOne({_id: x.productId});
            if(product.stock >= x.quantity){
                product.stock -= x.quantity;
                if(product.stock === 0) product.isActive = false;
                await Product.findByIdAndUpdate(x.productId, product);

                const order = new Order({
                    _id: uuidv4(),
                    userId: userId,
                    productId: x.productId,
                    quantity: x.quantity,
                    price: x.products[0].price,
                    date: new Date(),
                    isCompleted: false,
                    isPaymentCompleted: true,
                    status: "Onay Bekliyor",
                    isReject: false,
                    trackingNumber: ""
                });
    
                await order.save();
    
                await ShoppingCart.findByIdAndRemove(x._id);
            }
        }

        res.json({message: "Sipariş kaydınız oluşturuldu!"});
    });
}
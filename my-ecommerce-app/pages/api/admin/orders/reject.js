import dbConnect from "@/database/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import request from "@/services/request";

export default function handle(req,res){
    request(res, async()=> {
        dbConnect();
        const {id} = req.body;
        const order = await Order.findOne({_id:id});
        order.isCompleted = true;
        order.isReject = true;
        order.status = "Sipariş Reddedildi";

        await Order.findByIdAndUpdate(id, order);

        const product = await Product.findOne({_id: order.productId});
        product.stock += order.quantity;
        await Product.findByIdAndUpdate(order.productId, product);

        res.json({message: "Sipariş reddedildi!"});
    });
}
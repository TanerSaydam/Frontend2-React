import dbConnect from "@/database/mongodb";
import Order from "@/models/Order";
import request from "@/services/request";

export default function handle(req,res){
    request(res, async()=> {
        dbConnect();
        const {id,trackingNumber} = req.body;
        const order = await Order.findOne({_id:id});        
        order.status = "Sipariş Kargoya Verildi";
        order.trackingNumber = trackingNumber;

        await Order.findByIdAndUpdate(id, order);

        res.json({message: "Sipariş kargoya verildi!"});
    })
}
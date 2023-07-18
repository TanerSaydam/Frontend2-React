import dbConnect from "@/database/mongodb";
import Order from "@/models/Order";
import request from "@/services/request";

export default function handle(req,res){
    request(res,async()=> {
        dbConnect();
        const {id} = req.body;
        const order = await Order.findById(id);
        order.status = "Teslim Alındı";
        order.isCompleted = true;
        await Order.findByIdAndUpdate(id, order);
        res.json({message: "Ürün teslim alındı olarak işaretlendi!"});
    });
}
import dbConnect from "@/database/mongodb";
import Order from "@/models/Order";
import request from "@/services/request";

export default function handle(req,res){
    request(res, async()=> {
        dbConnect();
        const {id} = req.body;
        const order = await Order.findOne({_id:id});        
        order.status = "Sipariş Onaylandı";

        await Order.findByIdAndUpdate(id, order);

        res.json({message: "Sipariş onaylandı!"});
    });
}
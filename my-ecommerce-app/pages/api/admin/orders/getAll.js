import dbConnect from "@/database/mongodb";
import Order from "@/models/Order";
import request from "@/services/request";

export default function handle(req,res){
    request(res, async()=> {
        dbConnect();
        const {sellerId} = req.body;

        const orders = await Order.aggregate([
            {
                $lookup:{
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "users"
                  }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                  }
            },
            {
                $unwind: "$products"
              },
              {
                $match: {"products.sellerId": sellerId}
              }
        ]);

        res.json(orders);
    })
}
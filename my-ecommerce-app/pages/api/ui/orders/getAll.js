import dbConnect from "@/database/mongodb";
import Order from "@/models/Order";
import request from "@/services/request";

export default function handle(req,res){
    request(res,async()=> {
        dbConnect();
        const {userId} = req.body;

        const orders = await Order.aggregate([           
            {
                $lookup: {
                    from: "products",
                    let: { "productId": "$productId" },
                    pipeline: [
                        {
                            $match:{
                                $expr: { $eq: [ "$_id", "$$productId" ] }
                            }
                        },
                        {
                            $lookup:{
                                from: "sellers",
                                localField: "sellerId",
                                foreignField: "_id",
                                as: "seller"
                            }
                        }
                    ],
                    as: "products"
                }
            },
            {
              $match: {"userId": userId}
            }
        ]);

        res.json(orders);
    })
}

import dbConnect from "@/database/mongodb";
import Order from "@/models/Order";
import request from "@/services/request";

export default function handle(req,res){
    request(res, async()=> {
        dbConnect();
        const {productId} = req.body;

        const orders = await Order.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "users"
                  }
            },
            {
                $match: {productId: productId}
            }
        ])
        let fiveStar = 0;
        let fourStar = 0;
        let threeStar = 0;
        let twoStar = 0;
        let oneStar = 0;
        let average = 0;
        let totalOrders = 0;

        for(let x of orders){
            if(x.rate === 5){
                fiveStar++;
                totalOrders++;
            }else if(x.rate === 4){
                fourStar++;
                totalOrders++;
            }else if(x.rate === 3){
                threeStar++;
                totalOrders++;
            }else if(x.rate === 2){
                twoStar++;
                totalOrders++;
            }else if(x.rate === 1){
                oneStar++;
                totalOrders++;
            }
        }         

        // Ortalama hesaplama
        average = (5*fiveStar + 4*fourStar + 3*threeStar + 2*twoStar + oneStar) / totalOrders;


        const resultData = {
            fiveStar: fiveStar,
            fourStar: fourStar,
            threeStar: threeStar,
            twoStar: twoStar,
            oneStar: oneStar,
            average: average,
            orders: orders
        };

        res.json(resultData);
    })
}
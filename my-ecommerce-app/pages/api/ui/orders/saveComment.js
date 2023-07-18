import dbConnect from "@/database/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import request from "@/services/request";

export default function handle(req,res){
    request(res, async()=> {
        dbConnect();
        const data = req.body;
        const order = await Order.findOne({_id: data._id});
        order.rate = +data.rate;
        order.comment = data.comment;
        await Order.findByIdAndUpdate(data._id, order);

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
                $match: {productId: order.productId}
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

        const product = await Product.findById(order.productId);
        product.average = average;
        await Product.findByIdAndUpdate(order.productId,product);

        res.json({message: "Sipariş yorumu güncellendi!"});
    });
}
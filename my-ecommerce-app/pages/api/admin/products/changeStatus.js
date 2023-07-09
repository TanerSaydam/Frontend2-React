import dbConnect from "@/database/mongodb";
import Product from "@/models/Product";
import request from "@/services/request";

export default function handle(req,res){
    request(res,async()=> {
        dbConnect();
        const {_id} = req.body;
        const product = await Product.findOne({_id: _id});        
        product.isActive = !product.isActive;

        await Product.findByIdAndUpdate(_id, product);
        res.json({message: "Ürün durumu güncellendi"})
    })
}
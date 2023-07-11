import dbConnect from "@/database/mongodb";
import Product from "@/models/Product";
import request from "@/services/request";

export default function handle(req,res){
    request(res, async()=> {
        dbConnect();
        const {_id} = req.body;

        //todo: sipariş kontrolü
        
        await Product.findOneAndRemove({_id: _id});
        res.json({message: "Ürün başarıyla silindi!"});
    })
}
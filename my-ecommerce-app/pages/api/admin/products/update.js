import dbConnect from "@/database/mongodb";
import Product from "@/models/Product";
import request from "@/services/request";

export default function handle(req,res){
    request(res, async()=> {
        dbConnect();
        const data = new Product(req.body);

        await Product.findByIdAndUpdate({_id: data._id}, data);
        res.json({message: "Güncelleme işlemi başarılı!"});
    })
}
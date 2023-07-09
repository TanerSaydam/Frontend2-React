import dbConnect from "@/database/mongodb";
import Product from "@/models/Product";
import request from "@/services/request";
import {v4 as uuidv4} from 'uuid';

export default function handle(req,res){
    request(res,async()=> {
        dbConnect();
        const product = new Product(req.body);

        product._id = uuidv4();

        await product.save();

        res.json({message: "Ürün başarıyla kaydedildi!"});
    })
}
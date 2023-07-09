import dbConnect from "@/database/mongodb";
import Product from "@/models/Product";
import request from "@/services/request";

export default function handle(req,res){
    request(res, async()=>{
        dbConnect();
        const {categoryId} =req.body;
        if(categoryId === "0"){
            const products = await Product.find({isActive: true}).sort({name: 1});
            res.json(products);
        }else{
            const products = await Product.find({isActive: true, categoryId: categoryId}).sort({name: 1});
            res.json(products);
        }        
    })
}